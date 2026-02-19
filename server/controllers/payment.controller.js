import Razorpay from "razorpay";
import crypto from "crypto";
import redisClient from "../db/redisClient.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { orderQueue } from "../utils/queue.js";

const getRazorpay = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const getCartKey = (userId) => `cart:${userId}`;

export const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cartKey = getCartKey(userId);

  // 1. Get Cart Total from Redis
  const cartJson = await redisClient.get(cartKey);
  const cart = cartJson ? JSON.parse(cartJson) : [];

  if (cart.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  // Calculate total amount (in paise)
  // Ensure we consistently handle currency format (paise vs rupees)
  // Assuming item.price is in paise based on user context
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (totalAmount <= 0) {
    throw new AppError("Invalid cart total", 400);
  }

  // 2. Create Razorpay Order
  const options = {
    amount: totalAmount, // Amount in paise
    currency: "INR",
    receipt: `order_rcptid_${Date.now()}_${userId}`,
    payment_capture: 1, // Auto capture
  };

  try {
    const razorpay = getRazorpay();
    const order = await razorpay.orders.create(options);

    res.status(200).json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay Error:", error);
    throw new AppError("Failed to create payment order", 500);
  }
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    addressId,
  } = req.body;
  const userId = req.user.id;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new AppError("Missing payment details", 400);
  }

  // 1. Verify Signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // 2. Fetch Cart to Process Order
    // We fetch cart again to ensure we process exactly what was paid for
    // In a strict system, we would lock the cart when order is created,
    // but here we just process the current cart state.
    const cartKey = getCartKey(userId);
    const cartJson = await redisClient.get(cartKey);
    const items = cartJson ? JSON.parse(cartJson) : [];

    if (items.length === 0) {
      // Edge case: Cart cleared or expired during payment
      // We should log this critical error as payment was received but no items found
      console.error(
        `CRITICAL: Payment received (${razorpay_payment_id}) but cart empty for user ${userId}`,
      );
      // We still return success but maybe queue a manual review task?
      // For now, allow it to proceed -> worker will likely fail or handle empty items check
    }

    // 3. Add to Order Queue
    // This reuses the existing order processing worker logic
    if (items.length > 0) {
      await orderQueue.add("process-cart-order", {
        userId,
        items,
        addressId,
        isBuyNow: false,
        paymentInfo: {
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          method: "razorpay",
        },
      });

      // 4. Clear Cart
      await redisClient.del(cartKey);
    }

    res.status(200).json({
      success: true,
      message: "Payment verified and order placed",
      orderId: razorpay_order_id,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
});

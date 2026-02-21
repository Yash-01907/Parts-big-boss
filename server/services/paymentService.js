import Razorpay from "razorpay";
import process from "process";
import AppError from "../utils/appError.js";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createRazorpayOrder = async (amount, currency, receipt) => {
  // In createRazorpayOrder
  try {
    if (
      !process.env.RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID === "mock_key"
    ) {
      console.warn("MOCKING RAZORPAY ORDER (No API Key found)");
      return {
        id: `order_mock_${Date.now()}`,
        entity: "order",
        amount,
        amount_paid: 0,
        amount_due: amount,
        currency,
        receipt,
        status: "created",
        attempts: 0,
        notes: [],
        created_at: Math.floor(Date.now() / 1000),
      };
    }

    const order = await razorpay.orders.create({
      amount, // in smallest unit (paise)
      currency,
      receipt, // receipt id: local order id
    });
    return order;
  } catch (err) {
    // Fallback for development if API fails
    if (process.env.NODE_ENV === "development") {
      console.warn("RAZORPAY FAILED, RETURNING MOCK ORDER:", err.message);
      return {
        id: `order_mock_fallback_${Date.now()}`,
        entity: "order",
        amount,
        currency,
        receipt,
        status: "created",
      };
    }
    throw new AppError("Failed to create Razorpay order", 500);
  }
};

export const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  // Bypass for mock orders
  if (orderId.startsWith("order_mock_")) {
    return true;
  }

  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "mock_secret")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === signature) {
    return true;
  } else {
    return false;
  }
};

import { api } from "../axios/axiosConfig";

interface OrderConfirmationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/**
 * Confirms the order by sending payment details to the backend.
 * This triggers the backend to verify the signature and add the order to the processing queue.
 */
export const verifyOrderPayment = async (orderData: OrderConfirmationData) => {
  try {
    const response = await api.post("/api/orders/verify", orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

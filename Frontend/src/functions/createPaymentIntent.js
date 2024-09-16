import { axiosInstance } from "../apis/axiosInstance";

export const createPaymentIntent = async (paymentInfo) => {
  const { amount, currency, receiptEmail } = paymentInfo;
  if (!amount || isNaN(amount) || amount <= 0) {
    return;
  }
  const response = await axiosInstance({
    method: "POST",
    url: "/payment-intent",
    data: {
      amount,
      currency,
      receiptEmail,
    },
  });
  return response.data;
};

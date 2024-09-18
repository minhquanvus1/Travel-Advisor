import { axiosInstance } from "../apis/axiosInstance";

export const createPaymentIntent = async (paymentInfo, token) => {
  if (!token) {
    console.log("token is not provided");
    return;
  }
  const { amount, currency, receiptEmail } = paymentInfo;
  if (!amount || isNaN(amount) || amount <= 0) {
    return;
  }
  const response = await axiosInstance({
    method: "POST",
    url: "/secure/payment-intent",
    data: {
      amount,
      currency,
      receiptEmail,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

import axios from "../config";

export const fetchPaymentIntent = async (data) => {
  const response = await axios.post("/payment/intent", data);
  return response?.data?.response;
};


export const updateUserPlan = async (planId) => {
  const response = await axios.post("/plan/user-plans", {planId});
  return response;
}
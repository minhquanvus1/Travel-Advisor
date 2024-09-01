import axios from "axios";
import { baseURL } from "../baseUrl";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
axiosInstance.isCancel = axios.isCancel;

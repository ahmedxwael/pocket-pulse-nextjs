import axios from "axios";
import { appUrl } from "../flags";

export const apiHttp = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const http = axios.create({
  baseURL: appUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

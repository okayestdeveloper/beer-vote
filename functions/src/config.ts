import { config } from "firebase-functions";
const origin = config().cors?.origin || "http://localhost:5000";

export const corsOptions = {
  origin,
  exposedHeaders: ["X-Requested-With", "XSRF-TOKEN", "Authorization"],
  credentials: true,
};

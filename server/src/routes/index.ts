import { Router } from "express";
import cors from "cors";
import CharsRouter from "./Chars";

// Init router and path
const router = Router();

// options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Access-Control-Allow-Headers",
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: true,
};
router.use(cors(options));

// Add sub-routes
router.use("/chars", CharsRouter);

// Export the base-router
router.options("*", cors(options));
export default router;

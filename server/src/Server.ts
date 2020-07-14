import cors from "cors";
import cookieParser from "cookie-parser";
import Express from "express";
import logger from "morgan";
import BaseRouter from "./routes";

// Init express
const app = Express();

// Add middleware/settings/routes to express.
app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["access-control-allow-origin", "Content-Type", "Authorization"],
  }),
);
app.options("*", cors());

app.all("", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  // Auth Each API Request created by user.
  next();
});

app.use("/api", BaseRouter);

// Export Express instance
export default app;

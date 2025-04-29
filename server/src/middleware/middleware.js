import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const middleware = (req, _res, next) => {
  console.log(`${getCurrentTimestamp()} - 🚨 middleware - Request: ${req.method} ${req.originalUrl}`);

  if (req.url.includes("%1F")) {
    const cleanedUrl = req.url.replace(/%1F/g, "");

    req.url = cleanedUrl;
    req.originalUrl = cleanedUrl;

    console.log(`${getCurrentTimestamp()} - 🧹 middleware - Cleaned URL: ${cleanedUrl}`);
  }

  next();
};

export default middleware;

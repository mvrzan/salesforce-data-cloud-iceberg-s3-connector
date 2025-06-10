import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const middleware = (req, res, next) => {
  console.log(`${getCurrentTimestamp()} - 🚨 middleware - Request: ${req.method} ${req.originalUrl}`);

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) {
    console.log(`${getCurrentTimestamp()} - 🚨 middleware - Unauthorized: No token provided!`);
    return res.status(401).send({
      error: "Unauthorized: No token provided",
    });
  }

  if (token !== process.env.CLIENT_ACCESS_TOKEN) {
    console.log(`${getCurrentTimestamp()} - 🚨 middleware - Forbidden: Invalid token!`);

    return res.status(403).send({
      error: "Forbidden: Invalid token!",
    });
  }

  if (req.url.includes("%1F")) {
    const cleanedUrl = req.url.replace(/%1F/g, "");

    req.url = cleanedUrl;
    req.originalUrl = cleanedUrl;

    console.log(`${getCurrentTimestamp()} - 🧹 middleware - Cleaned URL: ${cleanedUrl}`);
  }

  next();
};

export default middleware;

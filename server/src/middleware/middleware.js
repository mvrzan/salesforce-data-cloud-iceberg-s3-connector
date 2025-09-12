import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const middleware = (req, res, next) => {
  console.log(`${getCurrentTimestamp()} - 🚨 middleware - Request: ${req.method} ${req.originalUrl}`);

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
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

  console.log(`${getCurrentTimestamp()} - ✅ middleware - Preserving namespace separators in URL: ${req.url}`);

  next();
};

export default middleware;

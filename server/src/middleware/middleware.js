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

  if (req.params.namespace) {
    const decodedNamespace = decodeURIComponent(req.params.namespace);
    let namespaceParts;

    console.log(`${getCurrentTimestamp()} - 🔍 middleware - Decoded namespace: "${decodedNamespace}"`);

    if (decodedNamespace.includes("\x1F")) {
      namespaceParts = decodedNamespace.split("\x1F");
      console.log(`${getCurrentTimestamp()} - 🔍 middleware - Split on unit separator (\\x1F)`);
    } else if (decodedNamespace.includes(".")) {
      namespaceParts = decodedNamespace.split(".");
      console.log(`${getCurrentTimestamp()} - 🔍 middleware - Split on dot separator (.)`);
    } else {
      namespaceParts = [decodedNamespace];
      console.log(`${getCurrentTimestamp()} - 🔍 middleware - Single part namespace`);
    }

    console.log(
      `${getCurrentTimestamp()} - 🔍 middleware - Namespace parts: [${namespaceParts.join(", ")}] (length: ${
        namespaceParts.length
      })`
    );

    req.namespaceParts = namespaceParts;
  }

  next();
};

export default middleware;

import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { getNamespaces } from "../utils/metadata.js";

const namespaces = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaces - Incoming request!`);

    const parent = req.query.parent;
    const responseNamespaces = getNamespaces(parent);

    const response = {
      namespaces: responseNamespaces,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - namespaces - Error occurred: ${error.message}`);

    const errorResponse = {
      error: {
        message: error.message || "Internal server error",
        type: "InternalServerError",
        code: 500,
      },
    };

    res.status(500).json(errorResponse);
  }
};

export default namespaces;

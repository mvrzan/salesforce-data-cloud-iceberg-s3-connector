import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaceDetails = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 namespaceDetails - Incoming request!`);

    const namespaceParts = req.namespaceParts;

    const response = {
      namespace: namespaceParts,
      properties: {},
    };

    console.log(
      `${getCurrentTimestamp()} - 📉 namespaceDetails - Namespace ${namespaceParts.join(".")} details provided!`
    );
    res.status(200).json(response);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} - ❌ namespaceDetails - Error occurred: ${error.message}`);

    res.status(500).json({
      error: {
        message: "Internal server error while getting namespace details",
        type: "InternalServerError",
        code: 500,
      },
    });
  }
};

export default namespaceDetails;

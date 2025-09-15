import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaceDetails = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 namespaceDetails - Incoming request!`);

    const { namespace } = req.params;
    const decodedNamespace = decodeURIComponent(namespace);
    let namespaceParts;

    console.log(`${getCurrentTimestamp()} - 📈 namespaceDetails - Decoded namespace: "${decodedNamespace}"`);

    if (decodedNamespace.includes("\x1F")) {
      namespaceParts = decodedNamespace.split("\x1F");

      console.log(`${getCurrentTimestamp()} - 📈 namespaceDetails - Split on unit separator (\\x1F)`);
    } else if (decodedNamespace.includes(".")) {
      namespaceParts = decodedNamespace.split(".");

      console.log(`${getCurrentTimestamp()} - 📈 namespaceDetails - Split on dot separator (.)`);
    } else {
      namespaceParts = [decodedNamespace];

      console.log(`${getCurrentTimestamp()} - 📈 namespaceDetails - Single part namespace`);
    }

    console.log(
      `${getCurrentTimestamp()} - 📈 namespaceDetails - Namespace parts: [${namespaceParts.join(", ")}] (length: ${
        namespaceParts.length
      })`
    );

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

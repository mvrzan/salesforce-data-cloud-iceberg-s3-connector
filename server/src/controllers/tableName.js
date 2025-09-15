import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { getTableMetadata } from "../utils/metadata.js";

const tableName = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 tableName - Incoming request!`);

    const { namespace, table } = req.params;
    const decodedNamespace = decodeURIComponent(namespace);

    console.log(`${getCurrentTimestamp()} - 📈 tableName - Decoded namespace: "${decodedNamespace}"`);

    let namespaceParts;

    if (decodedNamespace.includes("\x1F")) {
      namespaceParts = decodedNamespace.split("\x1F");

      console.log(`${getCurrentTimestamp()} - 📈 tableName - Split on unit separator (\\x1F)`);
    } else if (decodedNamespace.includes(".")) {
      namespaceParts = decodedNamespace.split(".");

      console.log(`${getCurrentTimestamp()} - 📈 tableName - Split on dot separator (.)`);
    } else {
      namespaceParts = [decodedNamespace];

      console.log(`${getCurrentTimestamp()} - 📈 tableName - Single part namespace`);
    }

    console.log(
      `${getCurrentTimestamp()} - 📈 tableName - Namespace parts: [${namespaceParts.join(", ")}] (length: ${
        namespaceParts.length
      })`
    );

    const result = getTableMetadata(namespaceParts, table);

    if (!result.found) {
      console.log(
        `${getCurrentTimestamp()} - ⚠️ tableName - Table not found: ${table} in namespace ${namespaceParts.join(".")}`
      );
      return res.status(404).json({
        error: {
          message: `Table '${table}' not found in namespace '${namespaceParts.join(".")}'`,
          type: "NoSuchTableException",
          code: 404,
        },
      });
    }

    const response = {
      "metadata-location": result.metadataLocation,
      metadata: result.metadata,
      config: result.config || {},
    };

    console.log(
      `${getCurrentTimestamp()} - 📉 tableName - Table metadata provided for ${table} in ${namespaceParts.join(".")}`
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} - ❌ tableName - Error occurred: ${error.message}`);
    res.status(500).json({
      error: {
        message: "Internal server error while loading table",
        type: "InternalServerError",
        code: 500,
      },
    });
  }
};

export default tableName;

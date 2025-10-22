import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { getTableMetadata } from "../utils/metadata.js";

const tableName = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 tableName - Incoming request!`);

    const namespaceParts = req.namespaceParts;
    const { table } = req.params;

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

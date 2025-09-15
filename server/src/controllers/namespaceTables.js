import { getTablesInNamespace } from "../utils/metadata.js";
import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaceTables = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Incoming request!`);

    const { namespace } = req.params;
    const decodedNamespace = decodeURIComponent(namespace);
    let namespaceParts;

    if (decodedNamespace.includes("\x1F")) {
      namespaceParts = decodedNamespace.split("\x1F");

      console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Split on unit separator (\\x1F)`);
    } else if (decodedNamespace.includes(".")) {
      namespaceParts = decodedNamespace.split(".");

      console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Split on dot separator (.)`);
    } else {
      namespaceParts = [decodedNamespace];

      console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Single part namespace`);
    }

    console.log(
      `${getCurrentTimestamp()} - 📈 namespaceTables - Namespace parts: [${namespaceParts.join(", ")}] (length: ${
        namespaceParts.length
      })`
    );

    const pageToken = req.query["page-token"] || req.query.pageToken;
    const pageSize = req.query["page-size"] || req.query.pageSize;

    // Get tables for the namespace
    const result = getTablesInNamespace(namespaceParts, pageToken, pageSize);

    if (!result.found) {
      console.log(`${getCurrentTimestamp()} - ⚠️ namespaceTables - Namespace not found: ${namespaceParts.join(".")}`);
      return res.status(404).json({
        error: {
          message: `Namespace not found: ${namespaceParts.join(".")}`,
          type: "NamespaceNotEmptyException",
          code: 404,
        },
      });
    }

    const response = {
      identifiers: result.tables.map((table) => ({
        namespace: namespaceParts,
        name: table.name,
      })),
    };

    if (result.nextPageToken) {
      response["next-page-token"] = result.nextPageToken;
    }

    console.log(
      `${getCurrentTimestamp()} - 📉 namespaceTables - Namespace ${namespaceParts.join(".")} tables provided! (${
        result.tables.length
      } tables)`
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(`${getCurrentTimestamp()} - ❌ namespaceTables - Error occurred: ${error.message}`);
    res.status(500).json({
      error: {
        message: "Internal server error while listing tables",
        type: "InternalServerError",
        code: 500,
      },
    });
  }
};

export default namespaceTables;

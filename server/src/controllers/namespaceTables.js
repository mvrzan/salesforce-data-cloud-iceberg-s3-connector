import { getTablesInNamespace } from "../utils/metadata.js";

// Controller for GET /v1/namespaces/{namespace}/tables - Lists all tables in a namespace
const namespaceTables = (req, res) => {
  try {
    const { namespace } = req.params;

    // Debug logging
    console.log("Raw namespace param:", namespace);

    // Decode the URL-encoded namespace parameter
    // Apache Iceberg uses unit separator (\x1F) to separate namespace parts
    const decodedNamespace = decodeURIComponent(namespace);
    console.log("Decoded namespace:", decodedNamespace);

    let namespaceParts;

    // Try splitting on unit separator first
    if (decodedNamespace.includes("\x1F")) {
      namespaceParts = decodedNamespace.split("\x1F");
      console.log("Split on unit separator (\\x1F)");
    } else if (decodedNamespace.includes(".")) {
      // Fallback to dot separator if no unit separator found
      namespaceParts = decodedNamespace.split(".");
      console.log("Split on dot separator (.)");
    } else {
      // Single part namespace
      namespaceParts = [decodedNamespace];
      console.log("Single part namespace");
    }

    console.log("Namespace parts:", namespaceParts);
    console.log("Namespace parts length:", namespaceParts.length);

    // Get pagination parameters from query string (optional)
    const pageToken = req.query["page-token"] || req.query.pageToken;
    const pageSize = req.query["page-size"] || req.query.pageSize;

    // Get tables for the namespace
    const result = getTablesInNamespace(namespaceParts, pageToken, pageSize);

    if (!result.found) {
      return res.status(404).json({
        error: {
          message: `Namespace not found: ${namespaceParts.join(".")}`,
          type: "NamespaceNotEmptyException",
          code: 404,
        },
      });
    }

    // Return Apache Iceberg ListTablesResponse format
    const response = {
      identifiers: result.tables.map((table) => ({
        namespace: namespaceParts,
        name: table.name,
      })),
    };

    // Add pagination token if there are more results
    if (result.nextPageToken) {
      response["next-page-token"] = result.nextPageToken;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Error listing tables:", error);
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

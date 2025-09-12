import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { NamespaceOneObjects, NamespaceTwoObjects, FallbackObjects } from "../utils/metadata.js";

const namespaceTables = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Incoming request!`);

    const namespace = req.params.namespaceTables;

    console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Raw namespace: "${namespace}"`);

    // Decode URL-encoded namespace
    const decodedNamespace = decodeURIComponent(namespace);
    console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Decoded namespace: "${decodedNamespace}"`);

    // Split on ASCII 31 character (represented as %1F in URL)
    let databaseName = "";
    let schemaName = "";

    if (decodedNamespace.includes(String.fromCharCode(31))) {
      // Split on ASCII 31 separator
      const parts = decodedNamespace.split(String.fromCharCode(31));
      databaseName = parts[0];
      schemaName = parts[1] || "";
      console.log(
        `${getCurrentTimestamp()} - 📈 namespaceTables - Parsed with ASCII 31: database="${databaseName}", schema="${schemaName}"`
      );
    } else {
      // Fallback parsing for other formats
      console.log(
        `${getCurrentTimestamp()} - ⚠️ namespaceTables - No ASCII 31 separator found, attempting fallback parsing`
      );

      if (decodedNamespace.includes("Database_namespace_one")) {
        databaseName = "Database_namespace_one";
        schemaName = "public";
      } else if (decodedNamespace.includes("Database_namespace_two")) {
        databaseName = "Database_namespace_two";
        schemaName = "public";
      }
    }

    console.log(
      `${getCurrentTimestamp()} - 📈 namespaceTables - Final parsed: database="${databaseName}", schema="${schemaName}"`
    );

    // Return tables based on database
    if (databaseName === "Database_namespace_one") {
      console.log(`${getCurrentTimestamp()} - 📉 namespaceTables - Namespace ${namespace} objects provided!`);
      return res.status(200).send(NamespaceOneObjects);
    } else if (databaseName === "Database_namespace_two") {
      console.log(`${getCurrentTimestamp()} - 📉 namespaceTables - Namespace ${namespace} objects provided!`);
      return res.status(200).send(NamespaceTwoObjects);
    } else {
      console.log(`${getCurrentTimestamp()} - 📉 namespaceName - Default objects for ${namespace} provided!`);
      return res.status(500).send(FallbackObjects);
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaceTables - Error occurred: ${error.message}`);
  }
};

export default namespaceTables;

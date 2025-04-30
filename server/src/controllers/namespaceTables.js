import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaceTables = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaceTables - Incoming request!`);

    const namespace = req.params.namespaceTables;
    const cleanNamespace = namespace.replace(String.fromCharCode(31), "s");

    if (cleanNamespace === "Database_namespace_oneDatabase_namespace_one") {
      // Logic specific to namespace_one
      const objects = {
        identifiers: [{ name: "first_name" }, { name: "last_name" }, { name: "date_of_birth" }, { name: "country" }],
      };

      console.log(`${getCurrentTimestamp()} - 📤 namespaceTables - Namespace ${namespace} objects provided!`);

      return res.status(200).send(objects);
    } else if (cleanNamespace === "Database_namespace_oneDatabase_namespace_two") {
      // Logic specific to namespace_two
      const objects = {
        identifiers: [{ name: "product_id" }, { name: "product_name" }, { name: "price" }],
      };

      console.log(`${getCurrentTimestamp()} - 📤 namespaceTables - Namespace ${namespace} objects provided!`);

      return res.status(200).send(objects);
    } else {
      // Default logic for unrecognized namespaces
      const objects = {
        identifiers: [{ name: "namespace_not_detected" }, { name: "namespace_not_detected" }],
      };

      console.log(`${getCurrentTimestamp()} - 📤 namespaceName - Default objects for ${namespace} provided!`);
      return res.status(500).send(objects);
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaceTables - Error occurred: ${error.message}`);
  }
};

export default namespaceTables;

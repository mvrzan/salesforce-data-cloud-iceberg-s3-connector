import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { NamespaceOneObjects, NamespaceTwoObjects, FallbackObjects } from "../utils/restCatalog.js";

const namespaceTables = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📈 namespaceTables - Incoming request!`);

    const namespace = req.params.namespaceTables;
    const cleanNamespace = namespace.replace(String.fromCharCode(31), "");

    if (cleanNamespace === "Database_namespace_oneDatabase_namespace_one") {
      console.log(`${getCurrentTimestamp()} - 📉 namespaceTables - Namespace ${namespace} objects provided!`);

      return res.status(200).send(NamespaceOneObjects);
    } else if (cleanNamespace === "Database_namespace_oneDatabase_namespace_two") {
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

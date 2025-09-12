import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { namespacesInfo } from "../utils/metadata.js";

const namespaces = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaces - Incoming request!`);

    const parent = req.query.parent;
    console.log(`${getCurrentTimestamp()} - 📥 namespaces - Parent parameter: "${parent}"`);

    if (parent === "Database_namespace_one") {
      // Return schemas within Database_namespace_one
      const schemasInDb = {
        namespaces: [["Database_namespace_one", "public"]],
      };
      console.log(`${getCurrentTimestamp()} - ✅ namespaces - Schemas for Database_namespace_one provided!`);
      res.status(200).send(schemasInDb);
    } else if (parent === "Database_namespace_two") {
      // Return schemas within Database_namespace_two
      const schemasInDb = {
        namespaces: [["Database_namespace_two", "public"]],
      };
      console.log(`${getCurrentTimestamp()} - ✅ namespaces - Schemas for Database_namespace_two provided!`);
      res.status(200).send(schemasInDb);
    } else if (!parent) {
      // Return top-level databases when no parent specified
      console.log(`${getCurrentTimestamp()} - ✅ namespaces - Top-level databases provided!`);
      res.status(200).send(namespacesInfo);
    } else {
      // Unknown parent
      console.log(`${getCurrentTimestamp()} - ⚠️ namespaces - Unknown parent: ${parent}`);
      res.status(200).send({ namespaces: [] });
    }
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaces - Error occurred: ${error.message}`);
  }
};

export default namespaces;

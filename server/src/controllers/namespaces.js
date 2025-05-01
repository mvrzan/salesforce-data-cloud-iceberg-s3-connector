import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { namespacesInfo } from "../utils/restCatalog.js";

const namespaces = (_req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaces - Incoming request!`);

    console.log(`${getCurrentTimestamp()} - ✅ namespaces - Namespaces provided!`);

    res.status(200).send(namespacesInfo);
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaces - Error occurred: ${error.message}`);
  }
};

export default namespaces;

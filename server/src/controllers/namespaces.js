import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaces = (_req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaces - Incoming request!`);

    const namespacesInfo = {
      namespaces: [["Database_namespace_one"], ["Database_namespace_two"]],
    };

    console.log(`${getCurrentTimestamp()} - 📤 namespaces - Namespaces provided!`);

    res.status(200).send(namespacesInfo);
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaces - Error occurred: ${error.message}`);
  }
};

export default namespaces;

import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaceName = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaceName - Incoming request!`);

    const namespace = req.params.namespaceName;

    const objects = {
      identifiers: [
        {
          namespace: ["namespace_onenamespace_one"],
          name: "first_name",
        },
        {
          namespace: ["namespace_onenamespace_one"],
          name: "last_name",
        },
      ],
    };

    console.log(`${getCurrentTimestamp()} - 📤 namespaceName - Namespace ${namespace} objects provided!`);

    res.status(200).send(objects);
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaceName - Error occurred: ${error.message}`);
  }
};

export default namespaceName;

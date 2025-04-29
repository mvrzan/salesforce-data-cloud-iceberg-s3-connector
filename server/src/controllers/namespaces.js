import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaces = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaces - Incoming request!`);

    console.log(`${getCurrentTimestamp()} - Authorization header: ${req.headers.authorization || "Not provided"}`);

    res.status(200).send({
      namespaces: [["namespace_one"], ["namespace_two"]],
    });
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaces - Error occurred: ${error.message}`);
  }
};

export default namespaces;

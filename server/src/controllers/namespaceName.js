import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const namespaceName = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 namespaceName - Incoming request!`);

    console.log(`${getCurrentTimestamp()} - Authorization header: ${req.headers.authorization || "Not provided"}`);
    console.log("success!");

    res.status(200).send({
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
    });
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - namespaceName - Error occurred: ${error.message}`);
  }
};

export default namespaceName;

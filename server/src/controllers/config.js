import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const config = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 config - Incoming request!`);

    console.log(`${getCurrentTimestamp()} - Authorization header: ${req.headers.authorization || "Not provided"}`);

    res.status(200).send({
      ttl: 5000,
    });
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - config - Error occurred: ${error.message}`);
  }
};

export default config;

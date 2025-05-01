import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const config = (_req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📥 config - Incoming request!`);

    const config = {
      success: true,
    };

    console.log(`${getCurrentTimestamp()} - 📤 config - Configuration provided!`);

    res.status(200).send(config);
  } catch (error) {
    res.status(500).send(error);
    console.error(`${getCurrentTimestamp()} ❌ - config - Error occurred: ${error.message}`);
  }
};

export default config;

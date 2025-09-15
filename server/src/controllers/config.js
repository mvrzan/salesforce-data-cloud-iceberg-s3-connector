import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const config = (_req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - ⚙️ config - Incoming request!`);

    const catalogConfig = {
      defaults: {},
      overrides: {},
    };

    console.log(`${getCurrentTimestamp()} - ✅ config - Configuration provided!`);

    res.status(200).json(catalogConfig);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(`${getCurrentTimestamp()} ❌ - config - Error occurred: ${error.message}`);
  }
};

export default config;

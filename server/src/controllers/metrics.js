import { getCurrentTimestamp } from "../utils/loggingUtil.js";

const metrics = (req, res) => {
  try {
    console.log(`${getCurrentTimestamp()} - 📊 metrics - Incoming request!`);

    const receivedMetrics = req.body;

    console.log(`${getCurrentTimestamp()} - ✅ metrics - Metrics received!`);

    console.log(receivedMetrics);

    res.status(204).send();
  } catch (error) {
    console.error(`${getCurrentTimestamp()} ❌ - metrics - Error occurred: ${error.message}`);

    res.status(500).json({ error: error.message });
  }
};

export default metrics;

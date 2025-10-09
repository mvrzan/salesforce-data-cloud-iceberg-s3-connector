import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import catalogRoutes from "./src/routes/catalog.js";
import { getCurrentTimestamp } from "./src/utils/loggingUtil.js";

const app = express();
const port = process.env.APP_PORT || process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(catalogRoutes);

app.listen(port, () => {
  console.log(`${getCurrentTimestamp()} - 🎬 index - Authentication server listening on port: ${port}`);
});

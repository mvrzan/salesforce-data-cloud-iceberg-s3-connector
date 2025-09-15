import { Router } from "express";
import config from "../controllers/config.js";
import namespaces from "../controllers/namespaces.js";
import namespaceDetails from "../controllers/namespaceDetails.js";
import namespaceTables from "../controllers/namespaceTables.js";
import middleware from "../middleware/middleware.js";
import tableName from "../controllers/tableName.js";

const catalogRoutes = Router();

catalogRoutes.get("/v1/config", middleware, config);
catalogRoutes.get("/v1/namespaces", middleware, namespaces);
catalogRoutes.get("/v1/namespaces/:namespace", middleware, namespaceDetails);
catalogRoutes.get("/v1/namespaces/:namespace/tables", middleware, namespaceTables);
catalogRoutes.get("/v1/namespaces/:namespace/tables/:table", middleware, tableName);

export default catalogRoutes;

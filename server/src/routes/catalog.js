import { Router } from "express";
import config from "../controllers/config.js";
import namespaces from "../controllers/namespaces.js";
import namespaceName from "../controllers/namespaceName.js";
import middleware from "../middleware/middleware.js";
import tableName from "../controllers/tableName.js";

const catalogRoutes = Router();

catalogRoutes.get("/v1/config", middleware, config);
catalogRoutes.get("/v1/namespaces", middleware, namespaces);
catalogRoutes.get("/v1/namespaces/:namespaceName/tables", middleware, namespaceName);
catalogRoutes.get("/v1/namespaces/:namespacesName/tables/:tableName", middleware, tableName);

export default catalogRoutes;

import { Router } from "express";
import config from "../controllers/config.js";
import namespaces from "../controllers/namespaces.js";
import namespaceOne from "../controllers/namespaceOne.js";
import middleware from "../middleware/middleware.js";

const catalogRoutes = Router();

catalogRoutes.get("/v1/config", middleware, config);
catalogRoutes.get("/v1/namespaces", middleware, namespaces);
catalogRoutes.get("/v1/namespaces/namespace_onenamespace_one/tables", middleware, namespaceOne);
catalogRoutes.get("/v1/namespaces/namespace_one/tables", middleware, namespaceOne);

export default catalogRoutes;

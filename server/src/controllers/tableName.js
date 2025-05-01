import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { usersTable, userActivities, customMetadata } from "../utils/restCatalog.js";

const tableName = (req, res) => {
  try {
    const namespacesName = req.params.namespacesName;
    const tableName = req.params.tableName;

    console.log(`${getCurrentTimestamp()} - 📥 tableName - Request for table: ${namespacesName}/${tableName}`);

    const tableSchemas = {
      // Database_namespace_one tables
      users: usersTable,
      user_activities: userActivities,

      // Database_namespace_two tables
      products: "products",
      inventory: "inventory",
    };

    if (!tableSchemas[tableName]) {
      console.log(`${getCurrentTimestamp()} - ❌ Table not found: ${tableName}`);
      return res.status(404).send({
        error: `Table '${tableName}' not found in namespace '${namespacesName}'`,
      });
    }

    const customResponse = customMetadata(namespacesName, tableSchemas, tableName);

    console.log("customResponse", customResponse);

    console.log(`${getCurrentTimestamp()} - ✅ tableName - Metadata returned for ${tableName}`);

    res.status(200).send(customResponse);
  } catch (error) {
    res.status(500).send({
      error: error.message,
      stack: error.stack,
    });
    console.error(`${getCurrentTimestamp()} ❌ - tableName - Error occurred: ${error.message}`);
  }
};

export default tableName;

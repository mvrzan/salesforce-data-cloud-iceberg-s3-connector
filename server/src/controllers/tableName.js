import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { usersTable, userActivities, productsTable, inventoryTable, customMetadata } from "../utils/metadata.js";

const tableName = (req, res) => {
  try {
    const namespacesName = req.params.namespacesName;
    const tableName = req.params.tableName;

    console.log(`${getCurrentTimestamp()} - 📥 tableName - Request for table: ${namespacesName}/${tableName}`);

    // Decode URL-encoded namespace
    const decodedNamespace = decodeURIComponent(namespacesName);
    console.log(`${getCurrentTimestamp()} - 📥 tableName - Decoded namespace: "${decodedNamespace}"`);

    // Parse two-level namespace
    let databaseName = "";
    let schemaName = "";

    if (decodedNamespace.includes(String.fromCharCode(31))) {
      // Split on ASCII 31 separator
      const parts = decodedNamespace.split(String.fromCharCode(31));
      databaseName = parts[0];
      schemaName = parts[1] || "public";
    } else {
      // Fallback parsing
      if (decodedNamespace.includes("Database_namespace_one")) {
        databaseName = "Database_namespace_one";
        schemaName = "public";
      } else if (decodedNamespace.includes("Database_namespace_two")) {
        databaseName = "Database_namespace_two";
        schemaName = "public";
      }
    }

    console.log(`${getCurrentTimestamp()} - 📥 tableName - Parsed: database="${databaseName}", schema="${schemaName}"`);

    const tableSchemas = {
      // Database_namespace_one tables
      users: usersTable,
      user_activities: userActivities,

      // Database_namespace_two tables
      products: productsTable,
      inventory: inventoryTable,
    };

    if (!tableSchemas[tableName]) {
      console.log(`${getCurrentTimestamp()} - ❌ Table not found: ${tableName}`);
      return res.status(404).send({
        error: `Table '${tableName}' not found in namespace '${namespacesName}'`,
      });
    }

    const customResponse = customMetadata(namespacesName, tableSchemas, tableName);

    // Add schema information as response headers with parsed values
    res.set({
      "X-Database-Name": databaseName,
      "X-Schema-Name": schemaName,
      "X-Table-Name": tableName,
      // Add access control headers
      "X-User-Permissions": "read,write",
      "X-Schema-Permissions": "read,write",
      "X-Database-Permissions": "read,write",
      // CORS headers for cross-origin access
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Requested-With",
    });

    console.log(
      `${getCurrentTimestamp()} - ✅ tableName - Metadata returned for ${tableName} in ${databaseName}.${schemaName}`
    );

    console.log(
      `${getCurrentTimestamp()} - 🔐 tableName - Authorization header: ${
        req.headers.authorization ? "Present" : "Missing"
      }`
    );
    console.log(`${getCurrentTimestamp()} - 🔐 tableName - User agent: ${req.headers["user-agent"] || "Unknown"}`);

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

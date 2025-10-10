export const namespacesInfo = {
  namespaces: [["database_namespace_one"], ["Database_namespace_two"]],
};

export const namespaceHierarchy = {
  topLevel: [["database_namespace_one"], ["Database_namespace_two"]],

  children: {
    database_namespace_one: [["database_namespace_one", "public"]],
    Database_namespace_two: [["Database_namespace_two", "public"]],
  },
};

export const getNamespaces = (parent) => {
  if (!parent) {
    return namespaceHierarchy.topLevel;
  }

  const parentParts = decodeURIComponent(parent).split("\x1F");

  if (parentParts.length === 1) {
    const parentKey = parentParts[0];
    return namespaceHierarchy.children[parentKey] || [];
  }

  return [];
};

// Function to get tables in a specific namespace
export const getTablesInNamespace = (namespaceParts, pageToken, pageSize) => {
  const namespaceKey = namespaceParts.join(".");

  // Define table mapping for each namespace
  const tableMapping = {
    database_namespace_one: [{ name: "users" }, { name: "user_activities" }],
    "database_namespace_one.public": [{ name: "users" }, { name: "user_activities" }],
    Database_namespace_two: [{ name: "products" }, { name: "inventory" }],
    "Database_namespace_two.public": [{ name: "products" }, { name: "inventory" }],
  };

  // Check if namespace exists
  if (!tableMapping[namespaceKey]) {
    return { found: false, tables: [] };
  }

  const allTables = tableMapping[namespaceKey];

  // Simple pagination implementation
  if (pageSize && !isNaN(pageSize)) {
    const size = parseInt(pageSize);
    const startIndex = pageToken ? parseInt(pageToken) : 0;
    const endIndex = startIndex + size;

    const paginatedTables = allTables.slice(startIndex, endIndex);
    const hasMore = endIndex < allTables.length;

    return {
      found: true,
      tables: paginatedTables,
      nextPageToken: hasMore ? endIndex.toString() : null,
    };
  }

  return { found: true, tables: allTables };
};

// Function to get table metadata for a specific table
export const getTableMetadata = (namespaceParts, tableName) => {
  const namespaceKey = namespaceParts.join(".");

  // Define table schemas mapping
  const tableSchemas = {
    "database_namespace_one.users": usersTable,
    "database_namespace_one.user_activities": userActivities,
    "database_namespace_one.public.users": usersTable,
    "database_namespace_one.public.user_activities": userActivities,
    "Database_namespace_two.products": productsTable,
    "Database_namespace_two.inventory": inventoryTable,
    "Database_namespace_two.public.products": productsTable,
    "Database_namespace_two.public.inventory": inventoryTable,
  };

  const tableKey = `${namespaceKey}.${tableName}`;
  const schema = tableSchemas[tableKey];

  if (!schema) {
    return { found: false };
  }

  // Generate table metadata following Apache Iceberg format - MATCH GLUE EXACTLY
  const sequenceNumber = 1;
  const currentTime = 1760124034850; // GLUE timestamp
  const snapshotId = 4511538188449157632; // GLUE snapshot ID
  const schemaId = schema["schema-id"] || 0;

  // Map table names to your actual S3 paths - MUST match namespace structure
  const tablePathMapping = {
    "database_namespace_one.users": "database_namespace_one/users",
    "database_namespace_one.public.users": "database_namespace_one/public/users",
    "database_namespace_one.user_activities": "database_namespace_one/user_activities",
    "database_namespace_one.public.user_activities": "database_namespace_one/public/user_activities",
    "Database_namespace_two.products": "Database_namespace_two/products",
    "Database_namespace_two.public.products": "Database_namespace_two/public/products",
    "Database_namespace_two.inventory": "Database_namespace_two/inventory",
    "Database_namespace_two.public.inventory": "Database_namespace_two/public/inventory",
  };

  const tablePathKey = `${namespaceKey}.${tableName}`;
  const tableFolder = tablePathMapping[tablePathKey] || `${namespaceKey.replace(".", "/")}/${tableName}`;
  const tablePath = `s3://${process.env.S3_BUCKET}/${tableFolder}`;

  const metadata = {
    "format-version": 2,
    "table-uuid": "8d13e1e6-0cfc-48d0-985e-ba9a197a264b",
    location: `s3://${process.env.S3_BUCKET}/Database_namespace_one/public/users/database_namespace_one/users`,
    "last-sequence-number": 1,
    "last-updated-ms": 1760124034850,
    "last-column-id": 5,
    "current-schema-id": 0,
    schemas: [schema],
    "default-spec-id": 0,
    "partition-specs": [
      {
        "spec-id": 0,
        fields: [],
      },
    ],
    "last-partition-id": 999,
    "sort-orders": [
      {
        "order-id": 0,
        fields: [],
      },
    ],
    "default-sort-order-id": 0,
    properties: {
      owner: "hadoop",
      "write.parquet.compression-codec": "gzip",
    },
    "current-snapshot-id": snapshotId,
    snapshots: [
      {
        "sequence-number": 1,
        "snapshot-id": snapshotId,
        "timestamp-ms": 1760124034850,
        summary: {
          operation: "append",
          "spark.app.id": "spark-application-1760124000186",
          "added-data-files": "1",
          "added-records": "10",
          "added-files-size": "1700",
          "changed-partition-count": "1",
          "total-records": "10",
          "total-files-size": "1700",
          "total-data-files": "1",
          "total-delete-files": "0",
          "total-position-deletes": "0",
          "total-equality-deletes": "0",
          "engine-version": "3.5.4-amzn-0",
          "app-id": "spark-application-1760124000186",
          "engine-name": "spark",
          "iceberg-version": "Apache Iceberg d15ff14 (commit d15ff144c77dff98552ddb3c39a86a1130fd4e32)",
        },
        "manifest-list": `s3://${process.env.S3_BUCKET}/Database_namespace_one/public/users/database_namespace_one/users/metadata/snap-4511538188449157632-1-7419014b-10a1-4207-b4d5-048e32973137.avro`,
        "schema-id": 0,
      },
    ],
    statistics: [],
    "partition-statistics": [],
    "snapshot-log": [
      {
        "timestamp-ms": 1760124034850,
        "snapshot-id": snapshotId,
      },
    ],
    "metadata-log": [],
    refs: {
      main: {
        "snapshot-id": snapshotId,
        type: "branch",
      },
    },
  };

  const config = {
    "client.region": process.env.S3_AWS_REGION || "us-east-1",
    "s3.access-key-id": process.env.S3_ACCESS_KEY || "",
    "s3.secret-access-key": process.env.S3_SECRET_KEY || "",
  };

  return {
    found: true,
    metadataLocation: `s3://${process.env.S3_BUCKET}/Database_namespace_one/public/users/database_namespace_one/users/metadata/00000-a10553b1-a8ec-41f5-bb8b-7b253f42e435.metadata.json`,
    metadata: metadata,
    config: config,
  };
};

export const NamespaceOneObjects = {
  identifiers: [{ name: "users" }, { name: "user_activities" }],
};

export const NamespaceTwoObjects = {
  identifiers: [{ name: "products" }, { name: "inventory" }],
};

export const FallbackObjects = {
  identifiers: [{ name: "namespace_not_detected" }, { name: "namespace_not_detected" }],
};

export const usersTable = {
  type: "struct",
  "schema-id": 0,
  fields: [
    {
      id: 1,
      name: "Id",
      required: false,
      type: "string",
    },
    {
      id: 2,
      name: "first_name",
      required: false,
      type: "string",
    },
    {
      id: 3,
      name: "last_name",
      required: false,
      type: "string",
    },
    {
      id: 4,
      name: "country",
      required: false,
      type: "string",
    },
    {
      id: 5,
      name: "date_of_birth",
      required: false,
      type: "string",
    },
  ],
};

export const userActivities = {
  type: "struct",
  "schema-id": 1,
  schemaId: 1,
  fields: [
    {
      id: 1,
      name: "user_id",
      required: false,
      type: "string",
      source_header: "USER_ID",
      field_label: "User ID",
      field_api_name: "user_id__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 2,
      name: "activity_type",
      required: false,
      type: "string",
      source_header: "ACTIVITY_TYPE",
      field_label: "User's Activity Type",
      field_api_name: "activity_type__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 3,
      name: "timestamp",
      required: false,
      type: "date",
      source_header: "TIMESTAMP",
      field_label: "User's activity timestamp",
      field_api_name: "timestamp__c",
      source_data_type: "DATE",
      inferred_data_type: "DATE",
    },
    {
      id: 4,
      name: "location",
      required: false,
      type: "string",
      source_header: "LOCATION",
      field_label: "User's activity location",
      field_api_name: "location",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 5,
      name: "device_info",
      required: false,
      type: "string",
      source_header: "DEVICE_INFO",
      field_label: "User's activity device info",
      field_api_name: "device_info__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
  ],
};

export const productsTable = {
  type: "struct",
  "schema-id": 2,
  schemaId: 2,
  fields: [
    {
      id: 1,
      name: "product_id",
      required: true,
      type: "string",
      source_header: "PRODUCT_ID",
      field_label: "Product ID",
      field_api_name: "product_id__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 2,
      name: "product_name",
      required: false,
      type: "string",
      source_header: "PRODUCT_NAME",
      field_label: "Product Name",
      field_api_name: "product_name__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 3,
      name: "description",
      required: false,
      type: "string",
      source_header: "DESCRIPTION",
      field_label: "Product Description",
      field_api_name: "description__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 4,
      name: "category",
      required: false,
      type: "string",
      source_header: "CATEGORY",
      field_label: "Product Category",
      field_api_name: "category__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 5,
      name: "price",
      required: false,
      type: "string",
      source_header: "PRICE",
      field_label: "Product Price",
      field_api_name: "price__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
  ],
};

export const inventoryTable = {
  type: "struct",
  "schema-id": 3,
  schemaId: 3,
  fields: [
    {
      id: 1,
      name: "product_id",
      required: true,
      type: "string",
      source_header: "PRODUCT_ID",
      field_label: "Product ID",
      field_api_name: "product_id__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 2,
      name: "warehouse_id",
      required: true,
      type: "string",
      source_header: "WAREHOUSE_ID",
      field_label: "Warehouse ID",
      field_api_name: "warehouse_id__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 3,
      name: "quantity",
      required: false,
      type: "string",
      source_header: "QUANTITY",
      field_label: "Product Quantity",
      field_api_name: "quantity__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 4,
      name: "last_updated",
      required: false,
      type: "date",
      source_header: "LAST_UPDATED",
      field_label: "Last Updated",
      field_api_name: "last_updated__c",
      source_data_type: "DATE",
      inferred_data_type: "DATE",
    },
  ],
};

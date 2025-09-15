export const namespacesInfo = {
  namespaces: [["Database_namespace_one"], ["Database_namespace_two"]],
};

export const namespaceHierarchy = {
  topLevel: [["Database_namespace_one"], ["Database_namespace_two"]],

  children: {
    Database_namespace_one: [["Database_namespace_one", "public"]],
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
    Database_namespace_one: [{ name: "users" }, { name: "user_activities" }],
    "Database_namespace_one.public": [{ name: "users" }, { name: "user_activities" }],
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
    "Database_namespace_one.users": usersTable,
    "Database_namespace_one.user_activities": userActivities,
    "Database_namespace_one.public.users": usersTable,
    "Database_namespace_one.public.user_activities": userActivities,
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

  // Generate table metadata following Apache Iceberg format
  const sequenceNumber = 1;
  const currentTime = Date.now();
  const snapshotId = 1757622194193539;
  const schemaId = schema["schema-id"] || 0;

  // Build table path - match your actual S3 structure
  const databaseName = namespaceParts[0];
  const schemaName = namespaceParts[1] || "public";

  // Map table names to your actual S3 paths
  const tablePathMapping = {
    "Database_namespace_one.users": "users_iceberg_table",
    "Database_namespace_one.public.users": "users_iceberg_table",
    "Database_namespace_one.user_activities": "user_activities_iceberg_table",
    "Database_namespace_one.public.user_activities": "user_activities_iceberg_table",
    "Database_namespace_two.products": "products_iceberg_table",
    "Database_namespace_two.public.products": "products_iceberg_table",
    "Database_namespace_two.inventory": "inventory_iceberg_table",
    "Database_namespace_two.public.inventory": "inventory_iceberg_table",
  };

  const tablePathKey = `${namespaceKey}.${tableName}`;
  const tableFolder = tablePathMapping[tablePathKey] || `${tableName}_iceberg_table`;
  const tablePath = `s3://${process.env.S3_BUCKET || "my-data-lake"}/${tableFolder}`;

  const metadata = {
    "format-version": 2,
    "table-uuid": `${tableName}-uuid-123456789`,
    location: tablePath,
    "last-sequence-number": sequenceNumber,
    "last-updated-ms": currentTime,
    "last-column-id": schema.fields ? schema.fields.length : 5,
    "last-partition-id": 1000,
    schema: schema,
    schemas: [schema],
    "current-schema-id": schemaId,
    "partition-specs": [
      {
        "spec-id": 0,
        fields: [],
      },
    ],
    "default-spec-id": 0,
    "sort-orders": [
      {
        "order-id": 0,
        fields: [],
      },
    ],
    "default-sort-order-id": 0,
    properties: {
      "write.format.default": "parquet",
      "write.parquet.compression-codec": "snappy",
    },
    "current-snapshot-id": snapshotId,
    snapshots: [
      {
        "snapshot-id": snapshotId,
        "timestamp-ms": 1757622194193,
        "manifest-list": `${tablePath}/metadata/snap-${snapshotId}-1.avro`,
        summary: {
          operation: "append",
        },
      },
    ],
    "snapshot-log": [],
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
    metadataLocation: `${tablePath}/metadata/v1.metadata.json`,
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

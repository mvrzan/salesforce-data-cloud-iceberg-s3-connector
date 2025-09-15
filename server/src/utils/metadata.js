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

export const customMetadata = (namespacesName, tableSchemas, tableName) => {
  const schema = tableSchemas[tableName];
  const sequenceNumber = 1;
  const currentTime = Date.now();
  const snapshotId = 1757622194193539; // Use the real snapshot ID from our generated files
  const schemaId = schema["schema-id"] || 0;

  // Parse namespace to get database and schema names
  let databaseName = "";
  let schemaName = "public";

  const decodedNamespace = decodeURIComponent(namespacesName);
  if (decodedNamespace.includes(String.fromCharCode(31))) {
    const parts = decodedNamespace.split(String.fromCharCode(31));
    databaseName = parts[0];
    schemaName = parts[1] || "public";
  } else if (decodedNamespace.includes("Database_namespace_one")) {
    databaseName = "Database_namespace_one";
  } else if (decodedNamespace.includes("Database_namespace_two")) {
    databaseName = "Database_namespace_two";
  }

  const tablePath = `s3://${process.env.S3_BUCKET}/${databaseName}/${schemaName}/${tableName}`;

  console.log("tablePath", tablePath);
  console.log(`${tablePath}/metadata/snap-${snapshotId}-1.avro`);

  return {
    "metadata-location": `${tablePath}/metadata/v1.metadata.json`,
    metadata: {
      "format-version": 2,
      "table-uuid": "sample-table-uuid-123456789",
      location: tablePath,
      "last-sequence-number": sequenceNumber,
      "last-updated-ms": currentTime,
      "last-column-id": 5,
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
    },
    config: {
      "client.region": process.env.AWS_REGION || "us-east-1",
      "s3.access-key-id": process.env.AWS_ACCESS_KEY_ID || "",
      "s3.secret-access-key": process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  };
};

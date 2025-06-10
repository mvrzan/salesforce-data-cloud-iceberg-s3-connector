export const namespacesInfo = {
  namespaces: [["Database_namespace_one"], ["Database_namespace_two"]],
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
      source_header: "ID",
      field_label: "User ID",
      field_api_name: "Id__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 2,
      name: "first_name",
      required: false,
      type: "string",
      source_header: "FIRST_NAME",
      field_label: "User's first name",
      field_api_name: "first_name__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 3,
      name: "last_name",
      required: false,
      type: "string",
      source_header: "LAST_NAME",
      field_label: "User's last name",
      field_api_name: "last_name__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 4,
      name: "country",
      required: false,
      type: "string",
      source_header: "COUNTRY",
      field_label: "User's country",
      field_api_name: "country__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
    {
      id: 5,
      name: "date_of_birth",
      required: false,
      type: "string",
      source_header: "DATE_OF_BIRTH",
      field_label: "User's Date of Birth",
      field_api_name: "date_of_birth__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
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
      type: "string",
      source_header: "TIMESTAMP",
      field_label: "User's activity timestamp",
      field_api_name: "timestamp__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
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
      type: "string",
      source_header: "LAST_UPDATED",
      field_label: "Last Updated",
      field_api_name: "last_updated__c",
      source_data_type: "VARCHAR",
      inferred_data_type: "TEXT",
    },
  ],
};

export const customMetadata = (namespacesName, tableSchemas, tableName) => {
  const schema = tableSchemas[tableName];
  const sequenceNumber = 34;
  const currentTime = Date.now();
  const snapshotId = 12345678901234;
  const schemaId = schema["schema-id"] || 0;
  const tablePath = `s3://${process.env.S3_BUCKET}/${namespacesName}/${tableName}`;

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
      "current-snapshot-id": -1,
      snapshots: [
        {
          "sequence-number": sequenceNumber,
          "snapshot-id": snapshotId,
          "parent-snapshot-id": -1,
          "timestamp-ms": currentTime,
          "schema-id": 0,
          "manifest-list": `${tablePath}/metadata/snap-12345678901234-1.avro`,
          summary: {
            operation: "append",
            "total-records": "10",
            "total-files-size": "1024",
            "total-data-files": "1",
            "snapshot-id": snapshotId.toString(),
            "total-delete-files": "0",
            "total-position-deletes": "0",
            "total-equality-deletes": "0",
            "added-data-files": "1",
            "added-records": "10",
          },
        },
      ],
      "snapshot-log": [
        {
          "timestamp-ms": currentTime,
          "snapshot-id": snapshotId,
        },
      ],
      "metadata-log": [
        {
          "timestamp-ms": currentTime,
          "metadata-file": `${tablePath}/metadata/v1.metadata.json`,
        },
      ],
    },
    config: {
      token: `Bearer ${process.env.CLIENT_ACCESS_TOKEN}`,
      "client.region": process.env.S3_AWS_REGION,
      "s3.access-key-id": process.env.S3_ACCESS_KEY,
      "s3.secret-access-key": process.env.S3_SECRET_KEY,
      "s3.remote-signing-enabled": "true",
      "s3.cross-region-access-enabled": "true",
    },
    "storage-credentials": [
      {
        prefix: `s3://${process.env.S3_BUCKET}/`,
        config: {
          "client.region": process.env.S3_AWS_REGION,
          "s3.access-key-id": process.env.S3_ACCESS_KEY,
          "s3.secret-access-key": process.env.S3_SECRET_KEY,
          "s3.remote-signing-enabled": "true",
          "s3.cross-region-access-enabled": "true",
        },
      },
    ],
  };
};

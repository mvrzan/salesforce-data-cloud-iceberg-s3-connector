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
  schemaId: 0,
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
  "schema-id": 0,
  schemaId: 0,
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

export const customMetadata = (namespacesName, tableSchemas, tableName) => {
  const schema = tableSchemas[tableName];

  return {
    formatVersion: 2,
    metadata: {
      "format-version": 2,
      "table-uuid": `${namespacesName}-${tableName}-${Date.now()}`,
      "last-sequence-number": 34,
      location: `s3://${process.env.S3_BUCKET}`,
      "last-updated-ms": Date.now(),
      "last-column-id": schema.fields?.length,
      "last-partition-id": 1000,
      schemas: [schema],
      "current-schema-id": 0,
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
        "write.parquet.compression-codec": "gzip",
      },

      "current-snapshot-id": -1,
      snapshots: [],
      "snapshot-log": [],
      "metadata-log": [],
    },
  };
};

import { getCurrentTimestamp } from "../utils/loggingUtil.js";
import { usersTable } from "../utils/restCatalog.js";

const tableName = (req, res) => {
  try {
    // Fix the parameter extraction to match route definition
    const namespacesName = req.params.namespacesName;
    const objectName = req.params.tableName;

    console.log(`${getCurrentTimestamp()} - 📥 Request for table: ${namespacesName}/${objectName}`);

    // The UI might be expecting a wrapped structure
    const response = {
      // Put the formatVersion at the top level where UI can find it
      formatVersion: 2,

      // Include the complete metadata in a nested structure
      metadata: {
        formatVersion: 2,
        "format-version": 2,

        tableUuid: "123e4567-e89b-12d3-a456-426614174000",
        "table-uuid": "123e4567-e89b-12d3-a456-426614174000",

        // Add the missing sequence number field in both formats
        lastSequenceNumber: 34,
        "last-sequence-number": 34,

        location: `s3://${process.env.S3_BUCKET}`,

        lastUpdatedMs: Date.now(),
        "last-updated-ms": Date.now(),

        lastColumnId: 7,
        "last-column-id": 7,

        // Add required last-partition-id for format v2
        lastPartitionId: 1000,
        "last-partition-id": 1000,

        // Single schema (current schema)
        schema: usersTable,

        // Required for Iceberg Format V2: schemas array containing all schema versions
        schemas: [usersTable],

        // Current schema ID reference
        currentSchemaId: 0,
        "current-schema-id": 0,

        partitionSpec: [],
        "partition-spec": [],

        partitionSpecs: [
          {
            specId: 0,
            "spec-id": 0,
            fields: [],
          },
        ],
        "partition-specs": [
          {
            "spec-id": 0,
            fields: [],
          },
        ],

        defaultSpecId: 0,
        "default-spec-id": 0,

        // Add required sort-orders field for format v2
        sortOrders: [
          {
            orderId: 0,
            "order-id": 0,
            fields: [],
          },
        ],
        "sort-orders": [
          {
            "order-id": 0,
            fields: [],
          },
        ],

        // Add default sort order ID
        defaultSortOrderId: 0,
        "default-sort-order-id": 0,

        properties: {
          "write.format.default": "parquet",
          "write.parquet.compression-codec": "gzip",
        },

        currentSnapshotId: -1,
        "current-snapshot-id": -1,

        snapshots: [],

        snapshotLog: [],
        "snapshot-log": [],

        metadataLog: [],
        "metadata-log": [],
      },
    };

    // Log what we're sending
    console.log(`${getCurrentTimestamp()} - ✅ Metadata returned for ${objectName}`);

    // Return the structured response
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      error: error.message,
      stack: error.stack,
    });
    console.error(`${getCurrentTimestamp()} ❌ - tableName - Error occurred: ${error.message}`);
  }
};

export default tableName;

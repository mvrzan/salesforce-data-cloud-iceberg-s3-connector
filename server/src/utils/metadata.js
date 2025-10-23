const usersTable = {
  type: "struct",
  "schema-id": 0,
  fields: [
    { id: 1, name: "Id", required: false, type: "string" },
    { id: 2, name: "first_name", required: false, type: "string" },
    { id: 3, name: "last_name", required: false, type: "string" },
    { id: 4, name: "country", required: false, type: "string" },
    { id: 5, name: "date_of_birth", required: false, type: "string" },
  ],
};

const userActivities = {
  type: "struct",
  "schema-id": 0,
  fields: [
    { id: 1, name: "user_id", required: false, type: "string" },
    { id: 2, name: "activity_type", required: false, type: "string" },
    { id: 3, name: "activity_date", required: false, type: "date" },
    { id: 4, name: "location", required: false, type: "string" },
    { id: 5, name: "device_info", required: false, type: "string" },
  ],
};

const productsTable = {
  type: "struct",
  "schema-id": 0,
  fields: [
    { id: 1, name: "product_id", required: false, type: "string" },
    { id: 2, name: "product_name", required: false, type: "string" },
    { id: 3, name: "description", required: false, type: "string" },
    { id: 4, name: "category", required: false, type: "string" },
    { id: 5, name: "price", required: false, type: "string" },
  ],
};

const inventoryTable = {
  type: "struct",
  "schema-id": 0,
  fields: [
    { id: 1, name: "product_id", required: false, type: "string" },
    { id: 2, name: "warehouse_id", required: false, type: "string" },
    { id: 3, name: "quantity", required: false, type: "string" },
    { id: 4, name: "last_updated", required: false, type: "string" },
  ],
};

const TABLE_METADATA_REGISTRY = {
  "database_namespace_one.public.users": {
    schema: usersTable,
    s3Path: "database_namespace_one/public/users",
    glueMetadata: {
      tableUuid: "8d13e1e6-0cfc-48d0-985e-ba9a197a264b",
      timestamp: 1761152988497,
      snapshotId: 3618309918556220287,
      lastColumnId: 5,
      sparkAppId: "spark-application-1760124000186",
      manifestListFile: "snap-3618309918556220287-1-af2e3333-51bc-4aa1-b7e9-04540c0fa581.avro",
      metadataFile: "00000-a510961f-9d1e-409a-89b8-c9563d296c08.metadata.json",
      addedFilesSize: "1700",
      addedRecords: "10",
    },
  },
  "database_namespace_one.public.user_activities": {
    schema: userActivities,
    s3Path: "database_namespace_one/public/user_activities",
    glueMetadata: {
      tableUuid: "882f0fa0-a73a-46a4-a813-ec258bbda7b2",
      timestamp: 1761230091090,
      snapshotId: 2905492459683181223,
      lastColumnId: 5,
      sparkAppId: "spark-application-1761230049754",
      manifestListFile: "snap-2905492459683181223-1-d6ca76e6-79b4-441d-9152-79e2193a3c73.avro",
      metadataFile: "00000-7e986027-f0e5-4216-a673-b822bf2f8977.metadata.json",
      addedFilesSize: "1869",
      addedRecords: "10",
    },
  },
  "database_namespace_two.public.products": {
    schema: productsTable,
    s3Path: "database_namespace_two/public/products",
    glueMetadata: {
      tableUuid: "263d13d3-1ebb-464c-8cfa-412b928a1067",
      timestamp: 1761162040609,
      snapshotId: 3145819287284321818,
      lastColumnId: 5,
      sparkAppId: "spark-application-1761161998004",
      manifestListFile: "snap-3145819287284321818-1-33e9f718-6b3e-48ef-add0-86a2db4427e3.avro",
      metadataFile: "00000-72305c47-d825-4a80-919c-032cf46627a4.metadata.json",
      addedFilesSize: "2056",
      addedRecords: "10",
    },
  },
  "database_namespace_two.public.inventory": {
    schema: inventoryTable,
    s3Path: "database_namespace_two/public/inventory",
    glueMetadata: {
      tableUuid: "33eceb54-d0fb-4ef8-a0e5-b03bc7e87526",
      timestamp: 1761166028747,
      snapshotId: 4365061229438539921,
      lastColumnId: 4,
      sparkAppId: "spark-application-1761165991941",
      manifestListFile: "snap-4365061229438539921-1-962ac594-2e36-4a66-babe-a29e9f12997d.avro",
      metadataFile: "00000-a6e3c702-30eb-48ce-9e2a-34dd19411342.metadata.json",
      addedFilesSize: "1442",
      addedRecords: "10",
    },
  },
};

export const namespacesInfo = {
  namespaces: [["database_namespace_one"], ["database_namespace_two"]],
};

export const namespaceHierarchy = {
  topLevel: [["database_namespace_one"], ["database_namespace_two"]],
  children: {
    database_namespace_one: [["database_namespace_one", "public"]],
    database_namespace_two: [["database_namespace_two", "public"]],
  },
};

const normalizeNamespaceKey = (namespaceParts) => {
  const namespaceKey = namespaceParts.join(".");

  if (!namespaceKey.includes(".public")) {
    const firstPart = namespaceParts[0];
    return `${firstPart}.public`;
  }

  return namespaceKey;
};

const getTablesForNamespace = (namespaceKey) => {
  const tables = [];

  for (const [tableKey, _] of Object.entries(TABLE_METADATA_REGISTRY)) {
    if (tableKey.startsWith(namespaceKey)) {
      const tableName = tableKey.split(".").pop();
      tables.push({ name: tableName });
    }
  }

  return tables;
};

const buildIcebergMetadata = (tableEntry) => {
  const { schema, s3Path, glueMetadata } = tableEntry;
  const bucket = process.env.S3_BUCKET;
  const fullLocation = `s3://${bucket}/${s3Path}`;
  const baseMetadataPath = `${fullLocation}/metadata`;

  return {
    "format-version": 2,
    "table-uuid": glueMetadata.tableUuid,
    location: fullLocation,
    "last-sequence-number": 1,
    "last-updated-ms": glueMetadata.timestamp,
    "last-column-id": glueMetadata.lastColumnId,
    "current-schema-id": 0,
    schemas: [schema],
    "default-spec-id": 0,
    "partition-specs": [{ "spec-id": 0, fields: [] }],
    "last-partition-id": 999,
    "sort-orders": [{ "order-id": 0, fields: [] }],
    "default-sort-order-id": 0,
    properties: {
      owner: "hadoop",
      "write.parquet.compression-codec": "gzip",
    },
    "current-snapshot-id": glueMetadata.snapshotId,
    snapshots: [
      {
        "sequence-number": 1,
        "snapshot-id": glueMetadata.snapshotId,
        "timestamp-ms": glueMetadata.timestamp,
        summary: {
          operation: "append",
          "spark.app.id": glueMetadata.sparkAppId,
          "added-data-files": "1",
          "added-records": glueMetadata.addedRecords,
          "added-files-size": glueMetadata.addedFilesSize,
          "changed-partition-count": "1",
          "total-records": glueMetadata.addedRecords,
          "total-files-size": glueMetadata.addedFilesSize,
          "total-data-files": "1",
          "total-delete-files": "0",
          "total-position-deletes": "0",
          "total-equality-deletes": "0",
          "engine-version": "3.5.4-amzn-0",
          "app-id": glueMetadata.sparkAppId,
          "engine-name": "spark",
          "iceberg-version": "Apache Iceberg d15ff14 (commit d15ff144c77dff98552ddb3c39a86a1130fd4e32)",
        },
        "manifest-list": `${baseMetadataPath}/${glueMetadata.manifestListFile}`,
        "schema-id": 0,
      },
    ],
    statistics: [],
    "partition-statistics": [],
    "snapshot-log": [
      {
        "timestamp-ms": glueMetadata.timestamp,
        "snapshot-id": glueMetadata.snapshotId,
      },
    ],
    "metadata-log": [],
    refs: {
      main: {
        "snapshot-id": glueMetadata.snapshotId,
        type: "branch",
      },
    },
  };
};

const buildS3Config = () => ({
  "client.region": process.env.S3_AWS_REGION || "us-east-1",
  "s3.access-key-id": process.env.S3_ACCESS_KEY || "",
  "s3.secret-access-key": process.env.S3_SECRET_KEY || "",
});

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

export const getTablesInNamespace = (namespaceParts, pageToken, pageSize) => {
  const normalizedKey = normalizeNamespaceKey(namespaceParts);
  const allTables = getTablesForNamespace(normalizedKey);

  if (allTables.length === 0) {
    return { found: false, tables: [] };
  }

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

export const getTableMetadata = (namespaceParts, tableName) => {
  const normalizedKey = normalizeNamespaceKey(namespaceParts);
  const tableKey = `${normalizedKey}.${tableName}`;
  const tableEntry = TABLE_METADATA_REGISTRY[tableKey];

  if (!tableEntry) {
    return { found: false };
  }

  const bucket = process.env.S3_BUCKET;
  const metadata = buildIcebergMetadata(tableEntry);
  const config = buildS3Config();

  const metadataLocation = `s3://${bucket}/${tableEntry.s3Path}/metadata/${tableEntry.glueMetadata.metadataFile}`;

  return {
    found: true,
    metadataLocation,
    metadata,
    config,
  };
};

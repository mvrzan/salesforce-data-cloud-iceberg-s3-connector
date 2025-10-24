# 🔧 AWS Glue Metadata Update Guide

## Overview

After creating your Iceberg tables in AWS Glue, you need to extract the metadata and update `metadata.js` to match the Glue-generated files exactly.

---

## 📋 Steps for Each Table

### For **products** table:

1. **Go to S3 Console**

   - Navigate to: `s3://BUCKET_NAME/database_namespace_two/public/products/metadata/`

2. **Download the latest metadata JSON file**

   - Look for a file like: `00000-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.metadata.json`
   - Download it and open in a text editor

3. **Extract these values from the JSON:**

   ```json
   {
     "table-uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
     "last-updated-ms": 1234567890123,
     "current-snapshot-id": 1234567890123456789,
     "last-column-id": 5
   }
   ```

4. **Find the snapshot section** (near the bottom):

   ```json
   "snapshots": [{
     "snapshot-id": 1234567890123456789,
     "timestamp-ms": 1234567890123,
     "summary": {
       "spark.app.id": "spark-application-1234567890123",
       "added-files-size": "1234",
       "added-records": "10"
     },
     "manifest-list": "s3://BUCKET_NAME/.../snap-xxxxx-x-xxxxx.avro"
   }]
   ```

5. **Extract the manifest list filename**

   - From the `manifest-list` URL, get just the filename
   - Example: `snap-1234567890123456789-1-af2e3333-51bc-4aa1-b7e9-04540c0fa581.avro`

6. **Extract the metadata filename**
   - This is the file you downloaded in step 2
   - Example: `00000-a510961f-9d1e-409a-89b8-c9563d296c08.metadata.json`

---

### For **inventory** table:

Repeat the same process but navigate to:

- `s3://BUCKET_NAME/database_namespace_two/public/inventory/metadata/`

---

## 🔄 Update metadata.js

Open `/server/src/utils/metadata.js` and find the `TABLE_METADATA_REGISTRY` section.

### Update the products entry:

```javascript
"database_namespace_two.public.products": {
  schema: productsTable,
  s3Path: "database_namespace_two/public/products",
  glueMetadata: {
    tableUuid: "YOUR_PRODUCTS_UUID_HERE",              // From table-uuid
    timestamp: YOUR_PRODUCTS_TIMESTAMP_HERE,            // From last-updated-ms
    snapshotId: YOUR_PRODUCTS_SNAPSHOT_ID_HERE,        // From current-snapshot-id
    lastColumnId: 5,                                    // From last-column-id
    sparkAppId: "YOUR_SPARK_APP_ID_HERE",              // From spark.app.id
    manifestListFile: "YOUR_MANIFEST_FILENAME_HERE",    // Just the filename
    metadataFile: "YOUR_METADATA_FILENAME_HERE",        // Just the filename
    addedFilesSize: "YOUR_FILE_SIZE_HERE",             // From added-files-size
    addedRecords: "YOUR_RECORD_COUNT_HERE",            // From added-records
  },
},
```

### Update the inventory entry:

```javascript
"database_namespace_two.public.inventory": {
  schema: inventoryTable,
  s3Path: "database_namespace_two/public/inventory",
  glueMetadata: {
    tableUuid: "YOUR_INVENTORY_UUID_HERE",
    timestamp: YOUR_INVENTORY_TIMESTAMP_HERE,
    snapshotId: YOUR_INVENTORY_SNAPSHOT_ID_HERE,
    lastColumnId: 4,                                    // Inventory has 4 columns
    sparkAppId: "YOUR_SPARK_APP_ID_HERE",
    manifestListFile: "YOUR_MANIFEST_FILENAME_HERE",
    metadataFile: "YOUR_METADATA_FILENAME_HERE",
    addedFilesSize: "YOUR_FILE_SIZE_HERE",
    addedRecords: "YOUR_RECORD_COUNT_HERE",
  },
},
```

---

## ✅ Verification

After updating:

1. **Restart your Node.js server**

   ```bash
   cd server
   npm start
   ```

2. **Test with Salesforce Data Cloud**

   - Try to connect to the products table
   - Try to connect to the inventory table
   - Verify data is visible (not just headers)

3. **Check the logs**
   - Look for any errors in the console
   - Verify the API is returning the correct metadata

---

## 🎯 Quick Reference: Current Values

### ✅ users (already configured)

- UUID: `8d13e1e6-0cfc-48d0-985e-ba9a197a264b`
- Timestamp: `1760124034850`
- Snapshot ID: `4511538188449157632`

### ✅ user_activities (already configured)

- UUID: `f6ffe34c-4ff3-43e4-aead-8a705fff854c`
- Timestamp: `1761152988497`
- Snapshot ID: `3618309918556220287`

### ⏳ products (needs update)

- Replace all `PLACEHOLDER_UUID` and placeholder values

### ⏳ inventory (needs update)

- Replace all `PLACEHOLDER_UUID` and placeholder values

---

## 💡 Pro Tips

1. **Double-check the S3 path structure** - Make sure it matches exactly: `database_namespace_two/public/products` (note the capital D)

2. **Use the latest metadata file** - If there are multiple, use the one with the highest number (e.g., `00001-` is newer than `00000-`)

3. **Keep the full snapshot ID** - These are large numbers (like `4511538188449157632`), don't truncate them

4. **Copy-paste carefully** - UUIDs and filenames must be exact, including hyphens and extensions

5. **Test one table at a time** - Update products first, test it, then update inventory

---

## 🚨 Common Issues

**Issue**: "Table not found" error

- **Solution**: Check that the namespace and table name match exactly (case-sensitive)

**Issue**: "No data visible in Salesforce"

- **Solution**: Verify all Glue metadata values match the S3 files exactly

**Issue**: "Manifest not found" error

- **Solution**: Check the manifest-list filename is correct and the file exists in S3

---

## 📝 Example: Complete Entry

Here's what a complete, working entry looks like (from user_activities):

```javascript
"database_namespace_one.public.user_activities": {
  schema: userActivities,
  s3Path: "database_namespace_one/public/user_activities",
  glueMetadata: {
    tableUuid: "f6ffe34c-4ff3-43e4-aead-8a705fff854c",
    timestamp: 1761152988497,
    snapshotId: 3618309918556220287,
    lastColumnId: 5,
    sparkAppId: "spark-application-1761152955319",
    manifestListFile: "snap-3618309918556220287-1-af2e3333-51bc-4aa1-b7e9-04540c0fa581.avro",
    metadataFile: "00000-a510961f-9d1e-409a-89b8-c9563d296c08.metadata.json",
    addedFilesSize: "1700",
    addedRecords: "10",
  },
},
```

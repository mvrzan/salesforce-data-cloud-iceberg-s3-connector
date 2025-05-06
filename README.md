<p align="center">
<a  href="https://www.salesforce.com/"><img  src="./screenshots/salesforce_logo.svg"  alt="Heroku"  width="150" height="150" hspace="50"/></a>
<a href="https://www.salesforce.com/data/"><img  src="./screenshots/data_cloud_logo.png"  alt="lock_icon"  width="150" height="150" hspace="50"/></a>
<a href="https://iceberg.apache.org/"><img  src="./screenshots/apache_iceberg_logo.png"  alt="lock_icon"  width="150" height="150" hspace="50"/></a>
<p/>

# Data Cloud Apache Iceberg Connector with S3

Learn how you can leverage Heroku AppLink with a Node.js Express server to exposes your Heroku app as API services in Salesforce.

> **Disclaimer:** At the time of publishing this repository, the official [Data Cloud Apache Iceberg](https://developer.salesforce.com/docs/data/data-cloud-int/guide/c360-a-apacheiceberg-connector.html) connector was in beta

# Table of Contents

- [Data Cloud Apache Iceberg Connector with S3](#data-cloud-apache-iceberg-connector-with-s3)
- [Table of Contents](#table-of-contents)
  - [What Does It Do?](#what-does-it-do)
  - [How does it work?](#how-does-it-work)
  - [Project Structure](#project-structure)
  - [API Documentation](#api-documentation)
    - [Architecture diagram](#architecture-diagram)
  - [Technologies used](#technologies-used)
- [Configuration](#configuration)
  - [Requirements](#requirements)
  - [Setup](#setup)
    - [Local environment configuration](#local-environment-configuration)
  - [Deployment](#deployment)
  - [Troubleshooting](#troubleshooting)
    - [Common Issues](#common-issues)
- [License](#license)
- [Disclaimer](#disclaimer)

---

## What Does It Do?

The Salesforce Data Cloud [Iceberg S3 Connector](https://developer.salesforce.com/docs/data/data-cloud-int/guide/c360-a-apacheiceberg-connector.html) facilitates seamless integration between Salesforce Data Cloud and AWS S3, utilizing Apache Iceberg's table format capabilities. This connector enables:

- **Data Extraction**: Data Cloud to read data directly from an S3 bucket without copying data to Data Cloud (Zero Copy)
- **S3 Storage Integration**: Read parquet files directly from AWS S3
- **Schema Evolution**: Manages schema changes and data versioning through Iceberg's native capabilities

## How does it work?

## Project Structure

```
├── README.md
├── screenshots/                    # Contains images used in documentation
├── server/
│   ├── src/
│   │   ├── controllers/            # API request handlers
│   │   │   ├── config.js            # Config controller
│   │   │   ├── namespaces.js       # Namespace controller
│   │   │   ├── namespaceTables.js  # Tables by namespace controller
│   │   │   └── tableName.js        # Table details controller
│   │   ├── middleware/
│   │   │   └── middleware.js       # Express middleware functions
│   │   ├── routes/
│   │   │   └── catalog.js          # Iceberg REST catalog routes
│   │   ├── utils/
│   │   │   ├── loggingUtil.js      # Logging helper functions
│   │   │   └── metadata.js         # Iceberg schema & metadata definitions
│   │   └── index.js                # Express application setup
│   ├── package.json                # Dependencies and scripts
|   ├── package-lock.json           # Dependencies
│   └── .env.example                # Example environment variables
└── examples/                       # Example files for connector usage
    └── data/                       # Sample table parquet files
    └── metadata/                   # Sample metadata files
```

## API Documentation

- Official Apache Iceberg [Swagger](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/apache/iceberg/main/open-api/rest-catalog-open-api.yaml) documentation.
- Official Apache Iceberg [specifications](https://iceberg.apache.org/spec/).
- Official Apache Iceberg [GitHub](https://github.com/apache/iceberg).

**Core Endpoints**

- `GET /v1/config` - Returns configuration details for the REST catalog
- `GET /v1/namespaces` - Lists all available namespaces (in this implementation: Database_namespace_one, Database_namespace_two)
- `GET /v1/namespaces/{namespace}/tables` - Lists all tables in a specific namespace
- `GET /v1/namespaces/{namespace}/tables/{table}` - Returns detailed table metadata for a specific table

### Architecture diagram

## Technologies used

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Salesforce Data Cloud](https://www.salesforce.com/data/)
- [Heroku](https://www.heroku.com/)

For a more detailed overview of the development & production dependencies, please check [`package.json`](./server/package.json).

# Configuration

## Requirements

To run this application locally, you will need the following:

- An active Salesforce account with Data Cloud
- Node.js version 20 or later installed (type `node -v` in your terminal to check). Follow [instructions](https://nodejs.org/en/download) if you don't have node installed
- npm version 10.0.0 or later installed (type `npm -v` in your terminal to check). Node.js includes `npm`
- git installed. Follow the instructions to [install git](https://git-scm.com/downloads)
- A [Heroku account](https://signup.heroku.com/)

## Setup

### Local environment configuration

## Deployment

Once you are happy with your application, you can deploy it to Heroku!

To deploy the application to Heroku, please follow the [official instructions](https://devcenter.heroku.com/articles/git).

## Troubleshooting

### Common Issues

# License

[MIT](http://www.opensource.org/licenses/mit-license.html)

# Disclaimer

This software is to be considered "sample code", a Type B Deliverable, and is delivered "as-is" to the user. Salesforce bears no responsibility to support the use or implementation of this software.

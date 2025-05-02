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
  - [What does it do?](#what-does-it-do)
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

## What does it do?

## How does it work?

## Project Structure

## API Documentation

Official Apache Iceberg [Swagger](https://editor-next.swagger.io/?url=https://raw.githubusercontent.com/apache/iceberg/main/open-api/rest-catalog-open-api.yaml) documentation.

### Architecture diagram

## Technologies used

- [Node.js](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

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

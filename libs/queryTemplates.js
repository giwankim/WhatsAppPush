'use strict';

const docClient = require('./dynamodb-client');
const commonMiddleware = require('./middleware/commonMiddleware');

const tableName = process.env.TEMPLATES_TABLE_NAME;

exports.queryTemplates = () => {};

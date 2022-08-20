'use strict';
const commonMiddleware = require('../../libs/middleware/commonMiddleware');

const details = (event) => {};

exports.handler = commonMiddleware(details);

'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  file_name: Joi.string().required(),
});

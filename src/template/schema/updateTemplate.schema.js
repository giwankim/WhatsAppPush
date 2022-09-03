'use strict';

const Joi = require('@hapi/joi');

module.exports = Joi.object({
  templateName: Joi.string().required(),
  templateMessage: Joi.string().required(),
});

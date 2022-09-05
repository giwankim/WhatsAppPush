'use strict';

const HttpStatus = require('http-status');
const { getPresignedPut } = require('../../libs/s3-client');
const { handleSuccess, handleError } = require('../../libs/utils/response-util');
const { makeHandler } = require('../../libs/utils/handler-util');
const { getSignedUrlSchema } = require('../schema/getSignedUrl.schema');

const handler = async (event) => {
  const { userId } = event.pathParameters;
  const { file_name: fileName } = event.body;
  const date = new Date().toJSON().slice(0, 10);
  const filePath = `${userId}/${date}/${fileName}`;
  const params = {
    Bucket: process.env.RECIPIENT_FILES_BUCKET_NAME,
    Key: filePath,
  };
  const expiresIn = 6000; // URL expires in 10 minutes
  const { url, error } = await getPresignedPut(params, expiresIn);
  if (error) {
    return handleError(HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
  return handleSuccess({
    signedUrl: url,
    s3FilePath: filePath,
  });
};

exports.handler = makeHandler(handler, getSignedUrlSchema);

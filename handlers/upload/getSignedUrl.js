'use strict';
const S3 = require('aws-sdk/clients/s3');
const HttpStatus = require('http-status');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const getSignedUrlSchema = require('../../libs/schema/getSignedUrl.schema');
const { handleSuccess, handleError } = require('../../libs/response-handler');

const s3Client = new S3({
  signatureVersion: 'v4',
});

const getSignedUrl = async (event) => {
  if (!event.body || !event.pathParameters) {
    throw new Error('Missing parameter');
  }
  const { userId } = event.pathParameters;
  if (!userId) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Upload:GetSignedUrl:Error]:${
        HttpStatus[HttpStatus.BAD_REQUEST]
      }: "Invalid parameter user_id"`
    );
  }
  const { error, value } = getSignedUrlSchema.validate(event.body);
  if (error) {
    return handleError(
      HttpStatus.BAD_REQUEST,
      `[Upload:GetSignedUrl:Error]:${HttpStatus[HttpStatus.BAD_REQUEST]}: ${error}`
    );
  }
  try {
    const { file_name: fileName } = value;
    const date = new Date().toJSON().slice(0, 10);
    const filePath = `${userId}/${date}/${fileName}`;
    const params = {
      Bucket: process.env.RECIPIENT_FILES_BUCKET_NAME,
      Key: filePath,
      Expires: 6000, // URL expires in 10 minutes
    };
    const url = await s3Client.getSignedUrlPromise('putObject', params);
    return handleSuccess({
      signedUrl: url,
      s3FilePath: filePath,
    });
  } catch (error) {
    return handleError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `[Upload:GetSignedUrl:Error]: ${error.stack}`
    );
  }
};

exports.handler = commonMiddleware(getSignedUrl);

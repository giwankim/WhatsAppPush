'use strict';

const HttpStatus = require('http-status');
const commonMiddleware = require('../../libs/middleware/commonMiddleware');
const getSignedUrlSchema = require('../schema/getSignedUrl.schema');
const { getPresignedPutObject } = require('../../libs/utils/s3-util');
const { handleSuccess, handleError } = require('../../libs/utils/response-handler');

const getUploadUrl = async (event) => {
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
    };
    const expiresIn = 6000; // URL expires in 10 minutes
    const url = await getPresignedPutObject(params, expiresIn);
    return handleSuccess({
      signedUrl: url,
      s3FilePath: filePath,
    });
  } catch (err) {
    return handleError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      `[Upload:GetSignedUrl:Error]: ${err.stack}`
    );
  }
};

exports.handler = commonMiddleware(getUploadUrl);

'use strict';

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: process.env.REGION });

exports.getPresignedPutObject = (params, expiresIn) => {
  const command = new PutObjectCommand(params);
  return getSignedUrl(s3Client, command, { expiresIn });
};

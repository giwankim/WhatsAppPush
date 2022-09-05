'use strict';

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: process.env.REGION });

exports.getPresignedPut = async (params, expiresIn) => {
  try {
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return { url };
  } catch (error) {
    console.log('Error generating presigned url');
    console.log(error);
    return { error };
  }
};

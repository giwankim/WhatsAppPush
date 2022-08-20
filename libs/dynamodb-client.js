'use strict';
// eslint-disable-next-line import/no-extraneous-dependencies
const { DocumentClient } = require('aws-sdk/clients/dynamodb');

const docClient = new DocumentClient();

exports.get = (params) => {
  return docClient.get(params).promise();
};

exports.put = (params) => {
  return docClient.put(params).promise();
};

exports.query = (params) => {
  return docClient.query(params).promise();
};

// exports.scan = async (params) => {
//   let output;
//   const items = [];
//   do {
//     output = await docClient.scan(params).promise();
//     if (output.Items) {
//       items.push(...output.Items);
//     }
//   } while ();
//   return {
//     lastEvaluatedKey: output.LastEvaluatedKey,
//     items,
//   };
// };

exports.update = async (params) => {
  await docClient.update(params).promise();
};

exports.delete = async (params) => {
  await docClient.delete(params).promise();
};

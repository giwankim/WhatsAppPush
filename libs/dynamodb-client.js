'use strict';
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  QueryCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const ddbClient = new DynamoDBClient({ region: process.env.REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

exports.put = (params) => {
  return ddbDocClient.send(new PutCommand(params));
};

exports.get = (params) => {
  return ddbDocClient.send(new GetCommand(params));
};

exports.query = (params) => {
  return ddbDocClient.send(new QueryCommand(params));
};

exports.update = (params) => {
  return ddbDocClient.send(new UpdateCommand(params));
};

exports.delete = (params) => {
  return ddbDocClient.send(new DeleteCommand(params));
};

exports.scan = async (params) => {
  let output;
  const items = [];
  do {
    output = await ddbDocClient.send(new ScanCommand(params));
    // output = await docClient.scan(params).promise();
    if (output.Items) {
      items.push(...output.Items);
    }
  } while (
    params.ExclusiveStartKey === output.lastEvaluatedKey &&
    (!params.Limit || params.Limit < items.length)
  );
  return {
    lastEvaluatedKey: output.LastEvaluatedKey,
    items,
  };
};

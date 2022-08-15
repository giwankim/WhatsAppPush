# WhatsAppPush

## Requirements

- Users should be able to create, edit, and delete the message template.
- Users should be able to send bulk messages by uploading the recipient list in CSV or XLSX format.
- Users should be able to send messages individually. Consider a scenario where the user must send a message to only one of their clients.
- Users should be able to see the message delivery status logs.

## Techniques

### NodeJS libraries

- `csv-parser`
- `aws-sdk`
- `joi`
- `http-status`
- `twilio-node`
- `node-xlsx`

### Serverless Framework

### AWS Resources

- AWS API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon SQS
- Amazon S3

## TODO

- [x] Create DynamoDB table called `Templates`.
    - Partition key: `user_id` of type string
    - Sort key: `template_id` of type string
- [ ] Define a lambda function called `CreateTemplates` associated with POST API route `/templates` that adds a new message template.
    - Template message records must have assocated template name, message text, and user ID
        - Validate the POST request body before saving it to DynamoDB. In case of validation error, return an appropriate error message with HTTP status code.
        - To identify each template uniquely in the Templates table, associate a unique ID.
    - POST request for creating a message template should be idempotent.
        - Use a unique identifier called `idempotent_key` in the request body and check if the attribute value exists in the `Templates` table
        - If the attribute value exists, return the existing result; otherwise, insert a new record and return the newly created record details

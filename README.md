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

## Development Log

### Milestone 2

#### Requirements

- REST API endpoints to manage and save message templates in DynamoDB

#### TODO

- [x] DynamoDB table called `Templates`.
    - Partition key: `user_id` of type string
    - Sort key: `template_id` of type string

- [x] Implement `CreateTemplates` associated with POST `/templates` that adds a new message template.
    - Template message records must have assocated template name, message text, and user ID
        - [x] Validate the POST request body before saving it to DynamoDB. In case of validation error, return an appropriate error message with HTTP status code.
        - [x] To identify each template uniquely in the Templates table, associate a unique ID.
    - POST request for creating a message template should be idempotent.
        - [x] Use a unique identifier called `idempotent_key` in the request body and check if the attribute value exists in the `Templates` table
    - [x] If the attribute value exists, return the existing result; otherwise, insert a new record and return the newly created record details

- [x] Implement `UpdateTemplates` associated with PUT `/templates/{user_id}/{template_id}` to provide an edit feature for message templates.
    - [x] Make sure templates exists in the Templates table that the user is trying to edit. In case of an error, return an appropriate error message response along with the appropriate HTTP status code.
    - [x] Parse and validate the request body to make sure that valid message template data is going to be updated. Otherwise, return an appropriate validation error message response along with the appropriate HTTP status code.
    - [x] Use the DynamoDB update method and return updated details to the clients.

- [x] To provide a template delete feature, define a lambda function `DeleteTemplates` associated with DELETE API route `/templates/{user_id}/{template_id}`.
    - [x] Validate incoming request parameters; return appropriate HTTP status code for errors.
    - [x] After successfully deleting a record, this handler returns HTTP status code 200 (OK).

- [x] Add lambda function `DetailsTemplates` to the route GET `/templates/{user_id}{template_id}`; associate a handler that returns the message template details.
    - [x] Parse and validate the message from request parameter; otherwise, return appropriate error messages along with the appropriate HTTP status code.
    - [x] Query the message template record based on the partition key and sort key.

- [x] Implement lambda function `ListTemplates` associated with the route GET `/templates/{user_id}` and a handler that lists all message templates available to a user.
    - [x] Parse and validate request paramaters; otherwise, return appropriate error messages along with the appropriate HTTP status code.
    - [x] Query templates based on user ID and return the templates list to the client.

- [ ] Test all the endpoint by invoking the lambda functions locally with the required data, then verify that it is returning as expected or not.

- [x] Deploy using the Serverless Framework, then test the service endpoints using Postmant or curl commands.

### Milestone 3

#### Requirements

- Build a feature that allows users to upload recipient list files into an AWS S3 private bucket using AWS pre-signed URLs and lambda functions
- Pre-signed URL will be generated upon request for a new endpoint. Then endpoint will accept the file name that our user wants to upload, then return a pre-signed URL. Clients will use this URL to upload any recipient list CSV or XLSX files.

**Note**
There are number of ways to create credentials that can be used to create a pre-signed URL:
- AWS IAM credentials valid for up to 6 hours
- AWS STS credentials valid for up to 36 hours
- AWS IAM User credentials valid for up to 7 days

For this project we will be using AWS IAM user credentials (Signature Version 4).

#### TODO

- [x] Allocate an S3 bucket to receive file uploads
    - [x] Name should be DNS compliant [0-9A-Za-z] and !, -, _, ., *, ', (,)
    - [ ] CORS configuration for GET and POST methods
- [x] Define a lambda function `GetSignedUrl` associated with the route POST `/upload-url/{userId}` to create a presigned URL to upload a file.
    - [x] Parse and validate the request body parameter `file_name` which will be used for a key while creating a presigned URL
    - [x] Lambda function should have an role that can put objects into the allocated S3 bucket
    - [x] Use AWS SDK to create a S3 client and use the `putObject` function

### Milestone 4

#### Requirements

Implement a lambda function called `CreateNotification` that reads recipient list in CSV/XLSX format; parses and extracts recipient details using `csvtojson` and `node-xlsx`; then publishes the payload which includes the message template and phone numbers onto AWS SQS for further processing.

#### TODO

- [x] Create SQS queue called `WhatsAppMessageQueue`.
    - [x] Setup appropriate permissions to publish messages to the queue
- [x] Create a DynamoDB table called `NotificationTask` that stores notification task details such as message, message template, recipient, and other relevant fields submitted by users.
    - [x] Create a composite primary key with partition key called `user_id` of type string and `notification_id` as sort key of type string.
- [ ] Provide an endpoint to which users will submit notification tasks.This endpoint will accept the details about recipient, message text, and other relevant fields.
    - [ ] Handle both bulk and individual message delivery tasks. The route for both operations should be the same, the difference being the request body paramters.
    - [ ] Parse and validate the POST request body from the event object; otherewise return the appropriate error messages along with the appropriate HTTP status code.
    - [ ] Store submitted notification task details such as message, recipient or recipient file, and other properties into the `NotificationTask` table.
- [ ] Implement `ListNotification` associated with the route GET `/notification/{userId}` that lists all notification tasks by `user_id` from the `NotificationTask` table.

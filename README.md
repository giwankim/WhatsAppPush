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

- [x] Define a lambda function called `CreateTemplates` associated with POST API route `/templates` that adds a new message template.
    - Template message records must have assocated template name, message text, and user ID
        - [x] Validate the POST request body before saving it to DynamoDB. In case of validation error, return an appropriate error message with HTTP status code.
        - [x] To identify each template uniquely in the Templates table, associate a unique ID.
    - POST request for creating a message template should be idempotent.
        - [x] Use a unique identifier called `idempotent_key` in the request body and check if the attribute value exists in the `Templates` table
        - [x] If the attribute value exists, return the existing result; otherwise, insert a new record and return the newly created record details

- [ ] Define a lambda function called UpdateTemplates associated with PUT API route `/templates/{user_id}/{template_id}` to provide an edit feature for message templates.
    - [ ] Make sure templates exists in the Templates table that the user is trying to edit. In case of an error, return an appropriate error message response along with the appropriate HTTP status code.
    - [ ] Parse and validate the request body to make sure that valid message template data is going to be updated. Otherwise, return an appropriate validation error message response along with the appropriate HTTP status code.
    - [ ] Use the DynamoDB update method and return updated details to the clients.

- [ ] To provide a template delete feature, define a lambda function `DeleteTemplates` associated with DELETE API route `/templates/{user_id}/{template_id}`.
    - [ ] Validate incoming request parameters; return appropriate HTTP status code for errors.
    - [ ] After successfully deleting a record, this handler returns HTTP status code 200 (OK).

- [ ]  Add lambda function `DetailsTemplates` and associate a handler that returns the message template details. Add a GET API route `/templates/{user_id}{template_id}`.
    - [ ] Parse and validate the message "required parameter" form request parameter; otherwise, return appropriate error messages along with the appropriate HTTP status code.
    - [ ] Query the message template record base on the partition key and sort key from the Templates table.

- [ ] Define a lambda function named `ListTemplates` and associate a handler that would help list all message templates available to a user. Add an API route `/templates/{user_id}`.
    - [ ] Create a handler that contains the business logic to list message template records by user ID.
    - [ ] Parse and validate request paramaters; otherwise, return appropriate error messages along with the appropriate HTTP status code.
    - [ ] Query templates based on user ID and return the templates list to the client.
- [ ] Test all the endpoint by invoking the lambda functions locally with the required data, then verify that it is returning as expected or not.
- [ ] Deploy using the Serverless Framework, then test the service endpoints using Postmant or curl commands.
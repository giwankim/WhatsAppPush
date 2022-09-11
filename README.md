# WhatsAppPush

## Requirements

- Users should be able to create, edit, and delete the message template.
- Users should be able to send bulk messages by uploading the recipient list in CSV or XLSX format.
- Users should be able to send messages individually. Consider a scenario where the user must send a message to only one of their clients.
- Users should be able to see the message delivery status logs.

## Database

### TemplatesTable

| | |
| --- | --- |
| user_id | PK |
| template_id | SK |
| template_name |  |
| template_message |  |
| created_at |  |
| idempotent_key |  |

### NotificationTaskTable

| | |
| -- | -- |
| user_id | PK |
| notification_id | SK |
| message | |
| message_template_id | |
| recipient | |
| recipient_list_file | |
| created_at | |
| idempotent_key |  |

## Development Log

### CRUD for message templates

#### Requirements

- REST API endpoints to manage and save message templates in DynamoDB

#### TODO

- [x] Create DynamoDB table called `TemplatesTable` with partition key `user_id` of type string and sort key `template_id` of type string.

- [x] Implement `CreateTemplates` associated with POST `/templates` that adds a new message template.
    - [x] POST request for creating a message template should be idempotent.
    - [x] If the attribute value exists, return the existing result; otherwise, insert a new record and return the newly created record details

- [x] Implement `UpdateTemplates` associated with PUT `/templates/{user_id}/{template_id}` for editting message templates.
    - [x] Check that templates exists in the Templates table. In case of an error, return an appropriate error message response along with the appropriate HTTP status code.
    - [x] Use DynamoDB's update method and return updated details to the clients.

- [x] Implement `DeleteTemplates` associated with DELETE `/templates/{user_id}/{template_id}` to delete a template.
    - [x] After successfully deleting a record, handler returns HTTP status code 200 (OK).

- [x] Add lambda function `DetailsTemplates` to GET `/templates/{user_id}{template_id}`; associate a handler that returns the message template details.

- [x] Implement lambda function `ListTemplates` associated with the route GET `/templates/{user_id}` and a handler that lists all message templates available to a user.

### File upload

#### Requirements

- Users can upload recipient list files into a private S3 bucket using presigned URLs

#### TODO

- [x] Allocate an S3 bucket to receive file uploads
    - [x] Name should be DNS compliant [0-9A-Za-z] and !, -, _, ., *, ', (,)
    - [ ] CORS configuration for GET and POST methods

- [x] Define a lambda function `GetSignedUrl` associated with POST `/upload-url/{userId}` to create a presigned URL.
    - [x] Parse and validate the request body parameter `fileName` which will be used for a key while creating a presigned URL
    - [x] Lambda function should have an role that can put objects into the allocated S3 bucket

### Enqueue message requests

#### Requirements

- Implement a lambda function called `CreateNotification` that reads CSV/XLSX recipient list; then publishes the parsed and extracted recipient details including the message template and phone numbers onto SQS message queue for further processing.

#### TODO

- [x] Create SQS queue called `WhatsAppMessageQueue` with appropriate permissions to publish messages to the queue.

- [x] Create a DynamoDB table called `NotificationTaskTable` that stores notification task details such as message, message template, recipient, and other relevant fields submitted by users.
    - [x] The table should have a composite primary key consisting of partition key `user_id` of type string and sort key `notification_id` of type string.

- [ ] Provide an endpoint to which users will submit notification tasks. This endpoint will accept the details about recipient, message text, and other relevant fields.
    - [ ] Handle both bulk and individual message delivery tasks. The route for both operations should be the same, the difference being the request body paramters.
    - [ ] Store submitted notification task details such as message, recipient or recipient file, and other properties into `NotificationTaskTable`.
    - [ ] If user uploaded recipient list file, parse the CSV/XLSX file and process the parsed data
    - [ ] Send these notification task details to the `WhatsAppMessageQueue`

- [x] Define lambda function `ListNotifications` associated with GET `/notification/{userId}` that lists all notification tasks by `user_id` from `NotificationTaskTable`.

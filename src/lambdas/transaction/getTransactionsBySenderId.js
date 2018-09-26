const TransactionModel = require('../../models/transactionModel');

exports.handler = (event, context, callback) => {
    const sender_id = event.pathParameters.sender_id;

    TransactionModel.getTransactionsBySenderId(sender_id)
         .then (transactions => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(transactions),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
         .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
};
const TransactionModel = require('../../models/transactionModel');

exports.handler = (event, context, callback) => {
    const id = event.pathParameters.sender_id;

    TransactionModel.getTransactionHistory(id)
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
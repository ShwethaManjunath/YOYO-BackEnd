const TransactionModel = require('../../models/transactionModel');

exports.handler = (event, context, callback) => {
    var params = {
        TableName : "Transactions",
    };
    if(event.queryStringParameters) {
        const id = event.queryStringParameters.id;
        TransactionModel.getTransaction(id)
         .then (transaction => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "content-type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(transaction),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
         .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    "content-type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
    } 
        
    

   else{ TransactionModel.getTransactions(params)
         .then (transaction => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(transaction),
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
   }
};
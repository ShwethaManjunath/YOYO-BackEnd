const TransactionModel = require('../../models/transactionModel');

exports.handler = (event, context, callback) => {
     
    const transactionData = JSON.parse(event.body);
    transactionData.id ='id' + (new Date()).getTime();

    TransactionModel.save(transactionData)
    .then ( transaction => {
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
    .catch ( err => {
        var response = {
            "statusCode": 500,
            "headers": {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            "body": JSON.stringify(err),
            "isBase64Encoded": false
        };
        callback(response, null);
    })
};
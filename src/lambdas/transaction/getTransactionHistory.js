const TransactionModel = require('../../models/transactionModel');

exports.handler = (event, context, callback) => {
  const id = parseInt(event.pathParameters.sender_id);

  TransactionModel.getTransactionHistory(id)
    .then(transactions => {
      var response = {
        "statusCode": 200,
        "headers": {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
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
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        "body": JSON.stringify(err),
        "isBase64Encoded": false
      };
      callback(null, response);
    })
};
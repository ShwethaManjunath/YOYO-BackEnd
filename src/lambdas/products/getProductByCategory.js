const productsModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    const id = event.queryStringParameters.categoryId;
        productsModel.getProductByCategory(id)
        .then(products => {
            var response = {
                "statusCode": 200,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(products),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
        .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        });
    }

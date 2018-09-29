const productsModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    const lowerLimit = event.queryStringParameters.lowerLimit;
    const upperLimit = event.queryStringParameters.upperLimit;
    console.log("ll", lowerLimit);
    console.log("ul", upperLimit);
        productsModel.filterByPrice(lowerLimit, upperLimit)
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
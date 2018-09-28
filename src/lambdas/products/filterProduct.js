const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {

    const qParams = event.queryStringParameters;

    productModel.filterProducts(id)
        .then(products => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "content-type": "application/json",
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
                    "content-type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
};
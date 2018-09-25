const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    
    const id = event.pathParameters.id;

    productModel.getProduct(id)
         .then (product => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(category),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
         .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
};
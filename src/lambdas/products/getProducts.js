const productsModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    console.log('getProducts handler called')

    productsModel.getProducts()
         .then (products => {
            var response = {
                "statusCode": 200,
                "body": JSON.stringify(products),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
         .catch(err => {
            var response = {
                "statusCode": 500,
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
};
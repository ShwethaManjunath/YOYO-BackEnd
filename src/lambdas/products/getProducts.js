const productsModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    console.log('getProducts handler called')
    var params = {
        TableName : "Products",
    };

    productsModel.getProducts(params)
         .then (products => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "content-type": "application/json"
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
                    "content-type": "application/json"
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
};
const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    const product = JSON.parse(event.body);
    product.id ='id' + (new Date()).getTime();

    productModel.save(product)
    .then ( product => {
        var response = {
            "statusCode": 200,
            "headers": {
                "content-type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            "body": JSON.stringify(product),
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
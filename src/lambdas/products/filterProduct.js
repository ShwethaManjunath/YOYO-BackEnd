const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {

    const qParams = event.queryStringParameters || {};
    console.log('Query Params: ', qParams);
    const categories = [];
    let i = 0;
    while(qParams[i+'']) {
        categories.push(qParams[i+''])
        i++;
    }
    console.log('Categories: ', categories);
    const minPrce = qParams.lowerPrice? qParams.lowerPrice : 0;
    const maxPrice = qParams.upperPrice? qParams.upperPrice : 9999999;

    productModel.filterProducts(categories, +minPrce, +maxPrice)
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
}
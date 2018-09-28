const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const category_id = event.queryStringParameters.categoryId;

    productModel.deleteItem(id, category_id)
        .then(product => {
            var response = {
                "statusCode": 200,
                "message":"Delete successful",
                "body": JSON.stringify(product),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
        .catch(err => {
            var response = {
                "statusCode": 500,
                "message": 'Delete unsuccessful',
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
};
const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const category_id = event.queryStringParameters.categoryId;

    productModel.deleteItem(id, category_id)
        .then(category => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
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
                    "my_header": "my_value"
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
};
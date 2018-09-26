const productsModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
     
    const sortingData = JSON.parse(event.body);

    productsModel.getSortedProducts(sortingData)
    .then ( sortedProducts => {
        var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(sortedProducts),
            "isBase64Encoded": false
        };
        callback(null, response);
    })
    .catch ( err => {
        var response = {
            "statusCode": 500,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(err),
            "isBase64Encoded": false
        };
        callback(response, null);
    })
};
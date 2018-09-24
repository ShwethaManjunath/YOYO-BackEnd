const CategoryModel = require('../models/CategoryModel');

exports.handler = (event, context, callback) => {
    console.log('getCategory handler called')
    
    const id = event.pathParameters.id;

    CategoryModel.getCategory(id)
         .then (category => {
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
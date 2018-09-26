const CategoryModel = require('../../models/CategoryModel');

exports.handler = (event, context, callback) => {
    console.log('getCategories handler called')
    var params = {
        TableName : "Categories",
    };

    CategoryModel.getCategories(params)
         .then (categories => {
            var response = {
                "statusCode": 200,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(categories),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
         .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
};
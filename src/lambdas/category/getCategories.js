const CategoryModel = require('../../models/CategoryModel');

exports.handler = (event, context, callback) => {
    console.log('getCategories handler called')
    var params = {
        TableName : "Categories",
        // KeyConditionExpression: "#yr = :yyyy",
        // ExpressionAttributeNames:{
        //     "#yr": "id"
        // },
        // ExpressionAttributeValues: {
        //     ":yyyy": 1
        // }
    };

    CategoryModel.getCategories(params)
         .then (categories => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
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
                    "my_header": "my_value"
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
         })
};
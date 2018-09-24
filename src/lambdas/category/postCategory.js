const CategoryModel = require('../models/CategoryModel');

exports.handler = (event, context, callback) => {
    console.log('postCategory handler called')
     
    const categoryData = JSON.parse(event.body);
    // FIXME: UUID
    categoryData.id = Math.ceil(Math.random() * 100000000);

    CategoryModel.save(categoryData)
    .then ( category => {
        var response = {
            "statusCode": 200,
            "headers": {
                "my_header": "my_value"
            },
            "body": JSON.stringify(categoryData),
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
        callback(null, response);
    })
};
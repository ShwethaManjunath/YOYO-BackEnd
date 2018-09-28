const CategoryModel = require('../../models/CategoryModel');

exports.handler = (event, context, callback) => {
    console.log('putCategory handler called');
    
    const categoryData = event;
    // FIXME: UUID
    //categoryData.id = Math.ceil(Math.random() * 100000000);

    CategoryModel.update(categoryData)
        .then(category => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "content-type": "application/json",
                    'Access-Control-Allow-Origin': '*',
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
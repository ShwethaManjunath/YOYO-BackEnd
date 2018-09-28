const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    
    const product = {
        avgRating: event.body.avgRating,
        image: event.body.image,
        points: event.body.points,
        thumbnail: event.body.thumbnail,
        retailer_id: event.body.retailer_id,
        description: event.body.description,
        id: event.body.id,
        title: event.body.title,
        categoryId: event.body.categoryId
    }

    productModel.update(product)
    .then ( product => {
        var response = {
            "statusCode": 200,
            "headers": {
                "content-type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            "message":"Product updated",
            "body": JSON.stringify(product),
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
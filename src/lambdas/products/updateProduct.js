const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    
    const product = {
        avgRating: event.avgRating,
        image: event.image,
        categoryId: 1,
        points: event.points,
        updatedAt: new Date().getTime(),
        thumbnail: event.thumbnail,
        retailer_id: event.retailer_id,
        description: "e-enable intuitive applications",
        id: event.id,
        title: event.title
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
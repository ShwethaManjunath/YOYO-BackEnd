const productModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    const parser = JSON.parse(event.body)
    const productDetails = {
        avgRating: parser.avgRating,
        image: parser.image,
        points: parser.points,
        thumbnail: parser.thumbnail,
        retailer_id: parser.retailer_id,
        description: parser.description,
        id: parser.id,
        title: parser.title,
        categoryId: parser.categoryId
    }

    productModel.update(productDetails)
    .then ( product => {
        var response = {
            "statusCode": 200,
            "headers": {
                "content-type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
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
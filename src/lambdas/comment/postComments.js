const commentModel = require('../../models/commentModel');

exports.handler = (event, context, callback) => {

    var eventBody = JSON.parse(eventBody);

    const commentData = {
        commentText: eventBody.commentText,
        userId: eventBody.userId,
        productId: eventBody.productId,
        rating: eventBody.rating
    }

    commentModel.postComment(commentData)
        .then((comments) => {
            var response = {
                "statusCode": 200,
                "headers": {
                    "content-type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                },
                "body": JSON.stringify(comments),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
        .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    "content-type": "application/json",
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        })

}
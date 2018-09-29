const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});

var TABLE = "Comment";

var docClient = new AWS.DynamoDB.DocumentClient();

// fetches comments for a particular product 
exports.fetchComments = (productId, commentId) => {

    return new Promise((resolve, reject) => {

        const params = {
            TableName: TABLE,
            Key: {
                commentId
            },
            FilterExpression: "productId = :productId",
            ExpressionAttributeValues: {
                ":productId": productId
            }
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.", data.Item);
                resolve(data.Items);
            }
        });

    });
}

// post new comments
exports.postComment = (comment) => {
    return new Promise((resolve, reject) => {

        const params = {
            TableName: TABLE,
            Key: {
                commentId: comment.commentId
            },
            Item: {
                commentText: comment.commentText,
                userId: comment.userId,
                productId: comment.productId,
                rating: comment.rating,
                commentId: comment.commentId
            }
        }

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.");
                resolve(data.Item);
            }
        });

    });
}
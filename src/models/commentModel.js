const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});

var TABLE = "Comment";

var docClient = new AWS.DynamoDB.DocumentClient();

// fetches comments for a particular product 
exports.fetchComments = (productId) => {
    return new Promise((resolve, reject) => {

        const params = {
            Table: TABLE,
            Key: {
                productId
            }
        };

        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.");
                resolve(data.Items);
            }
        });

    });
}
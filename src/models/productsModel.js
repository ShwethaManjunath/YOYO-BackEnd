const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});

var TABLE = "Products";

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getProducts = (params) => {
    return new Promise((resolve, reject) => {

        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                    console.log(" -", item);
                });

                resolve(data.Items);
            }
        });

    });
}


exports.getProduct = (id) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            Key: {
                id
            }
        }

        docClient.get(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.", data.Item);

                resolve(data.Item);
            }
        });

    });
}

exports.save = (product) => {
    return new Promise((resolve, reject) => {

        var params = {
            TableName: TABLE,
            Item: {
                "id": product.id,
                "title": product.title,
                "retailer_id": product.retailer_id,
                "points": product.points,
                "description": product.description,
                "categoryId": product.categoryId,
                "avgRating": product.avgRating,
                "thumbnail": product.thumbnail,
                "image": product.image,
                "createdAt": product.createdAt,
                "updatedAt": product.updatedAt
            }
        };

        docClient.put(params, function (err, data) {
            if (err) {
                console.error("Unable to add resource", ". Error JSON:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("PutItem succeeded:", data);
                resolve(data)
            }
        });
    });
}

exports.update = (product) => {
    return new Promise((resolve, reject) => {

        const params = {
            TableName: TABLE,
            Key: {
                "id": category.id
            },
            UpdateExpression: "set title = :t",
            ExpressionAttributeValues: {
                ":t": product.title
            },
            ReturnValues: "UPDATED_NEW"
        };


        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update resource", ". Error JSON:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("PutItem succeeded:", data);
                resolve(data)
            }
        });
    });
}

exports.createTable = (params) => {

    return new Promise((resolve, reject) => {

        const dynamodb = new AWS.DynamoDB();

        var tableDefinition = {
            TableName: "Products",
            KeySchema: [
                { AttributeName: "categoryId", KeyType: "HASH" },  //Partition key
                { AttributeName: "retailer_id", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "retailer_id", AttributeType: "S" },
                { AttributeName: "categoryId", AttributeType: "S" },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };

        dynamodb.createTable(tableDefinition, function (err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
                resolve(data)
            }
        });
    });
}

exports.dropTable = (params) => {
    return new Promise((resolve, reject) => {

        const dynamodb = new AWS.DynamoDB();

        const tableDefinition = {
            TableName: "Categories"
        };

        dynamodb.deleteTable(tableDefinition, function (err, data) {
            if (err) {
                console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
                resolve(data);
            }
        });
    });
}
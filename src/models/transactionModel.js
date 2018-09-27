const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});

var TABLE = "Transactions";

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getTransactions = (params) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE
        }

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


exports.getTransaction = (id) => {
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

exports.getTransactionHistory = (id) => {
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
                console.log("Query succeeded.");
                data.Items.forEach(function (item) {
                    console.log(" -", item);
                });
                resolve(data.Items);
            }
        });

    });
}

exports.save = (transaction) => {
    console.log("post transaction");
    return new Promise((resolve, reject) => {
        var params = {
            TableName: TABLE,
            Item: {
                "id": transaction.id,
                "product_id":transaction.product_id,
                "sender_id":transaction.sender_id,
                "gift_type":transaction.gift_type,
                "points_used":transaction.requiredPoints,
                "receiver_name":transaction.receiver_name,
                "receiver_address":transaction.receiver_address,
                "receiver_email":transaction.receiver_email,
                "receiver_contact":transaction.receiver_contact,
                "createdAt": transaction.createdAt,
                "updatedAt": transaction.updatedAt
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


exports.createTable = (params) => {

    return new Promise((resolve, reject) => {

        const dynamodb = new AWS.DynamoDB();

        var tableDefinition = {
            TableName: "Transactions",
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" },
            ],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "S" },
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
            TableName: "Transactions"
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
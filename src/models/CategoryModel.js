const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
 
});

var TABLE = "Categories";

var docClient = new AWS.DynamoDB.DocumentClient();

exports.getCategories = (params) => {
    return new Promise((resolve, reject) => {

            docClient.scan(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err)
                } else {
                    console.log("Query succeeded.");
                    data.Items.forEach(function(item) {
                        console.log(" -", item.year + ": " + item.title);
                    });
 
                    resolve(data.Items); 
                }
            });

    });
}


exports.getCategory = (id) => {
    return new Promise((resolve, reject) => {
            const params = {
                TableName: TABLE,
                Key: {
                    id
                }
            }
 
            docClient.get(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err)
                } else {
                    console.log("Query succeeded.", data.Item);
                    // data.Items.forEach(function(item) {
                    //     console.log(" -", item.year + ": " + item.title);
                    // });
 
                    resolve(data.Item); 
                }
            });

    });
}

exports.save = (category) => {
    return new Promise( (resolve, reject) => {
       
        var params = {
            TableName: TABLE,
            Item: {
                "id":  category.id,
                "title": category.title
            }
        };

        docClient.put(params, function(err, data) {
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

exports.update = (category) => {
    return new Promise( (resolve, reject) => {
 
        const params = {
            TableName:TABLE,
            Key:{
                "id": category.id
            },
            UpdateExpression: "set title = :t",
            ExpressionAttributeValues:{
                ":t": category.title
            },
            ReturnValues:"UPDATED_NEW"
        };


        docClient.update(params, function(err, data) {
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


// BEWARE. Not to be used with handlers
// Build Scripts path

exports.createTable = (params) => {

    return new Promise ( (resolve, reject) => {

            const dynamodb = new AWS.DynamoDB();
            
            var tableDefinition = {
                TableName : "Categories",
                KeySchema: [       
                    { AttributeName: "id", KeyType: "HASH"},  //Partition key
                    //{ AttributeName: "name", KeyType: "RANGE" }  //Sort key
                ],
                AttributeDefinitions: [       
                    { AttributeName: "id", AttributeType: "N" },
                    //{ AttributeName: "name", AttributeType: "S" }
                ],
                ProvisionedThroughput: {       
                    ReadCapacityUnits: 10, 
                    WriteCapacityUnits: 10
                }
            };
            
            dynamodb.createTable(tableDefinition, function(err, data) {
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
    return new Promise( (resolve, reject) => {

            const dynamodb = new AWS.DynamoDB();

            const tableDefinition = {
                TableName : "Categories"
            };

            dynamodb.deleteTable(tableDefinition, function(err, data) {
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
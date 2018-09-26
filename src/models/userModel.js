const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

var TABLE = "Users";

var docClient = new AWS.DynamoDB.DocumentClient();

// Done
exports.getUsers = (params) => {
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

// Done
exports.getUser = (id) => {
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
                    resolve(data.Item); 
                }
            });

    });
}

// Left change to upsert
// exports.save = (category) => {
//     return new Promise( (resolve, reject) => {
       
//         var params = {
//             TableName: TABLE,
//             Item: {
//                 "id":  category.id,
//                 "title": category.title
//             }
//         };

//         docClient.put(params, function(err, data) {
//             if (err) {
//                 console.error("Unable to add resource", ". Error JSON:", JSON.stringify(err, null, 2));
//                 reject(err)
//             } else {
//                 console.log("PutItem succeeded:", data);
//                 resolve(data)
//             }
//         });
//     });
// }


// Left

// exports.update = (category) => {
//     return new Promise( (resolve, reject) => {
 
//         const params = {
//             TableName:TABLE,
//             Key:{
//                 "id": category.id
//             },
//             UpdateExpression: "set title = :t",
//             ExpressionAttributeValues:{
//                 ":t": category.title
//             },
//             ReturnValues:"UPDATED_NEW"
//         };


//         docClient.update(params, function(err, data) {
//             if (err) {
//                 console.error("Unable to update resource", ". Error JSON:", JSON.stringify(err, null, 2));
//                 reject(err)
//             } else {
//                 console.log("PutItem succeeded:", data);
//                 resolve(data)
//             }
//         });
//     });
// }


// BEWARE. Not to be used with handlers
// Build Scripts path



// Done
exports.createTable = (params) => {

    return new Promise ( (resolve, reject) => {

            const dynamodb = new AWS.DynamoDB();
            
            var tableDefinition = {
                TableName : "Users",
                KeySchema: [       
                    { AttributeName: "id", KeyType: "HASH"},  //Partition key
                    //{ AttributeName: "name", KeyType: "RANGE" }  //Sort key
                ],
                AttributeDefinitions: [       
                    { AttributeName: "id", AttributeType: "S" },
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

////// Done

exports.dropTable = (params) => {
    return new Promise( (resolve, reject) => {

            const dynamodb = new AWS.DynamoDB();

            const tableDefinition = {
                TableName : "Users"
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




// LoginUser
// Done
exports.loginUser = (params) => {

    return new Promise ( (resolve, reject) => {

            const dynamodb = new AWS.DynamoDB();
            
            var userData = {
                TableName : "Users",
                Item: {
                    id : new Date().getTime() + '',
                    ...params
                },
                ExpressionAttributeNames : {
                    '#id' : 'id',
                    '#email' : 'email',
                },
                ConditionExpression : 'attribute_not_exists(#id) OR attribute_not_exists(#email)',
            };
            
            console.log('Pram->Item: ',userData.Item);

            dynamodb.putItem(userData, function(err, data) {
                if (err) {
                    console.error("Unable to Login:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log("Loggedin successfully:", JSON.stringify(data, null, 2));
                    resolve(true)
                }
            });
    });
}

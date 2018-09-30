const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
});

var TABLE = "Products";

var docClient = new AWS.DynamoDB.DocumentClient();

exports.createTable = (params) => {

    return new Promise((resolve, reject) => {

        const dynamodb = new AWS.DynamoDB();

        var tableDefinition = {
            TableName: "Products",
            KeySchema: [
                { AttributeName: "categoryId", KeyType: "HASH" },  //Partition key
                { AttributeName: "id", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "categoryId", AttributeType: "S" },
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

exports.getProducts = () => {
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


exports.getProduct = (id, categoryId) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            Key: {
                categoryId,
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

exports.getProductByCategory = (categoryId) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            KeyConditionExpression: "categoryId = :cId",
            ExpressionAttributeValues: {
                ":cId": categoryId
            }

        }

        docClient.query(params, function (err, data) {
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

exports.getProductsByPriceCategory = (categoryId, lowerPrice, upperPrice) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            FilterExpression: "categoryId = :cId AND #p BETWEEN :t1 AND :t2",
            ExpressionAttributeNames: {
                "#p": "points"
            },
            ExpressionAttributeValues: {
                ":cId": categoryId,
                ":t1": +lowerPrice,
                ":t2": +upperPrice
            }

        }

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
exports.filterByPrice = (lowerLimit, upperLimit) => {
    return new Promise((resolve, reject) => {
        var params = {
          TableName: TABLE,
         // KeyConditionExpression: "categoryId= :categoryId AND id> :id" ,
          FilterExpression: "#p BETWEEN :t1 AND :t2",
          ExpressionAttributeNames: {
              "#p": "points"
          },
          ExpressionAttributeValues: {
            ":t1": +lowerLimit,
            ":t2": +upperLimit
          }
        };
        docClient.scan(params, function (err, data) {
          if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            reject(err)
          } else {
            console.log("Query succeeded.", data);
            resolve(data.Items);
          }
        });
    })
}

exports.update = (product) => {
    console.log('product', product);
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            Key: {
                "categoryId": product.categoryId,
                "id": product.id
            },
            UpdateExpression: "set  title = :title , retailer_id = :retailer_id, points= :points , description = :description , avgRating= :avgRating , thumbnail= :thumbnail , image = :image ",
            ConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": product.id,
                ":title": product.title,
                ":retailer_id": product.retailer_id,
                ":points": product.points,
                ":description": product.description,
                ":avgRating": product.avgRating,
                ":thumbnail": product.thumbnail,
                ":image": product.image,
            },
            ReturnValues: "UPDATED_NEW"
        };


        docClient.update(params, function (err, data) {
            if (err) {
                console.error("Unable to update resource", ". Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("PutItem succeeded:", data);
                resolve(data);
            }
        });
    });
}

exports.deleteItem = (id, categoryId) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            Key: {
                "categoryId": categoryId,
                "id": id
            }
        };
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
                resolve();
            }
        });
    });
}


exports.dropTable = (params) => {
    return new Promise((resolve, reject) => {

        const dynamodb = new AWS.DynamoDB();

        const tableDefinition = {
            TableName: "Products"
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

exports.getSortedProducts = (details) => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: TABLE,
            KeyConditionExpression: "categoryId = :a",
            ExpressionAttributeValues: {
                ":a": details.categoryId
            }
        };
        docClient.get(params, function (err, data) {
            if (err) {
                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                reject(err)
            } else {
                console.log("Query succeeded.", data.Item);

                resolve(data.Item);
            }
        });
    })
}

exports.getRecommendedProducts = (productData) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: TABLE,
            filterExpression: "avgRating >= :num",
            ExpressionAttributeValues: {
                ":num": 4,
            },
            Limit: 4
        }

        docClient.scan(params, function (err, data) {
            if (err) {
                console.log('Recommended products data not coming');
                reject(err);
            }
            else {
                console.log("Getting recommended products", data);
                resolve(data);


            }
        });
    });
}

exports.filterProducts = (categories, minPrce, maxPrice) => {
    return new Promise((resolve, reject) => {
        const categpryQuery = categories.map(c => {
            return '#cId= :c' + c
        }).join(' OR ')
        console.log(categpryQuery);

        const finalQuery = categpryQuery.length ?
            '(' + categpryQuery + ')' + ' AND ' + '#p BETWEEN :t1 AND :t2'
            :
            '#p BETWEEN :t1 AND :t2';

        const exAtValuesCategories = {};
        categories.forEach(c => {
            exAtValuesCategories[':c' + c] = c
        })

        console.log(exAtValuesCategories);

        const exAtNamesCategories = {}
        if (Object.values(exAtValuesCategories).length) {
            exAtNamesCategories['#cId'] = 'categoryId'
        }

        console.log(exAtNamesCategories);


        const params = {
            TableName: TABLE,
            FilterExpression: finalQuery,
            ExpressionAttributeNames: {
                ...exAtNamesCategories,
                "#p": "points"
            },
            ExpressionAttributeValues: {
                ...exAtValuesCategories,
                ":t1": +minPrce,
                ":t2": +maxPrice
            }
        }


        docClient.scan(params, function (err, data) {
            if (err) {
                console.error("Error occured:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                console.log("Scanned Data:", JSON.stringify(data, null, 2));
                resolve(data.Items);
            }
        });
    });
}

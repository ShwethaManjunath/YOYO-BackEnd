const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
 
});

var TABLE = "carouselImage";



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
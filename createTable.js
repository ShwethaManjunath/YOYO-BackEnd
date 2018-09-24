const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
})

exports.handler = (event, context, callback) => {            
    var tableDefinition = {
        TableName : "TestTable",
        KeySchema: [       
            { AttributeName: "id", KeyType: "HASH"},
        ],
        AttributeDefinitions: [       
            { AttributeName: "id", AttributeType: "N" },
            { AttributeName: "description", AttributeType: "S" }
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };
    
    docClient.createTable(tableDefinition, function(err, data) {
        if (err) {
            console.log('inside err handler');
            callback(err, null)
        } else {
            console.log('Table created');
            callback(null, data);
        }
    });
}
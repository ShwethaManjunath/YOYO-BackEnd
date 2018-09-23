const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
})

exports.handler = (event, context, callback) => {
    const param = {
        Item: {
            id: new Date().getTime(),
            description: 'Data created: ' + new Date().toString()
        },

        TableName: 'TestDB'
    }

    docClient.put(param, (err, data) => {
        if(err) {
            callback(err, null);
        } else {
            callback(null, data)
        }
    })
}
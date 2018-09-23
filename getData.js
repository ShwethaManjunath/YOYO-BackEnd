const AWS = require('aws-sdk')

const docClient = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
})

exports.handler = (event, context, callback) => {
    const param = {
        TableName: 'TestDB',
        Limit: 100
    }

    docClient.scan(param, (err, data) => {
        if(err) {
            callback(err, null);
        } else {
            callback(null, data)
        }
    })
}
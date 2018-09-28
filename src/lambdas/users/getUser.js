const userModel = require('../../models/userModel');

exports.handler = (event, context, callback) => {
    var params = {
        TableName : "Users",
    };

    if (event.queryStringParameters) {
        const email = event.queryStringParameters.email;

        userModel.getUser(email)
            .then(user => {
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    "body": JSON.stringify(user),
                    "isBase64Encoded": false
                };
                callback(null, response);
            })
            .catch(err => {
                var response = {
                    "statusCode": 500,
                    "headers": {
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    "body": JSON.stringify(err),
                    "isBase64Encoded": false
                };
                callback(null, response);
            })
    }
    else {
        userModel.getUsers(params)
            .then(user => {
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    "body": JSON.stringify(user),
                    "isBase64Encoded": false
                };
                callback(null, response);
            })
            .catch(err => {
                var response = {
                    "statusCode": 500,
                    "headers": {
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    "body": JSON.stringify(err),
                    "isBase64Encoded": false
                };
                callback(null, response);
            })
    }
};


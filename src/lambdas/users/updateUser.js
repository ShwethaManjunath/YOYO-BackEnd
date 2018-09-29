const userModel = require('../../models/userModel');

exports.handler = (event, context, callback) => {
    
    const eventBody = JSON.parse(event.body);

    const userData = {
        email: eventBody.email,
        userName: eventBody.userName,
        photo: eventBody.photo,
        points: eventBody.points
    }

    userModel.updateUser(userData)
        .then((user) => {
            if (user) {
                var response = {
                    "statusCode": 200,
                    "headers": {
                        "content-type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Credentials': true,
                    },
                    "body": JSON.stringify({
                        "message": 'Successfully Updated.'
                    }),
                    "isBase64Encoded": false
                };
                callback(null, response);
            } else {
                throw new Error('User already exists');
            }
        })
        .catch(err => {
            var response = {
                "statusCode": 200,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify({
                    "error": err,
                    "message": "User already exists"
                }),
                "isBase64Encoded": false
            };
            callback(response, null);
        });

};
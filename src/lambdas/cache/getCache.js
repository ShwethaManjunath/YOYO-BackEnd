var redis = require('redis');

var client = redis.createClient(6379, 'g3.nodesense.ai');

exports.handler = (event, context, callback) => {
    console.log('getCache handler called')
     
    client.set('my test key', 'my test value', redis.print);
        client.get('my test key', function (error, result) {
            if (error) {
                var response = {
                    "statusCode": 200,
                    "headers": {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    "body": JSON.stringify(result),
                    "isBase64Encoded": false
                };
                callback(null, response);
            } else {
                var response = {
                    "statusCode": 500,
                    "headers": {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    "body": JSON.stringify(error),
                    "isBase64Encoded": false
                };
                callback(null, response);
            }
             
        });

            
         
};
const productsModel = require('../../models/productsModel');

exports.handler = (event, context, callback) => {
    var prods = [];
 
    const ids = Object.values(event.queryStringParameters);
    
    if(ids.length > 1){
        let c = 0;
        new Promise((resolve, reject) => {
            for(let i=0;i<ids.length;i++){
                console.log("check", ids[i]);
                productsModel.getCategoryProductByPrice(ids[i])
                .then(products => {
                    console.log(products);
                    prods.push(...products); 
                    c++;
                    if(c === ids.length)
                        resolve();
                })
                .catch(err=>{
                    console.log(err);
                })
            }
        })
        .then(result => {
            console.log("prod",prods);
            var response = {
                "statusCode": 200,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(prods),
                "isBase64Encoded": false
            };
            callback(null, response);    
        })
        
    }else{
        productsModel.getCategoryProductByPrice(ids[0])
        .then(products => {
            var response = {
                "statusCode": 200,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(products),
                "isBase64Encoded": false
            };
            callback(null, response);
        })
        .catch(err => {
            var response = {
                "statusCode": 500,
                "headers": {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                "body": JSON.stringify(err),
                "isBase64Encoded": false
            };
            callback(null, response);
        });
    }
        
    }

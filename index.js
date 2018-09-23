exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: 'The time: current time: ' + new Date().toString(),
    });
};

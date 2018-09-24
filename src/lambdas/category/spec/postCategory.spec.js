const postCategory = require('../postCategory');

describe("postCategory test suites", () => {
    it("postCategory", (done) => {
        const event = {
            body: JSON.stringify({
                 title: "Test"
            })
        }
        postCategory.handler(event, {}, function(err, result) {
            console.log('Error ', err);
            console.log('Result ', result);
            done()
        })
    })
})
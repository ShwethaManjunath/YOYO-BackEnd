const putCategory = require('../src/category/putCategory');
 
describe("putCategory test suites", () => {
    it("putCategory", (done) => {
        const event = {
            body: JSON.stringify({
                 id: 54603772,
                 title: "Test 23456"
            })
        }
        putCategory.handler(event, {}, function(err, result) {
            console.log('Error ', err);
            console.log('Result ', result);
            done()
        })
    })
})
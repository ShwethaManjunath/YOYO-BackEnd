const getProducts = require('../src/lambdas/products/getProducts');

describe("Get all products test suites", () => {
    it("Products", (done) => {
        getProducts.handler({},{}, function(err, result) {
           console.log('Error ', err);
           console.log('Result ', result);
           done()
       })
   })
})
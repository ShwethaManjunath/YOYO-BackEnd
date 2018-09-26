const fs = require('fs');
const ProductModel = require('../../src/models/productsModel');

console.log("Seeding into DynamoDB. Please wait.");

function seedCategories(fileName) {
    return new Promise((resolve, reject) => {
        var allProducts = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        allProducts.forEach(function (product) {
            var products = {
                "id": product.id,
                "title": product.title,
                "retailer_id": product.retailer_id,
                "points": product.points,
                "description": product.description,
                "categoryId": product.categoryId,
                "avgRating": product.avgRating,
                "thumbnail": product.thumbnail,
                "image": product.image,
                "createdAt": product.createdAt,
                "updatedAt": product.updatedAt
            };

            ProductModel.save(products, function (err, data) {
                if (err) {
                    console.error("Unable to add  product", ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("PutItem succeeded:", data);
                }
            });
        });
        resolve(true);
    })
}


Promise.all([
    seedCategories('assets/mock-data/productsData.json')
])
    .then(results => {
        console.log("Setup done");
    })
    .catch(err => {
        console.log("Error", err);
    })

const fs = require('fs');
const CategoryModel = require('../../src/models/CategoryModel');

console.log("Seeding into DynamoDB. Please wait.");

function seedCategories(fileName) {
    return new Promise((resolve, reject) => {
        var allCategories = JSON.parse(fs.readFileSync(fileName, 'utf8'));
        allCategories.forEach(function (category) {
            var category = {
                "id": category.id,
                "title": category.title
            };

            CategoryModel.save(category, function (err, data) {
                if (err) {
                    console.error("Unable to add category", ". Error JSON:", JSON.stringify(err, null, 2));
                } else {
                    console.log("PutItem succeeded:", data);
                }
            });
        });
        resolve(true);
    })
}


Promise.all([
    seedCategories('assets/mock-data/categorydata.json')
])
    .then(results => {
        console.log("Setup done");
    })
    .catch(err => {
        console.log("Error", err);
    })

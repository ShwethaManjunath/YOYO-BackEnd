
const CategoryModel = require('../src/models/CategoryModel');
Promise.all([
            CategoryModel.dropTable()
        ])
        .then ( results => {
            console.log('drop Tables done', results)
        })
        .catch(error => {
            console.log('drop Tables failed ', error)
        })
const categoryModel = require('../models/productsModel');

    Promise.all([
        categoryModel.dropTable()
    ])
    .then ( results => {
        console.log('drop Tables done', results)
    })
    .catch(error => {
        console.log('drop Tables failed', error)
    })


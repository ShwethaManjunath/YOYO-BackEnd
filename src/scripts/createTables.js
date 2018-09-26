
const productModel = require('../models/CategoryModel');

    Promise.all([
        // Movie.createTable({})
        productModel.createTable()
        ])
        .then ( results => {
            console.log('Create Tables done', results)
        })
        .catch(error => {
            console.log('Create Tables failed ', error)
        });
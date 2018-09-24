
const categoryModel = require('../models/CategoryModel');

    Promise.all([
        // Movie.createTable({})
        categoryModel.createTable()
        ])
        .then ( results => {
            console.log('Create Tables done', results)
        })
        .catch(error => {
            console.log('Create Tables failed ', error)
        });
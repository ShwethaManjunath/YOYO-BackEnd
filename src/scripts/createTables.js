
const model = require('../models/productsModel');

    Promise.all([
        // Movie.createTable({})
        model.createTable()
        ])
        .then ( results => {
            console.log('Create Tables done', results)
        })
        .catch(error => {
            console.log('Create Tables failed ', error)
        });
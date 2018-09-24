// const Movie = require('../src/movies/movie');
const CategoryModel = require('../src/models/CategoryModel');

Promise.all([
        // Movie.createTable({})
        CategoryModel.createTable()
        ])
        .then ( results => {
            console.log('Create Tables done', results)
        })
        .catch(error => {
            console.log('Create Tables failed ', error)
        })
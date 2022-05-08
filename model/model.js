
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
    },
    released: {
        type: Date
    },
    genre: {
        type: String,
    },
    director: {
        type: String,
    },
    userId: {
        type: Number,
    }
})

const movie = mongoose.model('movie', schema);

module.exports = {movie};
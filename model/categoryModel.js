const Mongoose = require('mongoose');

const categorySchema = new Mongoose.Schema({
    name: {
        type: String
    }
});

module.exports = Mongoose.model('categories', categorySchema);
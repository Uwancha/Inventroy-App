const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, maxLength: 200},
})

// Define a virtual property for the URL
CategorySchema.virtual('url').get(function () {
    return `/category/${this._id}`;
})

module.exports = mongoose.model("Category", CategorySchema);
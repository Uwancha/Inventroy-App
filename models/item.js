const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true, maxLength: 100},
    price: {type: Number, required: true},
    category : {type: Schema.Types.ObjectId, ref: "Category", required: true}
})

// Define a virtual property for the URL
ItemSchema.virtual('url').get(function () {
    return `/items/${this._id}`;
})

module.exports = mongoose.model("Item", ItemSchema);
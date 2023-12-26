const mongoose = require('mongoose');

const Schema = mongoose.Schema

const AdminSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required:true},
    admin: Boolean
})

module.exports = mongoose.model('Admin', AdminSchema)
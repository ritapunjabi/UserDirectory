const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    address: String,
    contact: String,
    email: String
});

module.exports = mongoose.model('user', userSchema, 'users');
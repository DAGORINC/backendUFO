const mongoose = require('mongoose');
const Schema = mongoose.Schema
const validator = require("email-validator");

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email jest wymagany'],
        lowercase: true,
        trim: true,
        unique: [true, 'Użytkownik o podanym emailu już istnieje'],
        validate: [validator.validate, 'Email nieprawidłowy'],
        jsonWebToken: String,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Hasło powinno posiadać minimum 6 znaków']
    }
});

const User = mongoose.model('User', UserSchema)

module.exports = User;
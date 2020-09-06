var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randToken = require('rand-token');
const jwtsecret = "projclearsecret";



var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false,
        default: true
    },
    isBanned: {
        type: Boolean,
        required: false,
        default: false
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    verifyToken: {
        type: String,
        default: function () {
            return randToken.generate(64);
        }
    },
    loginToken: {
        type: String, ref: 'loginToken',
        required: false
    },
    token: {
        type: Schema.Types.ObjectId, ref: 'Token',
        required: false
    },
    type: {
        type: String,
        required: true,
        unique: false
    },
});

UserSchema.methods.comparePassword = function (password) {
    const userPassword = this.password;

    return new Promise((pass, fail) => {
        bcrypt.compare(password, userPassword, (error, same) => {
            if (error) {
                return fail(error);
            }
            pass(same);
        })
    });
};

UserSchema.methods.generateToken = function () {
    const loginToken = jwt.sign({ _id: this._id }, jwtsecret, {
        expiresIn: '2h'
    });
    return loginToken;
};

UserSchema.methods.checkVerify = function () {
    return this.isVerified;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

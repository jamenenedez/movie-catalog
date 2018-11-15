var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;
const { Schema } = mongoose;

var userSchema = new Schema({
    /**
     * User Login, used as id to connect between all our platforms.
     */
    login: {
        type: String,
        trim: true,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 4,
            maxLength: 16
        }
    },

    /**
     * User email.
     */
    email: {
        type: String,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 6,
            maxLength: 30
        }
    },

    /**
     * User private password, the one hashed in SHA512 and stored on the database.
     */
    password: {
        type: String,
        required: true,
        check: {
            length: 128
        }
    },

    /**
     * User right
     */
    right: {
        guest: {
            type: Boolean,
            default: false,
            required: true
        },
        moderator: {
            type: Boolean,
            default: false,
            required: true
        }
    },

    /**
     * movie qualifications
     */
    /* scores: [{ type: Schema.Types.ObjectId, ref: 'Ranking' }], */
    scores: [{ movie: { type: Schema.Types.ObjectId, ref: 'Movie' }, score: { type: Number } }]
}, { timestamps: true });

/* userSchema.plugin(uniqueValidator, { message: 'is already taken.' });
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
} */


/*userSchema.methods.generateJWT = function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
}; */

/* userSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    };
}; */
module.exports = mongoose.model('User', userSchema);
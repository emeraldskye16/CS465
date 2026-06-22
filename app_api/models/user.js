const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Schema defines what a User document looks like in MongoDB.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // MongoDB enforces unique email
    },
    name: {
        type: String,
        required: true,
    },
    hash: String,     // Hashed password
    salt: String      // Salt used to hash password
});

// Hash the password using PBKDF2
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        'sha512'
    ).toString('hex');
};

// Validate password by hashing and comparing
userSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(
        password,
        this.salt,
        1000,
        64,
        'sha512'
    ).toString('hex');
    return this.hash === hash;
};

// Create a signed JWT token for authentication
userSchema.methods.generateJWT = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.JWT_SECRET,  // Must be set in .env
        { expiresIn: '1h' }      // Token expires in 1 hour
    );
};

// Export the model correctly (MUST be singular "User")
module.exports = mongoose.model('User', userSchema);

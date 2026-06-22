const passport = require('passport');
const User = require('../models/user');

// Register a new user
const register = async (req, res) => {

    // All fields required (this is why your screenshot showed the error)
    if (!req.body.email || !req.body.name || !req.body.password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    // Create a new user document
    const user = new User({
        name: req.body.name,
        email: req.body.email
    });

    // Hash and store password
    user.setPassword(req.body.password);

    try {
        await user.save();  // Save to MongoDB

        // Generate JWT token for the new user
        const token = user.generateJWT();

        // Return token (this is the page 195 result)
        return res.status(200).json({ token });

    } catch (err) {
        return res.status(400).json(err);
    }
};

// Login using Passport LocalStrategy
const login = async (req, res) => {

    // Require email + password only (name is NOT used for login)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    // Authenticate using Passport
    passport.authenticate('local', (err, user, info) => {

        if (err) {
            // Server or DB error
            return res.status(404).json(err);
        }

        if (!user) {
            // Wrong email or password
            return res.status(401).json(info);
        }

        // SUCCESS → return JWT token
        const token = user.generateJWT();
        return res.status(200).json({ token });

    })(req, res);
};

module.exports = {
    register,
    login
};

// mv_registerController.js

// Assuming you have a User model imported
const mv_User = require('../models/mv_user');
const mv_Vendor = require('../models/mv_vendor');

// Display login form
exports.showLoginForm = (req, res) => {
    res.render('mv_login', { title: 'Login' });
};

// Process login form
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await mv_User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).send('Invalid username or password');
        }

        // Set session variable to indicate user is logged in
        req.session.loggedIn = true;
        req.session.user = user;
        req.session.userRole = user.role;
		req.session.userId = user._id;

        // Check if user is a vendor
        if (user.role === 'vendor') {
            const vendor = await mv_Vendor.findOne({ user_id: user._id });
            if (vendor) {
                req.session.vendorId = vendor._id;
            }
        }

        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error logging in');
    }
};

// Logout user
exports.logoutUser = (req, res) => {
    // Destroy session
    req.session.destroy();
    res.redirect('/');
};
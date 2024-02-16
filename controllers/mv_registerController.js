// mv_registerController.js

const mv_User = require('../models/mv_user');
const mv_Vendor = require('../models/mv_vendor');

// Display registration form
exports.showRegistrationForm = (req, res) => {
  res.render('mv_register', { title: 'Register', roles: ['buyer', 'vendor', 'admin'], loggedIn: req.session.loggedIn });
  //	res.render('mv_landing', { title: 'Multivendor Landing Page' });
};

// Register user
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Create user
    const user = new mv_User({ username, password, role });
    await user.save();

    // If role is vendor, create vendor entry
    if (role === 'vendor') {
      const vendor = new mv_Vendor({ user_id: user._id, shop_name: 'My Shop' });
      await vendor.save();
    }

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
};
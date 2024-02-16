

const mv_User = require('../models/mv_user');

exports.dashboard = (req, res) => {
    // Assuming you have a model named 'User' for storing user information
    mv_User.find({}, (err, users) => {
        if (err) {
            console.error('Error fetching users:', err);
            res.status(500).send('Error fetching users');
        } else {
            // Render dashboard view with list of users
            res.render('mv_dashboard', { title: 'Dashboard', users: users });
        }
    });
}

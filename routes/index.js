var express = require('express');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/
/*	guns
router.get('/', function(req, res) {
  //  res.redirect('/catalog');
  //  res.send('Shopping Ma Niggaz')
  res.redirect('/shop');
});
*/

const indexController = require('../controllers/mv_indexController');
const registerController = require('../controllers/mv_registerController');
const authController = require('../controllers/mv_authController');
const newProductController = require('../controllers/mv_newProductController');
const editProductController = require('../controllers/mv_editProductController');
const cartController = require('../controllers/mv_cartController');
const billingController = require('../controllers/mv_billingController');
const dashController = require('../controllers/mv_dashController');

// Define a middleware to check if user is logged in
router.use(function(req, res, next) {
  // Assuming you have a session variable for tracking login status
  res.locals.loggedIn = req.session.loggedIn || false;
  res.locals.userRole = req.session.userRole || false;
  next();
});

// ensureLoggedIn middleware
const ensureLoggedIn = (req, res, next) => {
  // Check if the user is authenticated
  if (req.session.loggedIn) {
      // User is authenticated, allow the request to proceed
      next();
  } else {
      // User is not authenticated, redirect to the login page
      res.redirect('/login');
  }
};

// ensureVendorRole middleware
const ensureVendorRole = (req, res, next) => {
  // Check if the user has the role of a vendor
  if (req.session.userRole === 'vendor') {
      // User has the vendor role, allow the request to proceed
      next();
  } else {
      // User does not have the vendor role, redirect to homepage and show an alert message
      res.redirect('/');
      // You can also customize the message or use a client-side alert in your views
  }
};

// ensureRole middleware
const ensureRole = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles
    if (roles.includes(req.session.userRole)) {
      // User has the required role, allow the request to proceed
      next();
    } else {
      // User does not have the required role, redirect to homepage and show an alert message
      res.redirect('/');
      // You can also customize the message or use a client-side alert in your views
    }
  };
};

// Middleware to check if user is admin
//  zbytocne
const ensureAdmin = (req, res, next) => {
  // Check if user is logged in and has admin role
  if (req.session.loggedIn && req.session.userRole === 'admin') {
      // User is admin, allow the request to proceed
      next();
  } else {
      // User is not admin, redirect to homepage or show an error
      res.redirect('/');
  }
};



//	registration redirection
/*
router.get('/register', function(req, res) {
  
  res.redirect('/mv_register');
});

*/
router.get('/register', registerController.showRegistrationForm);

router.post('/register', registerController.registerUser);

// Login route
router.get('/login', authController.showLoginForm);
router.post('/login', authController.loginUser);

// Logout route
router.get('/logout', authController.logoutUser);

router.get('/new-product', ensureLoggedIn, ensureVendorRole, newProductController.showNewProductForm);
router.post('/new-product', ensureLoggedIn, ensureVendorRole, newProductController.createNewProduct);

// Route to display edit form
router.get('/edit-product/:productId', ensureLoggedIn, ensureRole(['vendor', 'admin']), editProductController.showEditForm);

// Route to handle edit form submission
router.post('/edit-product/:productId', ensureLoggedIn, ensureRole(['vendor', 'admin']), editProductController.editProduct);

// Route to handle delete request
router.post('/delete-product/:productId', ensureLoggedIn, ensureRole(['vendor', 'admin']), editProductController.deleteProduct);

// Add to cart route
router.post('/add-to-cart/:productId', cartController.addToCart); 

// Show cart route
router.get('/show-cart/', cartController.showCart); 
//  router.get('/show-cart/:cartId', cartController.showCart); 


// Remove a unit from the cart
router.post('/remove-unit/:productId', cartController.removeUnit);

// Add a unit to the cart
router.post('/add-unit/:productId', cartController.addUnit);

// Route for the purchase page
router.get('/purchase', ensureLoggedIn, billingController.showBillingPage);
router.post('/purchase', ensureLoggedIn, billingController.confirmPurchase);

// Route for confirming purchase
router.post('/confirm-purchase', ensureLoggedIn, billingController.confirmPurchase);

router.get('/thank-you', function(req, res) {
  res.render('index', { title: 'Thank You' });
});

// Route for confirming purchase
router.get('/dashboard', ensureAdmin, dashController.dashboard);


// Landing page route
router.get('/', indexController.landingPage);


module.exports = router;

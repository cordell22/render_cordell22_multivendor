const express = require('express')
//	const mongoose = require('mongoose')
const multer = require('multer'); // Import multer
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
//	const articleRouter = require('./routes/articles')
//	const Article = require('./models/article')
const methodOverride = require('method-override')
const app = express()

app.use(bodyParser.json()); // Parse JSON requests

//	TODO: setup environment
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

//	added code
//	testing routes and models
//	var indexRouter = require('./routes/index');
//	var cartRouter = require('./routes/cart');
//	const Cartarray = require('./models/cartarray');

//	models required

const Size = require('./models/size')
//	const Cart = require('./models/cart')		already imported!!!
//	const Custommers = require('./models/customers')
//	const Guns = require('./models/guns')
const Gunscategories = require('./models/gunscategories')
//	const Ordercontents = require('./models/ordercontents')
//	const Orders = require('./models/orders')
//	const Rifles = require('./models/rifles')
const Riflecategories = require('./models/riflescategories')
const Sales = require('./models/sales')
const Transactions = require('./models/transactions')
const Wishlist = require('./models/wishlist')



//	mongoose.connect('mongodb://localhost/blog'/* , { useNewUrlParser: true, useUnifiedTopology: true } */)

const  mongoose = require('mongoose');
//	this is node_eshop_arms db
const  mongoDB = 'mongodb+srv://cordelfenevall:dopici123@cluster0.dznhd8i.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
//	app.use('/articles', articleRouter)
app.use(methodOverride('_method'))



// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pics'); // Specify the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Use unique filenames
  },
});
// Create the multer instance
const upload = multer({ storage: storage });

// Serve static files from the "pics" directory
app.use('/pics', express.static(path.join(__dirname, 'pics')));


//	this shit worx
/*
app.use('/', (req, res) => {
	res.render('cart/index.ejs')
})
*/


// Landing Page
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Product Categories
const browseRouter = require('./routes/browse');
app.use('/browse', browseRouter);

// Cart
const cartRouter = require('./routes/cart');
app.use('/cart', cartRouter);



// Admin
const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

// shop
const shopRouter = require('./routes/shop');
app.use('/shop', shopRouter);

// checkout
const checkoutRouter = require('./routes/checkout');
app.use('/checkout', checkoutRouter);



/*		funguje, ale premiestnit
app.get('/', async (req, res) => {
	console.log(Cartarray)
	res.render('cart/index', { cart: Cartarray })
})

// Use the upload middleware for specific routes
app.post('/cart/guncategory/create', upload.single('image'), (req, res) => {
	// Handle the uploaded file in this route
	// Access the uploaded file details using req.file
	
	const category = req.body.category;
	const description = req.body.description;
	const image = req.file.filename;
	
  
	const gunscategory = new Gunscategories({
		category,
		description,
		image,
	  });

	gunscategory.save((err) => {
	if (err) {
		console.log(err);
		res.render('cart/guncategory_create', { title: 'Create Gun Category', error: 'Error creating gun category' });
	} else {
		res.redirect('/cart/gunscategories');
	}
	  });
  });
*/
// ... Rest of your routes and app.listen ...


//	lets redirect to through routes to cart.js!!!
//	naco?
//	app.use('/', indexRouter);
//	str8 to cart!!!
//	app.use('/', cartRouter);



//	app.listen(5000)
module.exports = app;






// Import the multer middleware
const multer = require('multer');
const upload = multer(); // Create an instance of multer


const Gunscategories = require('../models/gunscategories');
//  const upload = require('../server'); // Import the upload middleware

// Display list of all Gunscategories.
exports.gunscategories_list = function (req, res, next) {
  Gunscategories.find()
    .exec((err, list_gunscategories) => {
      if (err) { return next(err); }
      res.render('cart/gunscategories_list', { title: 'Gun Categories List', gunscategories_list: list_gunscategories });
    });
};

// Display detail page for a specific Gunscategories.
exports.gunscategories_detail = function (req, res, next) {
  const id = req.params.id;
  Gunscategories.findById(id)
    .exec((err, gunscategory) => {
      if (err) { return next(err); }
      if (!gunscategory) { // No results.
        const err = new Error('Gun category not found');
        err.status = 404;
        return next(err);
      }
      res.render('cart/guncategory_detail', { title: 'Gun Category Detail', gunscategory });
    });
};

// Display Gunscategories create form on GET.
exports.gunscategories_create_get = function (req, res, next) {
  res.render('cart/guncategory_create', { title: 'Create Gun Category', error: null });
};

// Handle Gunscategories create on POST.
exports.gunscategories_create_post = /*upload.single('image'),  */function (req, res, next) {
  const category = req.body.category;
  const description = req.body.description;
  const image = req.file.filename; // Get the uploaded file's filename


  const gunscategory = new Gunscategories({
    category,
    description,
    image,
  });



  gunscategory.save((err) => {
    if (err) {
      
      res.render('cart/guncategory_create', { title: 'Create Gun Category', error: 'Error creating gun category' });
    } else {
      res.redirect('/cart/gunscategories');
    }
  });
};

// Display confirmation page for deleting a specific Gunscategories.
exports.gunscategory_delete_get = function (req, res, next) {
    const id = req.params.id;
    Gunscategories.findById(id)
      .exec((err, gunscategory) => {
        if (err) { return next(err); }
        if (!gunscategory) {
          const err = new Error('Gun category not found');
          err.status = 404;
          return next(err);
        }
        res.render('cart/guncategory_delete', { title: 'Delete Gun Category', gunscategory });
      });
  };
  
  // Handle delete on POST.
  exports.gunscategory_delete_post = function (req, res, next) {
    const id = req.params.id;
    Gunscategories.findByIdAndRemove(id, function deleteGunscategory(err) {
      if (err) { return next(err); }
      res.redirect('/cart/gunscategories');
    });
  };


  
// Display edit form for a specific Gunscategories.
exports.gunscategory_update_get = function (req, res, next) {
    const id = req.params.id;
    Gunscategories.findById(id)
      .exec((err, gunscategory) => {
        if (err) { return next(err); }
        if (!gunscategory) {
          const err = new Error('Gun category not found');
          err.status = 404;
          return next(err);
        }
        res.render('cart/guncategory_edit', { title: 'Edit Gun Category', gunscategory });
      });
  };
  
  // Handle update on POST.
  exports.gunscategory_update_post = function (req, res, next) {
    const id = req.params.id;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.description;
  
    Gunscategories.findByIdAndUpdate(
      id,
      { category: updatedCategory, description: updatedDescription },
      {},
      function updateGunscategory(err) {
        if (err) { return next(err); }
        res.redirect('/cart/guncategory/' + id);
      }
    );
  };
  

// Export the controller functions.
module.exports = exports;
// Import the multer middleware
const multer = require('multer');
const upload = multer({ dest: './pics' }); // Use './pics' as the destination


const Rifles = require('../../../../models/rifles'); // Import your Product model
const Guns = require('../../../../models/guns'); // Import your Product model
const Gunscategories = require('../../../../models/gunscategories'); // Import Gun Categories model
const Riflecategories = require('../../../../models/riflescategories'); // Import Rifle Categories model

// Controller functions for product management

// Controller functions for product management
exports.product_list = async function (req, res, next) {
    try {
      const categoryType = req.query.categoryType; // Extract categoryType from query parameter
      const categoryId = req.query.categoryId;     // Extract categoryId from query parameter
  
      console.log('categoryType : ', categoryType);
      console.log('categoryId : ', categoryId);
  
      // Determine the appropriate model and category based on the category type
      let CategoryModel, ProductModel;
      if (categoryType === 'guns') {
        CategoryModel = Gunscategories;
        ProductModel = Guns;
      } else if (categoryType === 'rifles') {
        CategoryModel = Riflecategories;
        ProductModel = Rifles;
      } else {
        return res.status(400).send('Invalid category type');
      }
  
      const category = await CategoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).send('Category not found');
      }
  
      const products = await ProductModel.find({ categoryId }).exec();
  
      res.render('admin/stock/products/products_list', {
        title: 'Products List',
        categoryType,      // Pass the extracted categoryType to the view
        categoryId,        // Pass the extracted categoryId to the view
        categoryName: category.category,
        products
      });
    } catch (err) {
      next(err);
    }
  };
  

/*
exports.product_list = async function (req, res, next) {
    try {

        const categoryType = req.query.categoryType; // Extract categoryType from query parameter
        const categoryId = req.query.categoryId;     // Extract categoryId from query parameter
    
    //  const urlParts = req.url.split('/'); // Split the URL path
    //  console.log('urlParts : ', urlParts)
    //  const categoryType = urlParts[1]; // Extract categoryType from the URL
    console.log('categoryType : ', categoryType)
    //  const categoryId = urlParts[2]; // Extract categoryId from the URL
        
      console.log('categoryId : ', categoryId);
  
      // Determine the appropriate model based on the category type
      const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;

      const ProductModel = categoryType === 'guns' ? Guns : Rifles;
  
      const category = await CategoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).send('Category not found');
      }
  
      const products = await ProductModel.find({ categoryId }).exec();
  
      res.render('admin/stock/products/products_list', {
        title: 'Products List',
        categoryType,      // Pass the extracted categoryType to the view
        categoryId,        // Pass the extracted categoryId to the view
        categoryName: category.category,
        products
      });
    } catch (err) {
      next(err);
    }
  };

  */
  

  exports.product_create_get = async function (req, res, next) {
    try {
      const categoryType = req.query.categoryType; // Extract categoryType from query parameter
      const categoryId = req.query.categoryId;     // Extract categoryId from query parameter
  
      // Determine the appropriate model and view template based on the category type
      let CategoryModel, viewTemplate;
      if (categoryType === 'guns') {
        CategoryModel = Gunscategories;
        viewTemplate = 'admin/stock/products/product_create_gun';
      } else if (categoryType === 'rifles') {
        CategoryModel = Riflecategories;
        viewTemplate = 'admin/stock/products/product_create_rifle'; // Change this to the actual template name
      } else {
        return res.status(400).send('Invalid category type');
      }
  
      const category = await CategoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).send('Category not found');
      }
  
      res.render(viewTemplate, {
        title: 'Add New Product',
        categoryType,
        categoryId,
        categoryName: category.category
      });
    } catch (err) {
      next(err);
    }
  };
  

  //todo: tento post ti napriklad sprvi len rifle
  //    naststie mas len vykommentnute to iste co ti  funguje pre gun
  //    narob si aj tu poduct_create_post_gun a product_create_post_rifle
  //    product_edit_post_gun product_edit_post_rifle...
  exports.product_create_post = async function (req, res, next) {
    upload.single('image')(req, res, async function (err) {
      try {
        const { categoryType, categoryId } = req.query;
  
        // Determine the appropriate models based on the category type
        let CategoryModel, ProductModel;
        if (categoryType === 'guns') {
          CategoryModel = Gunscategories;
          ProductModel = Guns;
          //	this should only work for gun...
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        const { name, hand_sub, pist_revolv, price, stock } = req.body;
        const image = req.file.filename;

        const productInstance = new ProductModel({
            guns_categories_id: categoryId,
            name,
            hand_sub,
            pist_revolv,
            image,
            price,
            stock
        });

        await productInstance.save();

        res.redirect(`/admin/stock/products?categoryType=${categoryType}&categoryId=${categoryId}`);
		
		//	end this should only work for gun...
        } else if (categoryType === 'rifles') {
          CategoryModel = Riflecategories;
          ProductModel = Rifles;
          //  this only works for rifle!!!
        const category = await CategoryModel.findById(categoryId);
  
        if (!category) {
          return res.status(404).send('Category not found');
        }
  
        
        const { name, description, price, stock } = req.body;
        const image = req.file.filename;
  
        const productInstance = new ProductModel({
          rifles_category_id: categoryId, // Change this field name to match your Rifle model
          name,
          description,
          image,
          price,
          stock
        });
  
        await productInstance.save();
  
        res.redirect(`/admin/stock/products?categoryType=${categoryType}&categoryId=${categoryId}`);
        //  end this only works for rifle!!!
        } else {
          return res.status(400).send('Invalid category type');
        }
        
        /*
        //  this only works for rifle!!!
        const category = await CategoryModel.findById(categoryId);
  
        if (!category) {
          return res.status(404).send('Category not found');
        }
  
        
        const { name, description, price, stock } = req.body;
        const image = req.file.filename;
  
        const productInstance = new ProductModel({
          rifles_category_id: categoryId, // Change this field name to match your Rifle model
          name,
          description,
          image,
          price,
          stock
        });
  
        await productInstance.save();
  
        res.redirect(`/admin/stock/products?categoryType=${categoryType}&categoryId=${categoryId}`);
        //  end this only works for rifle!!!
        */
    } catch (err) {
        next(err);
      }
    });
  };
  


  /*

  exports.product_create_get = async function (req, res, next) {
    try {
        const categoryType = req.query.categoryType; // Extract categoryType from query parameter
        const categoryId = req.query.categoryId;     // Extract categoryId from query parameter

        // Determine the appropriate model based on the category type
        const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
        
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        res.render('admin/stock/products/product_create', {
            title: 'Add New Product',
            categoryType,
            categoryId,
            categoryName: category.category
        });
    } catch (err) {
        next(err);
    }
};

exports.product_create_post = async function (req, res, next) {
    upload.single('image')(req, res, async function (err) {
    try {
        const { categoryType, categoryId } = req.query;

        const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
        const ProductModel = categoryType === 'guns' ? Guns : Rifles;

        //	this should only work for gun...
        const category = await CategoryModel.findById(categoryId);

        if (!category) {
            return res.status(404).send('Category not found');
        }

        const { name, hand_sub, pist_revolv, price, stock } = req.body;
        const image = req.file.filename;

        const productInstance = new ProductModel({
            guns_categories_id: categoryId,
            name,
            hand_sub,
            pist_revolv,
            image,
            price,
            stock
        });

        await productInstance.save();

        res.redirect(`/admin/stock/products?categoryType=${categoryType}&categoryId=${categoryId}`);
        //	end this should only work for gun...
    } catch (err) {
        next(err);
    }
});
};

*/

exports.product_edit_get = async function (req, res, next) {
    try {
      const categoryType = req.query.categoryType; // Extract categoryType from query parameter
      const categoryId = req.query.categoryId;     // Extract categoryId from query parameter
      const productId = req.params.productId;       // Extract productId from route parameter
  
      // Determine the appropriate model based on the category type
      //    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
      //    const ProductModel = categoryType === 'guns' ? Guns : Rifles;
  
        //  choosing different views, based upon categoryType : gund /rifles
              // Determine the appropriate model and view template based on the category type
      let CategoryModel, viewTemplate, ProductModel;
      if (categoryType === 'guns') {
        CategoryModel = Gunscategories;
        ProductModel = Guns;
        viewTemplate = 'admin/stock/products/product_edit_gun';
      } else if (categoryType === 'rifles') {
        CategoryModel = Riflecategories;
        ProductModel = Rifles;
        viewTemplate = 'admin/stock/products/product_edit_rifle'; // Change this to the actual template name
      } else {
        return res.status(400).send('Invalid category type');
      }
      //  end choosing different views, based upon categoryType : gund /rifles

      //    this part might work for gun, move it to the condition
      
      const category = await CategoryModel.findById(categoryId);
      const product = await ProductModel.findById(productId);
  
      if (!category || !product) {
        return res.status(404).send('Category or product not found');
      }
  
      res.render(viewTemplate, {
        title: 'Edit Product',
        categoryType,
        categoryId,
        productId,
        categoryName: category.category,
        product
      });
      
      //    end this part might work for gun, move it to the condition
    } catch (err) {
      next(err);
    }
  };
  
  exports.product_edit_post = async function (req, res, next) {
    upload.single('image')(req, res, async function (err) {
    try {
      const { categoryType, categoryId/*, productId*/ } = req.query;
      const productId = req.params.productId;
  
      //    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
      //    const ProductModel = categoryType === 'guns' ? Guns : Rifles;
      console.log('categoryType : ', categoryType);
            // Determine the appropriate models based on the category type
            let CategoryModel, ProductModel;
            if (categoryType === 'guns') {
              CategoryModel = Gunscategories;
              ProductModel = Guns;
            } else if (categoryType === 'rifles') {
              CategoryModel = Riflecategories;
              ProductModel = Rifles;
              
            } else {
              return res.status(400).send('Invalid category type');
            }

      const category = await CategoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).send('Category not found');
      }

      

            // Get the existing product details
            const existingProduct = await ProductModel.findById(productId);

            if (!existingProduct) {
              return res.status(404).send('Product not found');
            }
      
            // Update product details based on the category type
            if (categoryType === 'guns') {
      const { name, hand_sub, pist_revolv, price, stock } = req.body;
      const updatedFields = {
        name,
        hand_sub,
        pist_revolv,
        price,
        stock
      };

      // Update image only if provided in the request
      if (req.file) {
        updatedFields.image = req.file.filename;
      }

      await ProductModel.findByIdAndUpdate(productId, updatedFields);
    } else if (categoryType === 'rifles') {
      const { name, description, price, stock } = req.body;
      const updatedFields = {
        name,
        description,
        price,
        stock
      };

      // Update image only if provided in the request
      if (req.file) {
        updatedFields.image = req.file.filename;
      }

      await ProductModel.findByIdAndUpdate(productId, updatedFields);
    }

      /*
      // Find and update the product by ID
      await ProductModel.findByIdAndUpdate(productId, {
        name,
        hand_sub,
        pist_revolv,
        price,
        stock
      });
      */
      res.redirect(`/admin/stock/products?categoryType=${categoryType}&categoryId=${categoryId}`);
  
    } catch (err) {
      next(err);
    }
    });
  };

  // Display confirmation page for deleting a stock category.
  exports.product_delete_get = function (req, res, next) {
    const categoryId = req.query.categoryId; // Get the category ID from the URL parameter
    console.log('categoryId : ', categoryId)
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
    console.log('categoryType : ', categoryType)
    const productId = req.params.productId;
    console.log('productId : ', productId)

    
    res.render('admin/stock/products/product_delete', {
      
      title: 'Delete Product',
        categoryType,
        categoryId,
        productId
    });
  };




  // Handle deleting a stock category.
exports.product_delete_post = function (req, res, next) {
    const categoryId = req.query.categoryId; // Get the category ID from the URL parameter
    console.log('categoryId : ', categoryId)
    const categoryType = req.query.categoryType; // Get the category type from the query parameter
    console.log('categoryType : ', categoryType)
    const productId = req.params.productId;
    console.log('productId : ', productId)

    // Determine the appropriate model based on the category type
    const CategoryModel = categoryType === 'guns' ? Gunscategories : Riflecategories;
    const ProductModel = categoryType === 'guns' ? Guns : Rifles;

    // Delete the category by ID
    ProductModel.findByIdAndDelete(productId, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect(`/admin/stock/products?categoryType=${categoryType}&categoryId=${categoryId}`);
    });
  };



module.exports = exports;
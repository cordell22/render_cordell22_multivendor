
// mv_cartProductController.js

//  const mv_Cart = require('../models/mv_cart');
const mv_Product = require('../models/mv_product');

//  addToCart
exports.addToCart = async (req, res) => {
    try {
      const productId = req.params.productId;
      //	const cartId = req.session.cartId; // Check if cart session exists
      //	console.log('na zaciatku cartId:', cartId);
      // Check if the product exists
      const product = await mv_Product.findById(productId);
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      // Check if the cart exists
      //    let cart;
      // Find the cart in the session
      let cart = req.session.cart;
      //    if (!cartId) {
      if (!cart) {
        // If cart session doesn't exist, create a new cart
        
        /*
        cart = new mv_Cart({
          items: [{ product: productId, quantity: 1 }]
        });
        await cart.save();
        req.session.cartId = cart._id; // Save cart ID in session
        */
        cart = {
            items: [{ product: product, quantity: 1 }]
          };
          //    req.session.cartId = cart._id; // Save cart ID in session
      } else {
        // If cart session exists, find the cart
        //  cart = await mv_Cart.findById(cartId);
        
        // Check if the product already exists in the cart
        console.log('cart.items:', cart.items);
        console.log('productId:', productId);
        const existingItemIndex = cart.items.findIndex(item => item.product._id === productId);
        console.log('existingItemIndex:', existingItemIndex);
        if (existingItemIndex !== -1) {
          // If the product already exists, increment the quantity
          cart.items[existingItemIndex].quantity += 1;
        } else {
          // If the product doesn't exist, add it to the cart
          cart.items.push({ product: product, quantity: 1 });
        }
        //  await cart.save();
      }
  
      req.session.cart = cart; // Update the session cart
      console.log('Cart updated:', cart); // Log the updated cart object to console
      console.log('session updated:', req.session.cart);
      res.redirect('/show-cart'); // Redirect to cart page after adding the product
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding product to cart');
    }
  };

// Display cart page
exports.showCart = async (req, res) => {
    try {
      /*
      const cartId = req.session.cartId;
      if (!cartId) {
        // If cart session doesn't exist, render an empty cart page
        return res.render('mv_cart', { title: 'Shopping Cart', items: [] });
      }
  
      // If cart session exists, find the cart and populate products
      const cart = await mv_Cart.findById(cartId).populate('items.product');
      */
      const cart = req.session.cart;
      if (!cart || cart.items.length === 0) {
        // If cart session doesn't exist or is empty, render an empty cart page
        return res.render('mv_cart', { title: 'Shopping Cart', items: [], total: 0 });
      }
  
      // Calculate total price
      let total = 0;
      cart.items.forEach(item => {
        total += item.product.price * item.quantity;
      });
      res.render('mv_cart', { title: 'Shopping Cart', items: cart.items });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching cart');
    }
  };

  // Remove a unit from the cart
exports.removeUnit = async (req, res) => {
    const productId = req.params.productId;
    try {
        // Find the cart in the session
        let cart = req.session.cart;
        if (!cart) {
            return res.redirect('/show-cart');
        }
        // Decrease the quantity of the product in the cart
        /*
        if (cart.items[productId]) {
            cart.items[productId].quantity--;
            // If quantity becomes 0, remove the item from the cart
            if (cart.items[productId].quantity === 0) {
                delete cart.items[productId];
            }
            */
        // Find the index of the product in the cart items
        const productIndex = cart.items.findIndex(item => item.product._id === productId);
        if (productIndex !== -1) {
            // If the product is found in the cart
            const currentQuantity = cart.items[productIndex].quantity;
            if (currentQuantity > 1) {
                // If the quantity is more than 1, decrement it
                cart.items[productIndex].quantity--;
            } else {
                // If the quantity is 1, remove the product from the cart
                cart.items.splice(productIndex, 1);
            }
            // Update the session cart
            req.session.cart = cart;
        }
        res.redirect('/show-cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error removing unit from cart');
    }
};

// Add a unit to the cart
exports.addUnit = async (req, res) => {
    const productId = req.params.productId;
    try {
        // Find the cart in the session
        let cart = req.session.cart;
        if (!cart) {
            return res.redirect('/show-cart');
        }
        // Increase the quantity of the product in the cart
        const productIndex = cart.items.findIndex(item => item.product._id === productId);
        /*
        if (cart.items[productId]) {
            cart.items[productId].quantity++;
        */
        
        if (productIndex !== -1) {
            // If the product is already in the cart, increment its quantity
            cart.items[productIndex].quantity++;
        } else {
            // If the product is not already in the cart, add it with quantity 1
            const product = await mv_Product.findById(productId);
            //  cart.items[productId] = { product: await mv_Product.findById(productId), quantity: 1 };
            if (product) {
                cart.items.push({ product: product, quantity: 1 });
            } else {
                console.error('Product not found:', productId);
            }
        }
        // Update the session cart
        req.session.cart = cart;
        res.redirect('/show-cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding unit to cart');
    }
};


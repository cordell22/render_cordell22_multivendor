const Cart = require('../../models/cart'); // Import your Cart model here
const Guns = require('../../models/guns'); // Import your Cart model here
const Rifles = require('../../models/rifles'); // Import your Cart model here


// Display cart contents and total value
exports.getCart = async (req, res) => {
  try {
    //  const user_session_id = req.sessionID; // Get user session ID
    if (!req.session.userID) {
      req.session.userID = 'your-user-id';
    }
    const user_session_id = req.session.userID;
    console.log('user_session_id :', user_session_id);

    const cartItems = await Cart.find({ user_session_id });
/*
    let cartTotal = 0;
    cartItems.forEach(item => {
      cartTotal += item.quantity * item.price;
    }); */

    let cartTotal = 0;
    for (const item of cartItems) {
      let itemPrice = 0;
      let productName = 'Unknown'; // Default product name
      if (item.product_type === 'guns') {
        const gun = await Guns.findById(item.product_id);
        itemPrice = gun.price;
        productName = gun.name;
      } else if (item.product_type === 'rifles') {
        const rifle = await Rifles.findById(item.product_id);
        itemPrice = rifle.price;
        productName = rifle.name;
      }
      console.log('itemPrice :', itemPrice);
      console.log('item.quantity :', item.quantity);
      cartTotal += item.quantity * itemPrice;
      item.product_name = productName; // Add product name to the cart item
    }

    res.render('cart/showcart', {
      cartItems,
      cartTotal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Add or update item in cart 
exports.addToCart = async (req, res) => {
  try {
    const { product_id, product_type, quantity } = req.body;
    console.log('product_id :', product_id);
    console.log('product_type :', product_type);
    console.log('quantity :', quantity);
    if (!req.session.userID) {
      req.session.userID = 'your-user-id';
    }
    const user_session_id = req.session.userID;
    console.log('user_session_id :', user_session_id);

    // Check if item already exists in cart
    let cartItem = await Cart.findOne({ user_session_id, product_id });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      // Create new cart item
      cartItem = new Cart({
        //  quantity,
        user_session_id,
        product_type,
        product_id,
        quantity,
        // ... other necessary fields from your model
      });
    }

    await cartItem.save();
    res.redirect('/cart'); // Redirect to cart page ALE nie ze cart/showcart..?
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update cart item quantity
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId, newQuantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { quantity: newQuantity },
      { new: true }
    );

    let itemPrice = 0;
    if (cartItem.product_type === 'guns') {
      const gun = await Guns.findById(cartItem.product_id);
      itemPrice = gun.price;
    } else if (cartItem.product_type === 'rifles') {
      const rifle = await Rifles.findById(cartItem.product_id);
      itemPrice = rifle.price;
    }

    res.json({ success: true, newTotal: cartItem.quantity * cartItem.price });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.increaseCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { $inc: { quantity: 1 } }, // Increment quantity by 1
      { new: true }
    );

    //  res.json({ success: true, newQuantity: cartItem.quantity });
    res.redirect('/cart'); // Redirect to cart page ALE nie ze cart/showcart..?
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Decrease cart item quantity
exports.decreaseCartItemQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      cartItemId,
      { $inc: { quantity: -1 } }, // Decrement quantity by 1
      { new: true }
    );

    //  res.json({ success: true, newQuantity: cartItem.quantity });
    res.redirect('/cart'); // Redirect to cart page ALE nie ze cart/showcart..?
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
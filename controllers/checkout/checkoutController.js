const Customer = require('../../models/customers');
const Order = require('../../models/orders');
const Cart = require('../../models/cart');
const Guns = require('../../models/guns');
const Rifles = require('../../models/rifles');
const OrderContent = require('../../models/ordercontents');

// Display checkout page with total price and payment form
exports.showCheckout = async (req, res) => {
  try {
    const user_session_id = req.session.userID;
    const cartItems = await Cart.find({ user_session_id });

    let cartTotal = 0;
    for (const item of cartItems) {
      let itemPrice = 0;
      if (item.product_type === 'guns') {
        const gun = await Guns.findById(item.product_id);
        itemPrice = gun.price;
      } else if (item.product_type === 'rifles') {
        const rifle = await Rifles.findById(item.product_id);
        itemPrice = rifle.price;
      }
      cartTotal += item.quantity * itemPrice;
    }

    res.render('checkout/checkout', {
      cartTotal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Handle the payment and save the order details
exports.processPayment = async (req, res) => {
  try {
    const { email, first_name, last_name } = req.body;
    const cartItems = await Cart.find({ user_session_id: req.session.userID });

    let address1 = 'dummy address';
    let address2 = 'dummy address 2';
    let city = 'dummy city';
    let state = 'dummy state';
    let zip = 12345;
    let phone = 660183484;
    // Calculate total price from cart items
    let cartTotal = 0;
    for (const item of cartItems) {
      let itemPrice = 0;
      if (item.product_type === 'guns') {
        const gun = await Guns.findById(item.product_id);
        itemPrice = gun.price;
      } else if (item.product_type === 'rifles') {
        const rifle = await Rifles.findById(item.product_id);
        itemPrice = rifle.price;
      }
      cartTotal += item.quantity * itemPrice;
    }

    // Create a new customer entry
    const customer = new Customer({
      email,
      first_name,
      last_name,
      address1,
      address2,
      city,
      state,
      zip,
      phone,
    });
    await customer.save();

    // Create a new order entry
    const order = new Order({
      customer_id: customer._id,
      total: cartTotal,
      shipping: 0, // You can adjust this as needed
      order_date: new Date(),
    });
    await order.save();

    // Create order content entries
    for (const item of cartItems) {
      const { product_type, product_id, quantity } = item;
      let itemPrice = 0;
      if (product_type === 'guns') {
        const gun = await Guns.findById(product_id);
        itemPrice = gun.price;
      } else if (product_type === 'rifles') {
        const rifle = await Rifles.findById(product_id);
        itemPrice = rifle.price;
      }
      const orderContent = new OrderContent({
        order_id: order._id,
        product_type,
        product_id,
        quantity,
        price_per: itemPrice,
      });
      await orderContent.save();
    }

    // Clear the cart after successful order
    await Cart.deleteMany({ user_session_id: req.session.userID });

    res.redirect('/shop'); // Redirect to the shop page
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
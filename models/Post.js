const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  order: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  orderStatus: { // Property allows us to know when an order is waiting to be completed. A put request is sent to the server when completed button is clicked.
    type: String,
    required: true,
    default: 'pending'
  },
  customerName: { // Make sure every order has a customers name on it. It will make is easier when it comes time to display orders in ejs
    type: String,
    required: true,
  },
  barista: { // This property will help us keep trash of which barista completes an order. It's determined on who is currenly logged in when the complete order PUT request is sent to the server
    type: String,
    required: true,
    default: " " // When a new order is created, set the barista name to empty string. The name will update when a barista completes an order
  }

  
});

module.exports = mongoose.model("orders", PostSchema); // "orders" is the collection name. It takes orders and makes it plural. You can also add a third parameter and call the database whatever you want
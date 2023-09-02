const Post = require("../models/Post");


// We are exporting an object and all these are async methods.
module.exports = {
  getProfile: async (req, res) => {
    try {

      // Find all the pending order. Orders that have not been completed
      const pendingOrders = await Post.find({orderStatus: "pending"});

      // Find all the completed orders
      const completedOrders = await Post.find({orderStatus: "complete"})
      
      console.log(pendingOrders, completedOrders)
      
      // Send the pending and completed orders to the ejs so we can dynamically create html elements
      res.render("profile.ejs", { pendingOrders: pendingOrders, completedOrders: completedOrders, user: req.user });

    } catch (err) {
      console.log(err);
    }
  },

  getPost: async (req, res) => {
    try {
      // Post is the schema for a gernal post
      const post = await Post.findById(req.params.id); // .params.id getting the query paramater from the url


      // When we go into the post. Also see if that post has any comments
      const comment = await Comment.find({postId: req.params.id}); // .params.id getting the query paramater from the url
      console.log(comment)



      res.render("post.ejs", { post: post, user: req.user, comment: comment }); //Once a post that machtes this id is found. Send it to the post.ejs. Also send the comment array
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {

    console.log(req.body)

    // We're giving the user to select up to two drinks. We beign sent an array to the backend ex: [ 'Iced Cappuccino', 'Hot Chocolate' ]. 
    // If the user only submits one drink this creates an empty string in the array ex:[ 'Iced Cappuccino', 'Hot Chocolate' ]. We need to remvoe any empty strings before saving the order to the DB 
    let orderArr = req.body.drink.filter(item => item.length > 0)


    try {

      // Use the Post schema to create a document and save it to mongoDB
      await Post.create({

        order: orderArr,
        size: req.body.size,
        customerName: req.body.customerName
      });
      console.log("Post has been added!");
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }


  },

  completeOrder: async (req, res) => {
    console.log(req.user)

    // Go to the orders collection find an id that matches the one sent via query parameter and update orderStatus from pending to complete
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          orderStatus:  "complete" ,
          barista: req.user.userName // When a barista marks the order as complete. Take their name and attach it to that order. That way we can keep track of who is completing orders and display it
        }
      );
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteOrder: async (req, res) => {
    try {

      // Delete post from db
      await Post.remove({ _id: req.params.id });
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },

};

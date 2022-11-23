const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); //You can grab the query paramater with :id. :id is creating a paramter that will hold the query paramater
// ensureAuth to make sure your logged in. :id we cna call it whatever we want. It's just a parameter
// the route is example: http://localhost:8000/post/637531bdb674a3719be5932d . When you click to go to a post directly it sends a get request because
// it's in a <a> tag

router.post("/createPost", postsController.createPost);

// When a barista marks an order complete, go to the post controller and run the completeOrder method
router.put("/completeOrder/:id", postsController.completeOrder);

// When a order has been complete it will be displayed on the completed section and have a trash can icon. Baristas can delete an order
router.delete("/deleteOrder/:id", postsController.deleteOrder);


module.exports = router;
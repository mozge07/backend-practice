const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middleware/auth.middleware");
/**
 * @route POST /api/posts [protected]
 * @description req.body = { caption, image-file}
 */
postRouter.post(
  "/",
  identifyUser,
  upload.single("image"),
  postController.createPostController,
);

/**
 * @route GET /api/post/ [protected]
 * @description get all the post of user is login with
 */
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * @route GET /api/post/details/:postId
 * @description used to fetch an specific post of the user which is currently loged in by prvideing postId
 */
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

/**
 * @route POST /api/post/like/:postid
 * @description to like a post
 */
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);
postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unlikePostController,
);

/**
 * @route GET /api/posts/feed
 * @description get all the post created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController);

module.exports = postRouter;

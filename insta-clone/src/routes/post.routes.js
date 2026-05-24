const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middleware/auth.middleware");
/**
 * POST /api/posts [protected]
 * req.body = { caption, image-file}
 * api/post/
 */
postRouter.post(
  "/",
  identifyUser,
  upload.single("image"),
  postController.createPostController,
);

/**
 * GET /api/post/ [protected]
 * get all the post of user is login with
 */
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * GET /api/post/details/:postId
 * used to fetch an specific post of the user which is currently loged in by prvideing postId
 */
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);

module.exports = postRouter;

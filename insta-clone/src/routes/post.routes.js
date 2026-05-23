const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/posts [protected]
 * req.body = { caption, image-file}
 * api/post/
 */
postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

/**
 * GET /api/post/ [protected]
 * get all the post of user is login with
 */
postRouter.get("/", postController.getPostController);

/**
 * GET /api/post/details/:postId
 * used to fetch an specific post of the user which is currently loged in by prvideing postId
 */
postRouter.get("/details/:postId", postController.getPostDetailsController);

module.exports = postRouter;

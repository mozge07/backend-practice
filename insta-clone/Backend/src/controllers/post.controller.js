const mongoose = require("mongoose");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * @description for creating a new post
 */
async function createPostController(req, res) {
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
    folder: "insta-clone-imags",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

/**
 * @description to fetch all post of user login
 */
async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(201).json({
    message: "post fetched successfully",
    posts,
  });
}
/**
 * @description to fetch only single post by postid of user login
 */
async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isUserValid = post.user.toString() === userId;

  if (!isUserValid) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  return res.status(200).json({
    message: "post fetched successfully.",
    post,
  });
}

/**
 * @description to like an specific post
 */
async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isPostLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (isPostLiked) {
    return res.status(400).json({
      message: "post is already liked",
    });
  }

  const like = await likeModel.create({
    user: username,
    post: postId,
  });

  res.status(201).json({
    message: "post liked successfully",
    like,
  });
}
/**
 * @description to unlike an specific post
 */
async function unlikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (!isLiked) {
    return res.status(400).json({
      message: "post didn't like",
    });
  }

  await likeModel.findOneAndDelete({ _id: isLiked._id });

  return res.status(200).json({
    message: "post unliked",
  });
}

/**
 * @description to get all post in DB
 */
async function getFeedController(req, res) {
  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        user: req.user.username,
        post: post._id,
      });

      post.isLiked = Boolean(isLiked);

      return post;
    }),
  );

  res.status(200).json({
    message: "post fetched successfully",
    posts,
  });
}

module.exports = {
  createPostController,

  getPostController,

  getPostDetailsController,

  likePostController,

  getFeedController,

  unlikePostController,
};

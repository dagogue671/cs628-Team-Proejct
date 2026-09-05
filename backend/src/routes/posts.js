import { Router } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";

const router = Router();
const AUTHOR_FIELDS = "name email";

router.get("/", async (request, response, next) => {
  try {
    const { userId } = request.query;
    let filter = {};

    if (userId) {
      const user = await User.findById(userId).select("friends");
      if (!user) {
        return response.status(404).json({ message: "User not found." });
      }
      filter = { author: { $in: [userId, ...user.friends] } };
    }

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", AUTHOR_FIELDS)
      .populate("comments.author", AUTHOR_FIELDS);

    return response.json({ posts });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { authorId, content } = request.body ?? {};

    if (!authorId || !content?.trim()) {
      return response.status(400).json({ message: "authorId and content are required." });
    }

    const post = await Post.create({ author: authorId, content: content.trim() });
    await post.populate("author", AUTHOR_FIELDS);

    return response.status(201).json({ post });
  } catch (error) {
    return next(error);
  }
});

router.post("/:postId/like", async (request, response, next) => {
  try {
    const { userId } = request.body ?? {};
    if (!userId) {
      return response.status(400).json({ message: "userId is required." });
    }

    const post = await Post.findById(request.params.postId);
    if (!post) {
      return response.status(404).json({ message: "Post not found." });
    }

    const hasLiked = post.likes.some((likeId) => likeId.toString() === userId);
    post.likes = hasLiked
      ? post.likes.filter((likeId) => likeId.toString() !== userId)
      : [...post.likes, userId];
    await post.save();
    await post.populate("author", AUTHOR_FIELDS);
    await post.populate("comments.author", AUTHOR_FIELDS);

    return response.json({ post });
  } catch (error) {
    return next(error);
  }
});

router.post("/:postId/comments", async (request, response, next) => {
  try {
    const { authorId, content } = request.body ?? {};
    if (!authorId || !content?.trim()) {
      return response.status(400).json({ message: "authorId and content are required." });
    }

    const post = await Post.findById(request.params.postId);
    if (!post) {
      return response.status(404).json({ message: "Post not found." });
    }

    post.comments.push({ author: authorId, content: content.trim() });
    await post.save();
    await post.populate("author", AUTHOR_FIELDS);
    await post.populate("comments.author", AUTHOR_FIELDS);

    return response.status(201).json({ post });
  } catch (error) {
    return next(error);
  }
});

export default router;

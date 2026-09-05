import { Router } from "express";
import User from "../models/User.js";

const router = Router();
const PUBLIC_FIELDS = "name email friends";

router.get("/", async (request, response, next) => {
  try {
    const { excludeId } = request.query;
    const filter = excludeId ? { _id: { $ne: excludeId } } : {};
    const users = await User.find(filter).select(PUBLIC_FIELDS);

    return response.json({ users });
  } catch (error) {
    return next(error);
  }
});

router.get("/:userId/friends", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.userId).populate("friends", "name email");
    if (!user) {
      return response.status(404).json({ message: "User not found." });
    }

    return response.json({ friends: user.friends });
  } catch (error) {
    return next(error);
  }
});

router.post("/:userId/friends", async (request, response, next) => {
  try {
    const { friendId } = request.body ?? {};
    const { userId } = request.params;

    if (!friendId) {
      return response.status(400).json({ message: "friendId is required." });
    }
    if (friendId === userId) {
      return response.status(400).json({ message: "You cannot add yourself as a friend." });
    }

    const [user, friend] = await Promise.all([
      User.findById(userId),
      User.findById(friendId),
    ]);

    if (!user || !friend) {
      return response.status(404).json({ message: "User not found." });
    }

    if (!user.friends.some((id) => id.toString() === friendId)) {
      user.friends.push(friendId);
      await user.save();
    }
    if (!friend.friends.some((id) => id.toString() === userId)) {
      friend.friends.push(userId);
      await friend.save();
    }

    return response.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:userId/friends/:friendId", async (request, response, next) => {
  try {
    const { userId, friendId } = request.params;

    const [user, friend] = await Promise.all([
      User.findById(userId),
      User.findById(friendId),
    ]);

    if (!user || !friend) {
      return response.status(404).json({ message: "User not found." });
    }

    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
    await Promise.all([user.save(), friend.save()]);

    return response.json({ user });
  } catch (error) {
    return next(error);
  }
});

export default router;

import express from "express";
import { signupUser, loginUser } from "../controller/user-controller.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controller/post-controller.js";
import {
  addComment,
  getComments,
  deleteComment,
} from "../controller/comment-controller.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.post("/create", createPost);
router.get("/posts", getAllPosts);

router.get("/post/:id", getPost);

router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

router.post("/comment/new", addComment);
router.get("/comments/:id", getComments);
router.delete("/comment/delete/:id", deleteComment);
export default router;

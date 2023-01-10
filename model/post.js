import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  teamSize: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  expiringDay: {
    type: Number,
    required: true,
  },
});

const post = mongoose.model("posts", postSchema);
export default post;

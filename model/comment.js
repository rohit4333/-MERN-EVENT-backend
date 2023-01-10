import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  postid: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const comment = mongoose.model("comments", CommentSchema);

export default comment;

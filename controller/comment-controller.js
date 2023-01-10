import Comment from "../model/comment.js";

export const addComment = async (request, response) => {
  try {
    const comment = await new Comment(request.body);
    comment.save();

    return response.status(200).json({ msg: "Comment Saved Successfully." });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const getComments = async (request, response) => {
  try {
    const comments = await Comment.find({ postid: request.params.id });

    response.status(200).json(comments);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deleteComment = async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);
    await comment.delete();

    response.status(200).json("comment deleted successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

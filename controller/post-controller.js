import Post from "../model/post.js";

export const createPost = async (request, response) => {
  try {
    const post = new Post(request.body);
    await post.save();

    return response.status(200).json({ msg: "Post saved Successfully.." });
  } catch (error) {
    return response.status(500).json({ msg: "Post didn't save at database.." });
  }
};

export const getAllPosts = async (request, response) => {
  let category = request.query.category;

  try {
    let posts;
    if (category) {
      posts = await Post.find({ category: category });
    } else {
      posts = await Post.find();
    }
    // console.log(posts);
    return response.status(200).json(posts);
  } catch (error) {
    console.log("error occured");
    return response.status(500).json({ msg: error.message });
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    return response.status(200).json(post);
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(404).json({ msg: "post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    return response.status(200).json({ msg: "Post updated Successfully." });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if (!post) {
      return response.status(404).json({ msg: "post not found" });
    }

    //await Post.findByIdAndDelete(request.params.id);
    await post.delete();
    return response.status(200).json({ msg: "Post Deleted Successfully." });
  } catch (error) {
    return response.status(500).json({ msg: error.message });
  }
};

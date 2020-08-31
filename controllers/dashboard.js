const Post = require("../models/Post");
const User = require("../models/User");

async function getUserPosts(req, res) {
  let posts = [];

  for (let i = 0; i < req.user.posts.length; i++) {
    try {
      let post = await Post.findById(req.user.posts[i]);
      posts.push(post);
    } catch (err) {
      console.log(err);
    }
  }

  return res.render("dashboard", {
    user: req.user,
    posts: posts,
  });
}

async function postUserPost(req, res) {
  let { title, description } = req.body;
  if (!title || !description) {
    return res.redirect("/dashboard");
  }

  const newPost = new Post({
    title,
    description,
  });

  try {
    // save post
    await newPost.save();
    // save user
    let user = await User.findById(req.user._id);
    user.posts.push(newPost._id);
    await user.save();

    return res.status(200).redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
}

async function deleteUserPost(req, res) {
  const id = req.params.id;
  const posts = req.user.posts.filter((value, index, array) => {
    return value != id;
  });

  try {
    await User.findOneAndUpdate({ _id: req.user.id }, { posts: posts });
    await Post.findByIdAndDelete(id);
  } catch (error) {
    return res.redirect("/dashboard");
  }
  return res.redirect("/dashboard");
}

module.exports = {
  getUserPosts,
  postUserPost,
  deleteUserPost,
};

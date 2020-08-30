const Post = require("../models/Post");
const User = require("../models/User");

async function getUserPosts(req, res) {
  let posts = [];

  for (let i = 0; i < req.user.posts.length; i++) {
    await Post.findById(req.user.posts[i], (err, post) => {
      posts.push(post);
    });
  }
  console.log("------------------");
  console.log(posts);

  res.render("dashboard", {
    user: req.user,
    posts: posts,
  });
}

async function postUserPost(req, res) {
  let { title, description } = req.body;
  if (!title || !description) {
    res.redirect("/dashboard");
  }

  const newPost = new Post({
    title,
    description,
  });

  try {
    let user = await User.findById(req.user._id);
    user.posts.push(newPost._id);
    await newPost.save();
    await user.save();
    res.status(200).redirect("/dashboard");
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
    res.redirect("/dashboard");
    //return res.status(500).send({ message: "Post deletion problem" });
  }
  //return res.status(200).send({ message: "Post deleted successfully" });
  res.redirect("/dashboard");
}

module.exports = {
  getUserPosts,
  postUserPost,
  deleteUserPost,
};

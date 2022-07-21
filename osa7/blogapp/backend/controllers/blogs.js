const router = require("express").Router();

const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");

router.get("/", async (request, response) => {
  const notes = await Blog.find({})
    .find({})
    .populate("user", { username: 1, name: 1 });

  response.json(notes);
});

router.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const blog = new Blog({ ...request.body, user: user.id, comments: [] });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  const blogToReturn = await Blog.findById(savedBlog._id).populate("user", {
    username: 1,
    name: 1,
  });

  response.status(201).json(blogToReturn);
});

router.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: "only the creator can delete a blog",
    });
  }

  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", { username: 1, name: 1 });

  response.json(updatedBlog);
});

router.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("comments");
  response.json(blog);
});

router.post("/:id/comments", async (request, response) => {
  const newComment = request.body.comment;
  const id = request.params.id
  const blog = await Blog.findById(id).populate("comments");
  const comment = new Comment({ comment: newComment, blog: id });
  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  await blog.save();
  response.json(savedComment);
});

module.exports = router;

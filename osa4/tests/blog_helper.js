const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Why I never draw Mickey Mouse cartoons',
    author: 'Carl Barks',
    url: "www.disney.com",
    likes: 15,
  },
  {
    title: 'Why I hate mondays',
    author: 'Garfield',
    url: "www.cats.com",
    likes: 353,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}
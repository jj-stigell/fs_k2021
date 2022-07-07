const _ = require('lodash')

const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const amountOfBlogs = (blogs) => blogs.length

const favoriteBlog = (blogs) => {
    let mostLiked = blogs[0]
    blogs.forEach(element => {
        element.likes > mostLiked.likes ? mostLiked = element : 1
    });
    return [mostLiked]
}

const mostBlogs = (blogs) => {
    const mostBlogs = {}
	const grouped = _.groupBy(blogs, blog => blog.author)
	const summedBlogs = _.mapValues(grouped, amountOfBlogs)
    const authorWithMostBlogs = Object.entries(summedBlogs).reduce((a, b) => a[1] > b[1] ? a : b);
    mostBlogs.author = authorWithMostBlogs[0]
    mostBlogs.blogs = authorWithMostBlogs[1]
	return mostBlogs
}

const mostLikes = (blogs) => {
    const mostLikes = {}
	const grouped = _.groupBy(blogs, blog => blog.author)
	const summedAuthor = _.mapValues(grouped, totalLikes)
    const authorWithMostLikes = Object.entries(summedAuthor).reduce((a, b) => a[1] > b[1] ? a : b);
    mostLikes.author = authorWithMostLikes[0]
    mostLikes.likes = authorWithMostLikes[1]
	return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
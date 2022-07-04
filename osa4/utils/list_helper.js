const dummy = (blogs) => {
    // ...
    return 1
}

const totalLikes = (blog) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blog.length === 0
        ? 0
        : blog.reduce(reducer, 0)
}

module.exports = {
    dummy,
    totalLikes
}
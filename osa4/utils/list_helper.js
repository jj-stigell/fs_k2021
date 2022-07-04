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

const favoriteBlog = (blogs) => {
    let mostLiked = blogs[0]
    blogs.forEach(element => {
        element.likes > mostLiked.likes ? mostLiked = element : 1
    });
    return [mostLiked]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
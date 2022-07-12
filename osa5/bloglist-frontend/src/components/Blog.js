const Blog = ({blog}) => (
  <div key={blog._id}>
    <b>Title:</b> {blog.title} <b>Author:</b> {blog.author} <b>Url:</b> {blog.url} <b>Id:</b> {blog._id}
  </div>
)

export default Blog
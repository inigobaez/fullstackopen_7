import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";
import { addNotification } from "../reducers/notificationReducer";

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    dispatch(likeBlog(blog));
    const notification = {
      message: `Blog ${blog.title} updated`,
      type: "success",
    };
    dispatch(addNotification(notification));
  };
  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
      const notification = {
        message: `Blog ${blog.title} deleted`,
        type: "success",
      };
      dispatch(addNotification(notification));
    }
  };
  console.log(blog.title, blog.user.username, user.username);
  return (
    <div style={blogStyle} data-testid="blogItem">
      <div className="blog_header">
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible((prevState) => !prevState)}>
          {detailsVisible ? "hide" : "show"}
        </button>
      </div>
      {detailsVisible && (
        <div className="blog_body">
          <p>{blog.url}</p>
          <p>
            <span data-testid="like">{blog.likes}</span>{" "}
            <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {blog.user.username === user.username && (
            <button onClick={() => handleDeleteBlog(blog)}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;

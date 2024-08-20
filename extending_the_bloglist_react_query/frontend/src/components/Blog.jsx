import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAddNotification } from "../contexts/notificationContext";
import BlogService from "../services/blogs";
import UserContext from "../contexts/userContext";

const Blog = ({ blog }) => {
  const queryClient = useQueryClient();
  const [detailsVisible, setDetailsVisible] = useState(false);
  const addNotification = useAddNotification();
  const [user, dispatchUser] = useContext(UserContext);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const updateBlogMutation = useMutation({
    mutationFn: BlogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updateListOfBlogs = blogs.map((b) =>
        b.id !== updatedBlog.id ? b : updatedBlog,
      );
      queryClient.setQueryData(["blogs"], updateListOfBlogs);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: BlogService.deleteBlog,
    onSuccess: () => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((b) => b.id !== blog.id),
      );
    },
  });

  const handleLike = () => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 });
    const notification = {
      message: `Blog ${blog.title} updated`,
      type: "success",
    };
    addNotification(notification);
  };

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog);
      const notification = {
        message: `Blog ${blog.title} deleted`,
        type: "success",
      };
      addNotification(notification);
    }
  };

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

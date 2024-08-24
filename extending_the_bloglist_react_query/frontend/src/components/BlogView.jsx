import { useContext } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import { useAddNotification } from "../contexts/notificationContext";
import UserContext from "../contexts/userContext";
import BlogService from "../services/blogs";
import Comments from "./Comments";

const BlogView = () => {
  //console.log("rerender blogview");
  const id = useParams().id;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const blog = queryClient.getQueryData(["blogs"]).find((b) => b.id === id);

  const addNotification = useAddNotification();
  const [user, dispatchUser] = useContext(UserContext);
  //console.log(blog);

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
      navigate("/");
    },
  });
  const addCommentMutation = useMutation({
    mutationFn: ({ blogId, comment }) =>
      BlogService.addComment(blogId, comment),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const updateListOfBlogs = blogs.map((b) =>
        b.id !== updatedBlog.id ? b : updatedBlog,
      );
      queryClient.setQueryData(["blogs"], updateListOfBlogs);
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
    <>
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span data-testid="like">{`${blog.likes} likes`}</span>
          <button onClick={handleLike}>like</button>
        </p>
        <p>{`added by ${blog.user.name}`}</p>
        {blog.user.username === user.username && (
          <button onClick={() => handleDeleteBlog(blog)}>Remove</button>
        )}
        <Comments blog={blog} addCommentMutation={addCommentMutation} />
      </div>
    </>
  );
};
export default BlogView;

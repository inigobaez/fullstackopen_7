import { useState, useContext } from "react";
import { useAddNotification } from "../contexts/notificationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "react-bootstrap/Button";
import BlogService from "../services/blogs";

const CreateBlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const addNotification = useAddNotification();

  const newBlogMutation = useMutation({
    mutationFn: BlogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });
  const handleCreateBlog = (event) => {
    event.preventDefault();
    newBlogMutation.mutate({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
    const notification = {
      message: `A new blog ${title} by ${author} added`,
      type: "success",
    };

    addNotification(notification);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            data-testid="title"
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            data-testid="author"
            id="author"
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            data-testid="url"
            id="url"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
      <br />
    </>
  );
};
export default CreateBlogForm;

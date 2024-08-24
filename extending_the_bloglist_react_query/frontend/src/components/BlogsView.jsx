import { useRef } from "react";
import CreateBlogForm from "./CreateBlogForm";
import Toggable from "./Togglable";
import BlogList from "./BlogList";

const BlogsView = ({ user }) => {
  const blogFormRef = useRef();
  return (
    <>
      <Toggable buttonLabel="new Blog" ref={blogFormRef}>
        <CreateBlogForm />
      </Toggable>
      <BlogList user={user} />
    </>
  );
};

export default BlogsView;

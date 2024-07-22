import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  //console.log("rerender blog list with blogs", blogs);
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);
  //console.log(sortedBlogs);
  return (
    <div data-testid="blogList">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default BlogList;

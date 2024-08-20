import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";

import Blog from "./Blog";

const BlogList = ({ user }) => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
    enabled: user !== null,
  });
  if (result.isError || result.isPending) {
    return null;
  }
  const blogs = result.data;
  const sortedBlogs = blogs.slice().sort((a, b) => b.likes - a.likes);

  return (
    <div data-testid="blogList">
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
export default BlogList;

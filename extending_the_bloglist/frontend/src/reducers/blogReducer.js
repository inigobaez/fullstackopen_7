import { createSlice } from "@reduxjs/toolkit";

import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    update(state, action) {
      const updatedBlog = action.payload;
      return state.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    remove(state, action) {
      const deletedBlogId = action.payload;
      console.log("inside removing", deletedBlogId);
      return state.filter((b) => b.id !== deletedBlogId);
    },
  },
});
export const { appendBlog, update, setBlogs, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      ///console.log("ini");
      const blogs = await blogService.getAll();
      //console.log("ini", blogs);
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.log(error);
    }
  };
};
export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlog);
    console.log("created with user?", createdBlog);
    dispatch(appendBlog(createdBlog));
  };
};
export const deleteBlog = (blogToBeDeleted) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogToBeDeleted);
    console.log("blogToBeDeleted", blogToBeDeleted.id);
    dispatch(remove(blogToBeDeleted.id));
  };
};
export const likeBlog = (blogToBeLiked) => {
  return async (dispatch) => {
    const likedBlog = { ...blogToBeLiked, likes: blogToBeLiked.likes + 1 };
    await blogService.update(likedBlog);
    dispatch(update(likedBlog));
  };
};
export default blogSlice.reducer;

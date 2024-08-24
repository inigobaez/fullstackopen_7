import { useState } from "react";
import { useAddNotification } from "../contexts/notificationContext";

const Comments = ({ blog, addCommentMutation }) => {
  //console.log("rerender commments");
  const { id: blogId } = blog;
  //console.log("blogId", blogId);
  const [comment, setComment] = useState("");
  //const queryClient = useQueryClient();
  const addNotification = useAddNotification();

  const handlePostComment = (event) => {
    event.preventDefault();
    addCommentMutation.mutate({ blogId, comment });
    setComment("");
    const notification = {
      message: `Comment "${blog.title}" added`,
      type: "success",
    };
    addNotification(notification);
  };
  //console.log("blog", blog.comments);
  return (
    <div>
      <h5>Comments</h5>
      <form onSubmit={handlePostComment}>
        <input
          type="text"
          name="comment"
          onChange={({ target }) => setComment(target.value)}
          value={comment}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((c, index) => (
          <li key={index}>{c}</li>
        ))}
      </ul>
    </div>
  );
};
export default Comments;

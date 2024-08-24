import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const UserView = () => {
  const id = useParams().id;
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["users"]).find((u) => u.id === id);
  console.log(user);
  return (
    <>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </>
  );
};
export default UserView;

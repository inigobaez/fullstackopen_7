import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import UsersService from "../services/login";

const UsersView = () => {
  const result = useQuery({
    queryKey: ["users"],
    queryFn: UsersService.getAll,
  });
  if (result.isError || result.isPending) {
    return null;
  }
  const users = result.data;
  console.log(users);
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.name}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default UsersView;

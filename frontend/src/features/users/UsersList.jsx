import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";

const Users = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery("UserList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  console.log(error);
  let content;
  if (isLoading) {
    console.log("loading...");
    content = <p>Loading...</p>;
  } else if (isError) {
    console.log("error");
    content = <p className="errmsg">{error.data?.message}</p>;
  } else if (isSuccess) {
    console.log(users, "hello users");
    const { ids } = users;
    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;
    content = (
      <table className="table table-users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__role">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
  return content;
};

export default Users;

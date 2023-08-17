import { useParams } from "react-router-dom";
import { selectUserById, useGetUsersQuery } from "./usersApiSlice";
import { useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";
import ClipLoader from "react-spinners/ClipLoader";
import { override } from "../notes/EditNote";

const EditUser = () => {
  const { id } = useParams();
  // const user = useSelector((state) => selectUserById(state, id));
  const { user } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });
  console.log(user, "suer");
  let content = user ? (
    <EditUserForm user={user} />
  ) : (
    <ClipLoader
      color={"#00000"}
      loading={true}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
  return content;
};

export default EditUser;

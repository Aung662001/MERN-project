import { useParams } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";
import { useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";
const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));
  let content = user ? <EditUserForm user={user} /> : <p>Loading...</p>;
  return content;
};

export default EditUser;

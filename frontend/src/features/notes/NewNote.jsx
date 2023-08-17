import { useSelector } from "react-redux";
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";
import { override } from "./EditNote";
import ClipLoader from "react-spinners/ClipLoader";
const NewNote = () => {
  // const users = useSelector((state) => selectAllUsers(state));
  const { users } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      users: data?.entities,
    }),
  });
  // const users = Object.values(usersWithEntities);
  if (!users) {
    return (
      <ClipLoader
        color={"#00000"}
        loading={true}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (!Object.values(users).length) return <p>Not Currently Avaiable</p>;
  const content = <NewNoteForm users={Object.values(users)} />;
  return content;
};

export default NewNote;

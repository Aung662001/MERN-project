import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers, useGetUsersQuery } from "../users/usersApiSlice";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import ClipLoader from "react-spinners/ClipLoader";
export const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "auto",
  borderColor: "white",
};
const EditNote = () => {
  const { id } = useParams();
  // const note = useSelector((state) => selectNoteById(state, id));
  // const users = useSelector((state) => selectAllUsers(state));
  const { note } = useGetNotesQuery("getNotes", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });
  const { users } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      users: data?.entities,
    }),
  });
  const content =
    note && users ? (
      <EditNoteForm note={note} users={Object.values(users)} />
    ) : (
      <p>
        <ClipLoader
          color={"#00000"}
          loading={true}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
    );
  return content;
};

export default EditNote;

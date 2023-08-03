import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersApiSlice";
import { selectNoteById } from "./notesApiSlice";
import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
const EditNote = () => {
  const { id } = useParams();
  const note = useSelector((state) => selectNoteById(state, id));
  const users = useSelector((state) => selectAllUsers(state));
  const content =
    note && users ? (
      <EditNoteForm note={note} users={users} />
    ) : (
      <p>Loading...</p>
    );
  return content;
};

export default EditNote;

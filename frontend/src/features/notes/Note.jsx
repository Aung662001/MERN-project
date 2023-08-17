import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { selectNoteById, useGetNotesQuery } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
const Note = ({ noteId }) => {
  // const note = useSelector((state) => selectNoteById(state, noteId));
  //change in prefetch =>subscribe manully to build in function
  //so change to above useSelector to useGetNotesQuery
  const { note } = useGetNotesQuery("nodesList", {
    selectFromResult: ({ data }) => ({ note: data?.entities[noteId] }),
  });

  const navigate = useNavigate();
  if (note) {
    const created = new Date(note.createdAt).toLocaleString();
    const updated = new Date(note.updatedAt).toLocaleString();
    const handleEdit = () => navigate(`./${noteId}`);

    return (
      <tr className="table__row">
        <td className="table__cell note__status">
          {note.completed ? (
            <span className="note__status--complete">Complete</span>
          ) : (
            <span className="note__status--open">Open</span>
          )}
        </td>
        <td className="table__cell note__created">{created}</td>
        <td className="table__cell note__updated">{updated}</td>
        <td className="table__cell note__title">{note.title}</td>
        <td className="table__cell note__owner">{note.username}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else {
    return null;
  }
};
const memorizedNote = memo(Note);
export default memorizedNote;

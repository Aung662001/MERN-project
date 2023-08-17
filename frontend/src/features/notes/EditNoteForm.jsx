import React, { useEffect, useState } from "react";
import { useDeleteNoteMutation, useUpdateNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { selectUserById, useGetUsersQuery } from "../users/usersApiSlice";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
//note and all users
const EditNoteForm = ({ note, users }) => {
  console.log(note, users);
  const { isManager, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [
    deleteNote,
    {
      isLoading: delIsLoading,
      isError: delIsError,
      isSuccess: delIsSuccess,
      error: delError,
    },
  ] = useDeleteNoteMutation();
  const [updateNote, { isError, isLoading, isSuccess, error }] =
    useUpdateNoteMutation();
  const { user: Id } = note;
  // const connectedUser = useSelector((state) => selectUserById(state, Id));
  const { connectedUser } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data }) => ({
      connectedUser: data?.entities[Id],
    }),
  });
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(connectedUser.id);

  useEffect(() => {
    if (isSuccess || delIsSuccess) {
      console.log("useEffect");
      setText("");
      setTitle("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, delIsSuccess, navigate]);
  const option = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const onUserChange = (e) => {
    setUserId(e.target.value);
  };
  const onCompleteChange = () => {
    setCompleted((completed) => !completed);
  };
  const userClickSubmit = async () => {
    await updateNote({ id: note.id, title, text, user: userId, completed });
  };
  const onUserDeleteClick = async () => {
    await deleteNote({ id: note.id });
  };
  const canSave = [title, text, userId].every(Boolean) && !isLoading;
  const errorContent = (error?.data?.message || delError?.data?.message) ?? "";
  const validateTitleClass = !title ? "form__input--incomplete" : "";
  const validateTextClass = !text ? "form__input--incomplete" : "";
  const content = (
    <>
      <p className={`${errorContent}`}>{error?.data?.message}</p>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Note {note.ticket}</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              disabled={!canSave}
              title="Save"
              onClick={userClickSubmit}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {(isManager || isAdmin) && (
              <button
                className="icon-button"
                title="Delete"
                onClick={onUserDeleteClick}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            )}
          </div>
        </div>

        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className={`form__input ${validateTitleClass}`}
          name="title"
          id="title"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="text" className={`form-lable `}>
          Content:
        </label>
        <input
          type="text"
          id="text"
          name="text"
          className={`form__input ${validateTextClass}`}
          value={text}
          onChange={onTextChange}
        />

        <label htmlFor="user" className="form__label">
          User:
        </label>
        <select
          name="user"
          id="user"
          className={`form__select `}
          value={userId}
          onChange={onUserChange}
        >
          {option}
        </select>

        <label
          htmlFor="active"
          className="form__label form__checkbox-container"
        >
          COMPLETE:
          <input
            type="checkbox"
            className="form__checkbox"
            id="active"
            name="active"
            checked={completed}
            onChange={onCompleteChange}
          />
        </label>
      </form>
      <div
        style={{
          marginTop: "20px",
          gap: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
      </div>
    </>
  );
  return content;
};

export default EditNoteForm;

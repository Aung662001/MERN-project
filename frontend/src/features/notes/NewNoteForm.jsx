import React, { useState } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const NewNoteForm = ({ users }) => {
  const navigate = useNavigate();
  const [newNote, { isError, isSuccess, isLoading, error }] =
    useAddNewNoteMutation();

  const [userId, setUserId] = useState(users[0].id);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const option = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });
  const userClickSubmit = async (e) => {
    e.preventDefault();
    await newNote({ user: userId, title, text });
    navigate("/dash/notes");
  };
  const canSave = [title, text, userId].every(Boolean) && !isLoading;
  const errorClass = isError ? "errmsg" : "offscreen";
  const validateTitleClass = !title ? "form__input--incomplete" : "";
  const validateTextClass = !text ? "form__input--incomplete" : "";

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const onTextChange = (e) => {
    setText(e.target.value);
  };
  const onUserChange = (e) => {
    setUserId(e.target.value);
  };
  const content = (
    <>
      <p className={`${errorClass}`}>{error?.data?.message}</p>
      <form className="form" onSubmit={(e) => userClickSubmit(e)}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="icon-button" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
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
      </form>
    </>
  );
  return content;
};

export default NewNoteForm;

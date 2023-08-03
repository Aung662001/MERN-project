import { useEffect, useState } from "react";
import { useDeleteUserMutation, useUpdateUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ROLE } from "../../config/role";
import { PASSWORD_REGEX, USER_REGEX } from "./NewUserForm";
import React from "react";

const EditUserForm = ({ user }) => {
  const navigate = useNavigate();
  const [
    deleteUser,
    {
      isError: isDelError,
      isLoading: isDelLoading,
      isSuccess: isDelSuccess,
      error: delError,
    },
  ] = useDeleteUserMutation();
  const [updateUser, { isError, isLoading, isSuccess, error }] =
    useUpdateUserMutation();
  const [username, setusername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [validusername, setValidusername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState([...user.roles]);
  const [active, setActive] = useState(user.active);
  const [showPass, setShowPass] = useState(false);
  useEffect(() => {
    setValidusername(USER_REGEX.test(username));
  }, [username]);
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  //if complete opration navigate to users route
  useEffect(() => {
    if (isDelSuccess | isSuccess) {
      setusername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, isDelSuccess, navigate]);
  const onActiveChange = () => setActive((active) => !active);
  const onUserSaveClick = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active });
    } else {
      await updateUser({ id: user.id, username, active, roles });
    }
  };
  const onUserDeleteClick = async () => {
    await deleteUser({ id: user.id });
  };
  const onUserChange = (e) => {
    setusername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onRolesChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(value);
  };
  let canSave;
  if (password) {
    canSave =
      [validusername, validPassword, roles.length].every(Boolean) && !isLoading;
  } else {
    canSave = [validusername, roles.length].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validUserClass = validusername ? "" : "form__input--incomplete";
  const validPasswordClass = validPassword ? "" : "form__input--incomplete";
  const validRoleClass = roles.length ? "" : "form__input--incomplete";

  const errorContent = (error?.data?.message || delError?.data?.message) ?? "";
  const options = Object.values(ROLE).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });
  const content = (
    <>
      <p className={errClass}>{errorContent}</p>

      <form action="" className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
              onClick={onUserSaveClick}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Save"
              onClick={onUserDeleteClick}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        <label htmlFor="username" className="form-label">
          username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          type="text"
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          autoComplete="off"
          value={username}
          onChange={onUserChange}
        />
        <label htmlFor="password" className="form__label">
          Password: <span className="nowrap">[4-12 chars including !@#$%]</span>
        </label>
        <input
          type={showPass ? "text" : "password"}
          className={`form__input ${validPasswordClass}`}
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
        />
        <span style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            className="form__checkbox"
            style={{
              position: "relative",
              textAlign: "left",
              marginRight: "10px",
            }}
            id="showpass"
            name="showpass"
            checked={showPass}
            onChange={() => setShowPass(!showPass)}
          />
          <label htmlFor="showpass">Show Password</label>
        </span>
        <label
          htmlFor="active"
          className="form__label form__checkbox-container"
        >
          ACTIVE:
          <input
            type="checkbox"
            className="form__checkbox"
            id="active"
            name="active"
            checked={active}
            onChange={onActiveChange}
          />
        </label>

        <label htmlFor="roles" className="form-label">
          ASSIGNED ROLES:
        </label>
        <select
          type="text"
          className={`form__select ${validRoleClass}`}
          name="roles"
          id="roles"
          value={roles}
          onChange={onRolesChange}
          multiple
          size={"3"}
        >
          {options}
        </select>
      </form>
    </>
  );
  return content;
};

export default EditUserForm;

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROLE } from "../../config/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewUserMutation } from "./usersApiSlice";

export const USER_REGEX = /^[A-z]{3,30}$/;
export const PASSWORD_REGEX = /^[A-z0-9!@#$%&]{4,12}$/;
const NewUserForm = () => {
  const navigate = useNavigate();
  const [addNewUser, { isError, isLoading, isSuccess, error }] =
    useAddNewUserMutation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUserName(USER_REGEX.test(userName));
  }, [userName]);
  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);
  useEffect(() => {
    if (isSuccess) {
      setUserName("");
      setPassword("");
      setRoles([]);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);
  const onUserChange = (e) => setUserName(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);
  const onRoleChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(value);
  };
  const canSave = [roles.length, validPassword, validUserName].every(Boolean);
  const onUserSaveClick = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ username: userName, password, roles });
    }
  };
  const options = Object.values(ROLE).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUserName ? "form__input--incomplete" : "";
  const validPasswordClass = !validPassword ? "form__input--incomplete" : "";
  const validRoleClass = !roles.length ? "form__input--incomplete" : "";
  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form action="" className="form" onSubmit={onUserSaveClick}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button className="icon-button" title="Save" disabled={!canSave}>
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label htmlFor="username" className="form-label">
          UserName: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          type="text"
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          autoComplete="off"
          value={userName}
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
        <span>
          <input
            type="checkbox"
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

        <label htmlFor="roles" className="form-label">
          ASSIGNED ROLES:
        </label>

        <select
          type="text"
          className={`form__select ${validRoleClass}`}
          name="roles"
          id="roles"
          value={roles}
          onChange={onRoleChange}
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

export default NewUserForm;

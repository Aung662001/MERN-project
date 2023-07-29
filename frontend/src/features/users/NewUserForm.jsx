import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROLE } from "../../config/role";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useAddNewUserMutation } from "./usersApiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const NewUserForm = () => {
  const navigate = useNavigate();
  const [addNewUser, { isError, isLoading, isSuccess, error }] =
    useAddNewUserMutation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState(["Employee"]);
  const USER_REGEX = /^[A-z]{3,30}$/;
  const PASSWORD_REGEX = /^[A-z0-9!@#$%&]{4,12}$/;

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
      setRole([]);
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
    setRole(value);
  };
  const canSave = [role.length, validPassword, validUserName].every(Boolean);
  const onUserSaveClick = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ userName, password, role });
    }
  };
  return <div>NewUserForm</div>;
};

export default NewUserForm;

import { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";
import Persist from "../../hooks/Persist";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = Persist();
  const [login, { isLoading }] = useLoginMutation();
  const errClass = errMsg ? "errmsg" : "offscreen";
  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username: userName, password });
      if (response.error) {
        setErrMsg(response?.error?.data?.message);
      } else {
        const { data } = response;
        const { accessToken } = data;
        console.log(accessToken);
        dispatch(setCredentials({ accessToken }));
        setUserName("");
        setPassword("");
        navigate("/dash");
      }
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Servrer Response.");
      }
      if (err.status === 400) {
        setErrMsg("User And Password are required.");
      }
      if (err.status === 401) {
        setErrMsg("Unautorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };
  const onUserChange = (e) => {
    setUserName(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onToogle = () => setPersist((prev) => (prev = !prev));
  const content = (
    <section className="public" style={{ flexGrow: 1 }}>
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login ">
        <p className={errClass} ref={errRef} aria-live="assertive">
          {errMsg}
        </p>
        <form action="" className="form" onSubmit={handlerSubmit}>
          <label htmlFor="username">UserName:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            name="username"
            ref={userRef}
            value={userName}
            onChange={onUserChange}
            autoComplete="off"
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            value={password}
            onChange={onPasswordChange}
            id="password"
            name="password"
          />
          <button className="form__submit-button">Sign In</button>
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              onChange={onToogle}
              checked={persist}
              id="persist"
              name="persist"
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
  return content;
};

export default Login;

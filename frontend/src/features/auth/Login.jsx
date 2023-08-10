import { useRef, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const errClass = errMsg ? "errmsg" : "offscreen";
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const handlerSubmit = () => {};
  const onUserChange = () => {};
  const onPasswordChange = () => {};
  const content = (
    <section className="public">
      <header>
        <h1>Employee Login</h1>
      </header>
      <main className="login">
        <p className={errClass}>{errMsg}</p>
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
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
  return <div style={{ marginTop: "3rem" }}>{content}</div>;
};

export default Login;

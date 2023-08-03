import { Link } from "react-router-dom";

const Welcome = () => {
  const today = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());
  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <p>
        <Link to={"/dash/notes"}>View techNotes</Link>
      </p>
      <p>
        <Link to={"/dash/users"}>View User Setting</Link>
      </p>
      <p>
        <Link to={"/dash/users/new"}>Create New User </Link>
      </p>
      <p>
        <Link to={"/dash/notes/new"}>Create New Note </Link>
      </p>
    </section>
  );
  return content;
};

export default Welcome;

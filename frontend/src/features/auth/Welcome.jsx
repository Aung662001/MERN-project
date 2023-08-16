import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
  const { isAdmin, isManager, username } = useAuth();
  const today = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());
  const content = (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome {username}!</h1>
      <p>
        <Link to={"/dash/notes"}>View techNotes</Link>
      </p>
      <p>
        <Link to={"/dash/users"}>View User Setting</Link>
      </p>
      {(isManager || isAdmin) && (
        <p>
          <Link to={"/dash/users/new"}>Create New User </Link>
        </p>
      )}
      {(isManager || isAdmin) && (
        <p>
          <Link to={"/dash/notes/new"}>Create New Note </Link>
        </p>
      )}
    </section>
  );
  return content;
};

export default Welcome;

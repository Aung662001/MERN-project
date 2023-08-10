import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const DashHeader = () => {
  const navigate = useNavigate();
  const { pathName } = useLocation();
  const [sendLogout, { isError, isSuccess, isLoading, error }] =
    useSendLogoutMutation();
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  if (isLoading) {
    return <p>Loging out..</p>;
  }
  if (isError) {
    console.log(error);
    return <p>Error:{error.data?.message}</p>;
  }
  let dashClass = null;
  if (
    !DASH_REGEX.test(pathName) &&
    !NOTES_REGEX.test(pathName) &&
    !USERS_REGEX.test(pathName)
  ) {
    dashClass = "dash-header__container--small";
  }
  const logoutButton = (
    <button className="icon-button" title="logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to="/dash">
          <h1 className="dash-headerd__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* nav items */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;

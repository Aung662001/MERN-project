import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faUserPlus,
  faUser,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;
const DashHeader = () => {
  const { isManger, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isError, isSuccess, isLoading, error }] =
    useSendLogoutMutation();
  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);
  const onNewNoteClick = () => navigate("/dash/notes/new");
  const onNewUserClick = () => navigate("/dash/users/new");
  const onNotesClick = () => navigate("/dash/notes");
  const onUsersClick = () => navigate("/dash/users");

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );
  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button className="icon-button" title="New Note" onClick={onNewNoteClick}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }
  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button className="icon-button" title="New User" onClick={onNewUserClick}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }
  let usersButton = null;
  if (isManger || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      usersButton = (
        <button className="icon-button" title="Users" onClick={onUsersClick}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      );
    }
  }
  let notesButton = null;
  if (isAdmin || isManger) {
    if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
      notesButton = (
        <button className="icon-button" title="Notes" onClick={onNotesClick}>
          <FontAwesomeIcon icon={faFile} />
        </button>
      );
    }
  }
  const errClass = isError ? "errmsg" : "offscreen";
  let navButton;
  if (isLoading) {
    navButton = <p>Logging Out...</p>;
  } else {
    navButton = (
      <>
        {notesButton}
        {usersButton}
        {newUserButton}
        {newNoteButton}
        {logoutButton}
      </>
    );
  }
  return (
    <>
      <p className={`${errClass}`}>{error?.data?.message}</p>
      <header className="dash-header">
        <div className={`dash-header__container ${dashClass}`}>
          <Link to="/dash">
            <h1 className="dash-headerd__title">techNotes</h1>
          </Link>
          <nav className="dash-header__nav">{navButton}</nav>
        </div>
      </header>
    </>
  );
};

export default DashHeader;

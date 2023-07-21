import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const goHomeClick = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        title="Home"
        onClick={goHomeClick}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
    );
  }
  const content = (
    <footer className="dash_footer">
      <p>Current User:</p>
      <p>Status:</p>
      {goHomeButton}
    </footer>
  );
  return content;
};

export default DashFooter;

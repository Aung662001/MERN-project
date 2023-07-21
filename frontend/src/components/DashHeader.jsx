import { Link } from "react-router-dom";

const DashHeader = () => {
  return (
    <header>
      <div className="dash-header__container">
        <Link to="/dash/notes">
          <h1 className="dash-headerd__title">techNotes</h1>
        </Link>
        <nav className="dash-header__nav">{/* nav items */}</nav>
      </div>
    </header>
  );
};

export default DashHeader;

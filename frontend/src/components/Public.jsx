import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";

const Public = () => {
  useTitle("Phone Doctor");
  const content = (
    <section className="public">
      <header>
        <h1>
          Wellcome to <span className="nowrap"> Phone Doctor. Repair!</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in most convient for travel, Hlae dan Center , Phone Doctor
          already have many doctors that know all about your phone!
        </p>
        <address className="public__addr">
          Phone Doctor Repair!
          <br />
          Nort of HlaeDan Center
          <br />
          On BahoRoad, 69 A,
          <br />
          <a href="tel:+959753912127">09 753 912 127</a>
        </address>
        <br></br>
        <p>Owner : U Aung</p>
      </main>
      <footer>
        <Link to="login">Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;

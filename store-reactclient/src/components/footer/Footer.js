import "./footer.css";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <img className="footer-logo-img" alt="asd " src={logo} />
        <div className="copyrights">Copyrights - 2019</div>
      </div>
    </footer>
  );
}

export default Footer;

import { useNavigate } from "react-router-dom";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header" onClick={() => navigate("/")}>
      <h1>Balderdash </h1>
      <h1>Beyond Pen and Paper</h1>
    </header>
  );
}

export default Header;

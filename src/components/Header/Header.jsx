import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return <header onClick={() => navigate("/")}>Site Header</header>;
}

export default Header;

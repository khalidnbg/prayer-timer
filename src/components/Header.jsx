import { Link } from "react-router-dom";

const headerStyles = {
  // width: "100%",
  Width: "800px",
  margin: "auto",
  marginBottom: "30px",
  marginTop: "30px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#333",
  color: "#fff",
  fontWeight: "bold",
};

const linkStyles = {
  color: "#fff",
  textDecoration: "none",
  marginRight: "20px",
  fontWeight: "bold",
};

export default function Header() {
  return (
    <div style={headerStyles}>
      <Link to="/" style={linkStyles}>
        NBG Prayer
      </Link>
      <div>
        <Link to="/" style={linkStyles}>
          Home
        </Link>
        <Link to="/about" style={linkStyles}>
          About
        </Link>
      </div>
    </div>
  );
}

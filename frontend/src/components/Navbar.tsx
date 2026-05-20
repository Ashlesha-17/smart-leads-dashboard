import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h3>Smart Leads</h3>

      <button onClick={logout} style={styles.btn}>
        Logout
      </button>
    </div>
  );
}

const styles: any = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "#4f46e5",
    color: "white",
  },
  btn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Navbar.css";

function Navbar() {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    if (localStorage.getItem("token")) {
      fetchFavorites();
    }
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await API.get("/favorites");
      setFavoriteCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // simple way since no context
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {user ? (
        <>
          <Link to="/favorites" className="favorites-link">
            Favorites
            {favoriteCount > 0 && (
              <span className="badge">{favoriteCount}</span>
            )}
          </Link>

          <Link to="/add-product" className="add-product-btn">
            ➕ Add Product
          </Link>

          <Link to="/profile" className="profile-link">
            👤 {user.name}
          </Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;

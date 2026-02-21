import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (!token) return;

      try {
        const { data } = await API.get("/favorites");
        const exists = data.find(
          (item) => item._id === product._id
        );
        if (exists) setIsFavorite(true);
      } catch (err) {
        console.log(err);
      }
    };

    checkIfFavorite();
  }, [token, product._id]);

  const toggleFavorite = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      if (isFavorite) {
        await API.delete(`/favorites/${product._id}`);
        setIsFavorite(false);
      } else {
        await API.post(`/favorites/${product._id}`);
        setIsFavorite(true);
      }

      window.dispatchEvent(new Event("favoritesUpdated"));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await API.delete(`/products/${product._id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIXED IMAGE PATH
  const imageUrl =
  product.images && product.images.length > 0
    ? `http://localhost:3000${product.images[0]}`
    : "https://via.placeholder.com/300";

    <img src={imageUrl} alt={product.title} />

  return (
    <div
      className="product-card"
      onClick={() => navigate(`/product/${product._id}`)}
      style={{ cursor: "pointer" }}
    >
      <img src={imageUrl} alt={product.title} />

      <h3>{product.title}</h3>
      <p>${product.price}</p>

      <button
        className={`favorite-btn ${isFavorite ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <div className="product-actions">
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/edit-product/${product._id}`);
          }}
        >
          ✏️ Edit
        </button>

        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

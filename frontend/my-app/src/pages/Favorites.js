import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

function Favorites() {
  const [favorites, setFavorite] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const { data } = await API.get("/favorites");
      setFavorite(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>My Favorite Products</h2>

      {favorites.length === 0 ? (
        <p>No favorite products yet.</p>
      ) : (
        <div className="products-grid">
          {favorites.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

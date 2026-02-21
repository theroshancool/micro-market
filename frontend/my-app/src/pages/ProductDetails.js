import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading">Loading product...</p>;
  if (!product) return <p className="error">Product not found</p>;

  return (
    <div className="details-container">
      <div className="details-images">
        {product.images && product.images.length > 0 ? (
          product.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:3000${img}`}
              alt={product.title}
            />
          ))
        ) : (
          <img
            src="https://via.placeholder.com/500"
            alt="No product"
          />
        )}
      </div>

      <div className="details-info">
        <h2 className="details-title">{product.title}</h2>
        <h3 className="details-price">${product.price}</h3>

        <p className="details-description">
          {product.description || "No description available."}
        </p>

        <button className="buy-btn">Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetails;
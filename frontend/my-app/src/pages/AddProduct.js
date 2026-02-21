import { useNavigate } from "react-router-dom";
import API from "../api";
import "./AddProduct.css";
import { useState } from "react";

function AddProduct() {
  const navigate = useNavigate();

  // 🔥 REMOVE image from form
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  // 🔥 NEW state for file
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (!form.title || !form.price || !image) {
    setError("Please fill all required fields");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("image", image); // ✅ FIXED

    await API.post("/products", formData, {
      headers:{
        "Content-Type": "multipart/form-data",
      }
    })
  

    navigate("/");
  } catch (err) {
    setError("Failed to add product");
  }
};

  return (
    <div className="add-container">
      <form className="add-card" onSubmit={handleSubmit}>
        <h2>Add New Product</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Product Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        {/* 🔥 CHANGE THIS INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;

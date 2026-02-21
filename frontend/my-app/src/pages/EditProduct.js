import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const { data } = await API.get(`/products/${id}`);
    setForm(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(`/products/${id}`, form);
    navigate("/");
  };

  return (
    <div className="add-container">
      <form className="add-card" onSubmit={handleSubmit}>
        <h2>Edit Product</h2>

        <input
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <textarea
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditProduct;

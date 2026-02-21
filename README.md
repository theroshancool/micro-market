Here’s a clean **README.md** for your Micro Marketplace App project with React frontend + Node.js + Multer backend:

---

# 🛒 Micro Marketplace App

live - https://micro-market-frontend.onrender.com/

A simple marketplace application built with **React** for the frontend and **Node.js/Express** for the backend.
Supports product creation with **image uploads** using **Multer** and REST API integration.

---

## 🔹 Features

* Add products with **title, price, description, and image**
* Image upload handled with **Multer**
* Single-page React frontend with form validation
* Backend API with **Express.js**
* Navigation between pages using **React Router**
* Stores uploaded images locally (`/uploads` folder)

---

## 🔹 Tech Stack

| Frontend | Backend           | Database         | Other                 |
| -------- | ----------------- | ---------------- | --------------------- |
| React.js | Node.js + Express | MongoDB / SQLite | Axios, Multer, Router |

---

## 🔹 Installation

### Backend

```bash
cd backend
npm install
```

* Create `uploads/` folder in the backend root to store product images.
* Run the server:

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000` by default.

---

## 🔹 API Endpoints

### POST `/products`

* Create a new product
* Accepts `multipart/form-data`
* Fields:

| Field       | Type   | Required |
| ----------- | ------ | -------- |
| title       | string | ✅        |
| price       | number | ✅        |
| description | string | ❌        |
| image       | file   | ✅        |

**Example:**

```javascript
const formData = new FormData();
formData.append("title", "Sample Product");
formData.append("price", 100);
formData.append("description", "This is a sample product");
formData.append("image", selectedFile);

axios.post("/products", formData);
```

---

## 🔹 Folder Structure

```
Micro-Marketplace-App/
│
├─ backend/
│  ├─ src/
│  │  ├─ controllers/
│  │  │   └─ productController.js
│  │  ├─ middleware/
│  │  │   └─ auth.js
│  │  └─ routes/
│  │      └─ productRoutes.js
│  └─ uploads/
│
├─ frontend/
│  ├─ src/
│  │  ├─ api.js
│  │  ├─ components/
│  │  │   └─ AddProduct.js
│  │  └─ App.js
│
└─ README.md
```

---

## 🔹 Notes / Tips

* Ensure **frontend field name** matches backend multer field name (`image`)
* Do **not** manually set `Content-Type` in Axios for multipart forms
* Create `uploads/` folder before starting backend
* Can extend to multiple images with `upload.array()` in backend

---

## 🔹 License

MIT License


import mongoose from "mongoose";
import Product from "./src/models/Product.js";
import User from "./src/models/userModel.js";
import "dotenv/config";

await mongoose.connect(process.env.MONGO_URI);

await Product.deleteMany();
await User.deleteMany();

await User.create([
  {
    name: "Roshan",
    email: "roshan@test.com",
    password: "123456",
  },
  {
    name: "Admin",
    email: "admin@test.com",
    password: "123456",
  },
]);

await Product.insertMany([
  { title: "iPhone 15", price: 999, description: "Apple phone", image: "img1" },
  { title: "Samsung S24", price: 850, description: "Samsung phone", image: "img2" },
  { title: "Laptop", price: 1200, description: "Gaming laptop", image: "img3" },
  { title: "Watch", price: 300, description: "Smart watch", image: "img4" },
  { title: "Headphones", price: 150, description: "Noise cancelling", image: "img5" },
  { title: "Keyboard", price: 90, description: "Mechanical", image: "img6" },
  { title: "Mouse", price: 60, description: "Gaming mouse", image: "img7" },
  { title: "Camera", price: 700, description: "DSLR camera", image: "img8" },
  { title: "Tablet", price: 400, description: "Android tablet", image: "img9" },
  { title: "Speaker", price: 200, description: "Bluetooth speaker", image: "img10" },
]);

console.log("Seed data inserted");
process.exit();

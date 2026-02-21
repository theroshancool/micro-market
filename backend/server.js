import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import morgan from "morgan";



app.use(morgan("dev"));


// dotenv configuration
dotenv.config();


// database connection
connectDB();

// Port
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
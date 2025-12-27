import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { dbconnect } from "./db/db.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

dbconnect();


//routes
import vehicleRoutes from "./routes/vehicle.routes.js";
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";

app.use('/api/vehicles', vehicleRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

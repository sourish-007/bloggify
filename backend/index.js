import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { ConnectDB } from "./src/lib/db.js";
import userRoutes from "./src/routes/user.route.js";
import blogRoutes from "./src/routes/blog.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://bloggify-1-qx7w.onrender.com",
  credentials: true,
}));



app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  ConnectDB();
});
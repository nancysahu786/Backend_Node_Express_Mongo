// require old way
// const express = require("express");
// new way is using import for that add type module in pakage json
import express from "express";
import connectToDB from "./database/mongodb.js";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user-route.js";
import TheatreRoutes from "./routes/theatre.route.js";
import MovieRoutes from "./routes/movie.route.js";
import ShowRoutes from "./routes/show-route.js";
import BookingRoutes from "./routes/booking.route.js";
import "dotenv/config";
import cors from "cors";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());

//apis
app.use("/api/user", userRoutes);
app.use("/api/theatre", TheatreRoutes);
app.use("/api/movie", MovieRoutes);
app.use("/api/show", ShowRoutes);
app.use("/api/booking", BookingRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
  connectToDB();
});

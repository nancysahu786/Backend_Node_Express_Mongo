// require old way
// const express = require("express");
// new way is using import for that add type module in pakage json
import express from "express";
import blogRoutes from "./routes/blog-route.js";
import connectToDB from "./database/mongodb.js";
import { renderBlogById, renderBlogs } from "./controllers/blog.controller.js";
import Blog from "./model/blog.model.js";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/user-route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

app.use("/api/blog", blogRoutes);

app.get("/blog/list", async (req, res) => {
  const data = await Blog.find({});
  res.render("blogList", { blogs: data });
});

app.get("/blog/:blogId", renderBlogById);

app.use("/api/user", userRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
  connectToDB();
});

// require old way
// const express = require("express");
// new way is using import for that add type module in pakage json
import express from "express";
import blogRoutes from "./routes/blog-route.js";
const app = express();

app.use(express.json());
app.use("/api/blog", blogRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});

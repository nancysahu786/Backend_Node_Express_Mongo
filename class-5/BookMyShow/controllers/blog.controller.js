import fs from "fs";
import Blog from "../model/blog.model.js";
// import from '../view/blogList.ejs'

export const getAllBlog = async (req, res) => {
  try {
    const blogData = await Blog.find({});
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogData = await Blog.findById(blogId);
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogData = await Blog.findByIdAndDelete(blogId);
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createBlog = async (req, res) => {
  try {
    const newBlogData = req.body;
    const data = await Blog.create(newBlogData);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const newBlogData = req.body;
    const blogId = req.params.blogId;
    const blogData = await Blog.updateOne(
      { _id: blogId },
      { $set: newBlogData }
    );
    res.status(200).send(blogData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const renderBlogs = async (req, res) => {
  const data = await Blog.find({});
  res.render("blogList", { blogs: data });
};

export const renderBlogById = async (req, res) => {
  const data = await Blog.findById(req.params.blogId);
  res.render("blogById", { blog: data });
};

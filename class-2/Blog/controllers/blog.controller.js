import fs from "fs";

export const getAllBlog = (req, res) => {
  try {
    const blogData = fs.readFileSync("mocks/blog.mock.json");
    res.status(200).send(JSON.parse(blogData));
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getBlogById = (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogData = fs.readFileSync("mocks/blog.mock.json");
    const blogDataById = JSON.parse(blogData).find((blog) => blog.id == blogId);
    res.status(200).send(blogDataById);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteBlogById = (req, res) => {
  try {
    const blogId = req.params.blogId;
    const blogData = JSON.parse(fs.readFileSync("mocks/blog.mock.json"));
    const blogIndexOfBlogById = blogData.findIndex((blog) => blog.id == blogId);

    blogData.splice(blogIndexOfBlogById, 1);
    fs.writeFileSync("mocks/blog.mock.json", JSON.stringify(blogData));
    res.status(200).send("Blog deleted successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const createBlog = (req, res) => {
  try {
    const newBlogData = req.body;
    let blogData = JSON.parse(fs.readFileSync("mocks/blog.mock.json"));
    blogData = [...blogData, newBlogData];
    fs.writeFileSync("mocks/blog.mock.json", JSON.stringify(blogData));
    res.status(200).send("Blog created successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateBlog = (req, res) => {
  try {
    const newBlogData = req.body;
    const blogId = req.params.blogId;
    let blogData = JSON.parse(fs.readFileSync("mocks/blog.mock.json"));
    const blogIndexOfBlogById = blogData.findIndex((blog) => blog.id == blogId);

    blogData[blogIndexOfBlogById] = {
      ...blogData[blogIndexOfBlogById],
      ...newBlogData,
    };
    fs.writeFileSync("mocks/blog.mock.json", JSON.stringify(blogData));
    res.status(200).send("Blog updated successfully!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

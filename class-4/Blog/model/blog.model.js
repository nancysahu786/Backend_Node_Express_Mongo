import mongoose, { model } from "mongoose";

// schema is used to define the structure of collection
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [10, "Minimum 10 characters are required"],
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

// blog is a collection
// using model we get crud operations
const Blog = model("blog", blogSchema);

export default Blog;

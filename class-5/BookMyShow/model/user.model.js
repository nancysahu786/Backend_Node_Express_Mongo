import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: [3, "Min length 3"],
    maxLength: [10, "Max length 10"],
    // when we try to fetch the user data the we don't get password as response for security
    // so we use select false here
    select: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
});

//ecypting passsword using bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hassedPassword = await bcrypt.hash(user.password, salt);
  user.password = hassedPassword;
  next();
});

const user = model("users", userSchema);
export default user;

import mongoose, { model } from "mongoose";
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
});

// here pre is middleware
// it is used to make changes in data before it gets save or created in db
// here using pre hook we are doing encryption in password before saving it in db
userSchema.pre("save", function (next) {
  const user = this;
  console.log(user);

  user.password = user.password + "-encrypt";
  next();
});

const user = model("user", userSchema);
export default user;

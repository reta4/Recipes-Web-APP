import mongoose from "mongoose";
//...................................................................................................

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: [4, "please enter a user name that at least 4 checkers"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
      minlength: [6, "password have to 6 long characters"],
    },
    role: {
      type: String,
      default: "user",
    },
    idAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//...................................................................................................
const User = mongoose.model("User", userSchema);
export default User;

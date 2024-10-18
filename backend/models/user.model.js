import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address", // Custom error message for invalid email
      ],
    },
    password: { type: String, required: true, minLength: 8 },
    role: {
      type: String,
      required: true,
      enum: ["customer", "seller"],
      default: "customer",
    },
  },
  { timestamps: true }
);

// Compound index on both email and role to ensure uniqueness for their combination
userSchema.index({ email: 1, role: 1 }, { unique: true });
// alias document attribute accessible as name
userSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});


const User = mongoose.model("User", userSchema);

export default User;

import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const refreshTokenSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

const RefreshToken = model("RefreshToken", refreshTokenSchema);

export default RefreshToken;

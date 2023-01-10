import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
});

// 'tokens' is the name of Collection..
const token = mongoose.model("tokens", tokenSchema);

export default token;

import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const Connection = async (username, password) => {
  const MONGO_URL = `mongodb+srv://${username}:${password}@cluster0.jubop8h.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(MONGO_URL, { usenewURLParser: true });
    console.log("DataBase connected Successfully!");
  } catch (error) {
    console.log("Error, while connecting to DATABASE!", error);
  }
};

export default Connection;

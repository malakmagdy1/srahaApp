import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected success");
    })
    .catch((error) => {
      console.log("MongoDB connected error", error);
    });
};
export default connectDB;

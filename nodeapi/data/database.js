import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then(() => console.log("Database is connected locally"))
    .catch((e) => console.log("Database Connection Failed" + e));
};

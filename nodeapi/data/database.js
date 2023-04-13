import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "backendapi",
    })
    .then((c) => console.log(`Database is connected: ${c.connection.host}`))
    .catch((e) => console.log("Database Connection Failed" + e));
};

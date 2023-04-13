import { app } from "./app.js";
import { connectDB } from "./data/database.js";

/* Database Connection */
connectDB();


//Server instance initialization
app.listen(process.env.PORT, () => {
  console.log(
    `Server is Working on ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

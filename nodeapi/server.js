import { app } from "./app.js";

//Server instance initialization
app.listen(process.env.PORT, () => {
  console.log(`Server is Working on ${process.env.PORT}`);
});

import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { postsRouter } from "./modules/posts/posts.routes";
import { usersRouter } from "./modules/users/users.routes";

const app = express();

const port = process.env.APP_PORT || 2000;
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to Blogg API" });
});

// ROUTES
app.use("/v1/users", usersRouter);
app.use("/v1/posts", postsRouter);

// app.listen(port, () => {
//   console.log("App listen in port:", port);
// });

export default app;

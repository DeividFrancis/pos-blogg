import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { categorysRouter } from "./modules/categorys/categorys.routes";
import { commentsRouter } from "./modules/comments/comments.routes";
import { postsRouter } from "./modules/posts/posts.routes";
import { tagsRouter } from "./modules/tags/tags.routes";
import { usersRouter } from "./modules/users/users.routes";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (_, res) => {
  res.status(200).json({ message: "Welcome to Blogg API" });
});

// ROUTES
app.use("/v1/users", usersRouter);
app.use("/v1/posts", postsRouter);
app.use("/v1/comments", commentsRouter);
app.use("/v1/tags", tagsRouter);
app.use("/v1/categorys", categorysRouter);

export default app;

import { Router } from "express";
import db from "../../configs/db";
import { PostsController } from "./posts.controller";
import { PostsRepository } from "./posts.repository";

const postsRouter = Router();

const postsRepository = new PostsRepository(db);
const postsController = new PostsController(postsRepository);

postsRouter.get("/", postsController.findAll);
postsRouter.get("/:uuid", postsController.findOne);
postsRouter.post("/", postsController.save);
postsRouter.put("/:uuid", postsController.update);
postsRouter.delete("/:uuid", postsController.delete);

export { postsRouter };

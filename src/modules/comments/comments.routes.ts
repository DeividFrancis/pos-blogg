import { Router } from "express";
import db from "../../configs/db";
import { CommentsController } from "./comments.controller";
import { CommentsRepository } from "./comments.repository";

const commentsRouter = Router();

const commentsRepository = new CommentsRepository(db);
const commentsController = new CommentsController(commentsRepository);

commentsRouter.get("/", commentsController.findAll);
commentsRouter.post("/", commentsController.save);
commentsRouter.put("/:uuid", commentsController.update);
commentsRouter.delete("/:uuid", commentsController.delete);

export { commentsRouter };

import { Router } from "express";
import db from "../../configs/db";
import { TagsController } from "./tags.controller";
import { TagsRepository } from "./tags.repository";

const tagsRouter = Router();

const tagsRepository = new TagsRepository(db);
const tagsController = new TagsController(tagsRepository);

tagsRouter.get("/", tagsController.findAll);
tagsRouter.post("/", tagsController.save);
tagsRouter.delete("/:uuid", tagsController.delete);

export { tagsRouter };

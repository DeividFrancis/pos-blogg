import { Router } from "express";
import db from "../../configs/db";
import { CategorysController } from "./categorys.controller";
import { CategorysRepository } from "./categorys.repository";

const categorysRepository = new CategorysRepository(db);
const categorysController = new CategorysController(categorysRepository);

const categorysRouter = Router();

categorysRouter.get("/", categorysController.findAll);
categorysRouter.post("/", categorysController.save);
categorysRouter.delete("/:uuid", categorysController.delete);

export { categorysRouter };

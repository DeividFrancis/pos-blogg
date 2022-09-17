import { Router } from "express";
import db from "../../configs/db";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";

const usersRouter = Router();

const usersRepository = new UsersRepository(db);
const usersController = new UsersController(usersRepository);

usersRouter.get("/", usersController.findAll);
usersRouter.get("/:uuid", usersController.findOne);
usersRouter.post("/", usersController.save);
usersRouter.put("/:uuid", usersController.update);
usersRouter.delete("/:uuid", usersController.delete);

export { usersRouter };

import { Request, Response } from "express";
import { IUser, UsersRepository } from "./users.repository";

type UserSaveReq = Pick<IUser, "name" | "email" | "profile">;
type UserUpdateReq = UserSaveReq;

export class UsersController {
  constructor(private repository: UsersRepository) {}

  findAll = async (req: Request, res: Response) => {
    const users = await this.repository.listAll();
    return res.json(users);
  };

  findOne = async (req: Request<{ uuid: string }>, res: Response) => {
    const { uuid } = req.params;
    const user = await this.repository.findOne(uuid);
    return res.json(user);
  };

  save = async (req: Request, res: Response) => {
    const body = req.body as UserSaveReq;
    const user = await this.repository.save(body);
    res.status(201).json(user);
  };

  update = async (req: Request, res: Response) => {
    const body = req.body as UserUpdateReq;
    const { uuid } = req.params;
    const user = await this.repository.update(uuid, body);
    return res.json(user);
  };
  delete = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const user = await this.repository.delete(uuid);
    return res.status(204).json(user);
  };
}

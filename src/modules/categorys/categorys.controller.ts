import { Request, Response } from "express";
import { CategorysRepository, ICategory } from "./categorys.repository";

export class CategorysController {
  constructor(private repository: CategorysRepository) {}

  findAll = async (req: Request, res: Response) => {
    const categorysRes = await this.repository.findAll();
    res.json(categorysRes);
  };
  save = async (req: Request, res: Response) => {
    const categoryReq = req.body as ICategory;
    const categoryRes = await this.repository.save(categoryReq);
    res.json(categoryRes);
  };
  delete = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const categoryRes = await this.repository.delete(uuid);
    res.json(categoryRes);
  };
}

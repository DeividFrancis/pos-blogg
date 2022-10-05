import { Request, Response } from "express";
import { ITag, TagsRepository } from "./tags.repository";

export class TagsController {
  constructor(private repository: TagsRepository) {}

  findAll = async (req: Request, res: Response) => {
    const tagsRes = await this.repository.findAll();
    res.json(tagsRes);
  };

  save = async (req: Request, res: Response) => {
    const tag = req.body as ITag;
    const tagsRes = await this.repository.save(tag);
    res.json(tagsRes);
  };

  delete = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const tagRes = await this.repository.delete(uuid);
    res.json(tagRes);
  };
}

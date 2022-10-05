import { Request, Response } from "express";
import { IComment, CommentsRepository } from "./comments.repository";

export class CommentsController {
  constructor(private repository: CommentsRepository) {}

  findAll = async (req: Request, res: Response) => {
    const { post_uuid } = req.params;
    const postComments = await this.repository.findAll(post_uuid);
    return res.json(postComments);
  };

  save = async (req: Request, res: Response) => {
    const commentReq = req.body as IComment;
    const commentRes = await this.repository.save(commentReq);
    return res.json(commentRes);
  };

  update = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const commentReq = req.body as IComment;
    const commentRes = await this.repository.update(uuid, commentReq);
    return res.json(commentRes);
  };

  delete = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const commentRes = await this.repository.delete(uuid);
    return res.json(commentRes);
  };
}

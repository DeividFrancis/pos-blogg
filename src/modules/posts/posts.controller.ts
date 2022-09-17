import { Request, Response } from "express";
import { IPost, PostsRepository } from "./posts.repository";

type PostSaveReq = Pick<IPost, "title" | "content" | "published" | "author">;
type PostUpdateReq = PostSaveReq;

export class PostsController {
  constructor(private repository: PostsRepository) {}

  findAll = async (req: Request, res: Response) => {
    const postsRes = await this.repository.findAll();
    return res.json(postsRes);
  };

  findOne = async (req: Request, res: Response) => {
    const postRes = await this.repository.findAll();
    return res.json(postRes);
  };

  save = async (req: Request, res: Response) => {
    const post = req.body as PostSaveReq;
    const postRes = await this.repository.save(post);
    return res.status(201).json(postRes);
  };

  update = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const post = req.body as PostUpdateReq;
    const postsRes = await this.repository.update(uuid, post);
    return res.json(postsRes);
  };

  delete = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const postRes = await this.repository.delete(uuid);
    return res.status(204).json(postRes);
  };
}

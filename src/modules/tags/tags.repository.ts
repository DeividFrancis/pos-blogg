import { PrismaClient } from "@prisma/client";

export interface ITag {
  content: string;
}

export class TagsRepository {
  constructor(private db: PrismaClient) {}

  async findAll() {
    const tagsDB = await this.db.tag.findMany();
    return tagsDB;
  }

  async save(tag: ITag) {
    const tagDB = await this.db.tag.create({
      data: {
        content: tag.content,
      },
    });

    return tagDB;
  }

  async delete(uuid: string) {
    const tagDB = await this.db.tag.delete({
      where: {
        uuid,
      },
    });

    return tagDB;
  }
}

import { Prisma, PrismaClient } from "@prisma/client";
import { excludeDefaults } from "../../utils/db";

export interface IPost extends Omit<Prisma.PostCreateInput, "author"> {
  author: {
    uuid: string;
  };
}

const select: Prisma.PostSelect = {
  uuid: true,
  title: true,
  content: true,
  createdAt: true,
  updatedAt: true,
  published: true,
  author: {
    select: {
      uuid: true,
      name: true,
      email: true,
    },
  },
};

export class PostsRepository {
  constructor(private db: PrismaClient) {}
  async findAll() {
    const posts = await this.db.post.findMany({
      select,
      where: {
        deleted: null,
      },
    });

    const postsRes = posts.map(excludeDefaults);
    return postsRes;
  }

  async findOne(uuid: string) {
    const postDB = await this.db.post.findFirst({
      select,
      where: {
        uuid,
        deleted: null,
      },
    });

    return postDB;
  }

  async save(post: IPost) {
    const postDB = await this.db.post.create({
      select,
      data: {
        ...post,
        author: {
          connect: { uuid: post.author.uuid },
        },
      },
    });

    return postDB;
  }

  async update(uuid: string, post: IPost) {
    const postDB = await this.db.post.update({
      select,
      where: { uuid },
      data: {
        ...post,
        author: {
          connect: {
            uuid: post.author.uuid,
          },
        },
      },
    });

    return postDB;
  }

  async delete(uuid: string) {
    const postDB = await this.db.post.delete({
      where: { uuid },
    });

    const postRes = excludeDefaults(postDB);
    return postRes;
  }
}

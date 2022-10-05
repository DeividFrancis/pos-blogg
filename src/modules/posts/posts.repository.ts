import { Prisma, PrismaClient } from "@prisma/client";
import { excludeDefaults } from "../../utils/db";

export interface IPost
  extends Omit<Prisma.PostCreateInput, "author" | "tags" | "categorys"> {
  author: {
    uuid: string;
  };
  tags?: string[];
  categorys?: string[];
}

const select: Prisma.PostSelect = {
  uuid: true,
  title: true,
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
  tags: {
    select: {
      content: true,
    },
  },
  categorys: {
    select: {
      name: true,
    },
  },
};

export class PostsRepository {
  constructor(private db: PrismaClient) {}
  async findAll() {
    const posts = await this.db.post.findMany({
      select: { ...select, _count: true },
      where: {
        deleted: null,
      },
    });

    return posts;
  }

  async findOne(uuid: string) {
    const postDB = await this.db.post.findFirst({
      select: {
        ...select,
        content: true,
        comments: {
          select: {
            uuid: false,
            content: true,
            author: {
              select: {
                uuid: true,
                name: true,
                email: true,
              },
            },
          },
          where: {
            deleted: null,
          },
        },
      },
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
        tags: post.tags && {
          connectOrCreate: post.tags.map((tag) => ({
            where: { content: tag },
            create: { content: tag },
          })),
        },
        categorys: post.categorys && {
          connectOrCreate: post.categorys.map((c) => ({
            where: { name: c },
            create: { name: c },
          })),
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
        tags: post.tags && {
          connectOrCreate: post.tags.map((tag) => ({
            where: { content: tag },
            create: { content: tag },
          })),
        },
        categorys: post.categorys && {
          connectOrCreate: post.categorys.map((c) => ({
            where: { name: c },
            create: { name: c },
          })),
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

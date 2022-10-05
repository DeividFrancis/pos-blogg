import { PrismaClient } from "@prisma/client";

export interface IComment {
  content: string;
  author: {
    uuid: string;
  };
  post: {
    uuid: string;
  };
}

export class CommentsRepository {
  constructor(private db: PrismaClient) {}
  async findAll(postUuid: string) {
    const comments = await this.db.comment.findMany({
      where: {
        post: { uuid: postUuid },
      },
    });

    return comments;
  }
  async save(comment: IComment) {
    const commentDB = await this.db.comment.create({
      data: {
        content: comment.content,
        author: {
          connect: {
            uuid: comment.author.uuid,
          },
        },
        post: {
          connect: {
            uuid: comment.post.uuid,
          },
        },
      },
    });

    return commentDB;
  }

  async update(uuid: string, comment: IComment) {
    const commentDB = await this.db.comment.update({
      where: {
        uuid,
      },
      data: {
        content: comment.content,
        author: {
          connect: {
            uuid: comment.author.uuid,
          },
        },
        post: {
          connect: {
            uuid: comment.post.uuid,
          },
        },
      },
    });

    return commentDB;
  }

  async delete(uuid: string) {
    const commentDB = await this.db.comment.delete({
      where: {
        uuid,
      },
    });

    return commentDB;
  }
}

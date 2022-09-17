import { Prisma, PrismaClient } from "@prisma/client";

export interface IUser extends Omit<Prisma.UserCreateInput, "profile"> {
  profile?: {
    uuid: string;
    bio: string;
  };
}

const select: Prisma.UserSelect = {
  uuid: true,
  name: true,
  email: true,
  updatedAt: true,
  createdAt: true,
  profile: {
    select: {
      uuid: true,
      bio: true,
    },
  },
};
export class UsersRepository {
  constructor(private db: PrismaClient) {}

  async listAll() {
    const users = await this.db.user.findMany({
      select,
      where: {
        deleted: null,
      },
    });
    return users;
  }

  async findOne(uuid: string) {
    const user = await this.db.user.findFirst({
      where: { uuid, deleted: null },
    });

    return user;
  }

  save(user: IUser) {
    return this.db.user.create({
      select,
      data: {
        ...user,
        ...(user?.profile?.bio && {
          profile: {
            create: {
              bio: user.profile.bio,
            },
          },
        }),
      },
    });
  }

  async update(uuid: string, data: IUser) {
    const user = await this.db.user.update({
      select,
      where: {
        uuid,
      },
      data: {
        ...data,
        ...(data?.profile && {
          profile: data.profile.uuid
            ? {
                update: {
                  uuid: data.profile.uuid,
                  bio: data.profile.bio,
                },
              }
            : {
                create: {
                  bio: data.profile.bio,
                },
              },
        }),
      },
    });
    return user;
  }

  async delete(uuid: string) {
    return await this.db.user.delete({ select, where: { uuid } });
  }
}

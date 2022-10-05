import { PrismaClient } from "@prisma/client";

export interface ICategory {
  name: string;
}
export class CategorysRepository {
  constructor(private db: PrismaClient) {}

  async findAll() {
    const categorysDB = await this.db.category.findMany();
    return categorysDB;
  }

  async save(category: ICategory) {
    const categoryDB = await this.db.category.create({
      data: category,
    });

    return categoryDB;
  }

  async update(uuid: string, category: ICategory) {
    const categoryDB = await this.db.category.update({
      where: { uuid },
      data: category,
    });

    return categoryDB;
  }

  async delete(uuid: string) {
    const categoryDB = await this.db.category.delete({
      where: { uuid },
    });

    return categoryDB;
  }
}

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: [
    "error",
    "info",
    //  "query",
    "warn",
  ],
});

/***********************************/
/* SOFT DELETE MIDDLEWARE */
/***********************************/

db.$use(async (params, next) => {
  // Check incoming query type
  // if (params.model == "Post") {
  if (params.action == "delete") {
    // Delete queries
    // Change action to an update
    params.action = "update";
    params.args["data"] = { deleted: new Date() };
  }
  if (params.action == "deleteMany") {
    // Delete many queries
    params.action = "updateMany";
    if (params.args.data != undefined) {
      params.args.data["deleted"] = new Date();
    } else {
      params.args["data"] = { deleted: new Date() };
    }
  }
  // }
  return next(params);
});

export default db;

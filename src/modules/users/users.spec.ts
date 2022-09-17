import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";

import { IUser } from "./users.repository";
import { fakeServer } from "../../configs/supertest";

describe("Users routes", () => {
  let uzer: IUser;

  it("create a user", async () => {
    const user: IUser = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
    };
    const res = await fakeServer
      .post("/v1/users")
      .send(user)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body.uuid).toBeTruthy();
    uzer = res.body;
  });

  it("list all users", async () => {
    const res = await fakeServer
      .get("/v1/users")
      .set("Accept", "application/json");

    expect(Array.isArray(res.body)).toBe(true);
  });

  it("return one user", async () => {
    const res = await fakeServer
      .get(`/v1/users/${uzer?.uuid}`)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
  });

  it("update user", async () => {
    const email = faker.internet.email();
    const res = await fakeServer
      .put(`/v1/users/${uzer.uuid}`)
      .send({ ...uzer, email })
      .set("Accept", "application/json");

    expect(res.body.email).toBe(email);
  });

  it("delete user", async () => {
    const res = await fakeServer
      .delete(`/v1/users/${uzer.uuid}`)
      .set("Accept", "application/json");

    expect(res.status).toBe(204);
  });
});

import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";

import { fakeServer } from "../../configs/supertest";
import { IPost } from "./posts.repository";

describe("Posts routes", () => {
  let _post: IPost;

  it("create a post", async () => {
    const post: IPost = {
      title: faker.lorem.slug(),
      content: faker.lorem.paragraphs(),
      author: {
        uuid: "cc52f41f-5ddd-4f59-9c9f-a556bd3005d0",
      },
    };

    const res = await fakeServer
      .post("/v1/posts")
      .send(post)
      .set("Accept", "application/json");

    expect(res.status).toEqual(201);
    expect(res.body.uuid).toBeTruthy();

    _post = res.body;
  });

  it("list all posts", async () => {
    const res = await fakeServer
      .get("/v1/posts")
      .set("Accept", "application/json");

    expect(Array.isArray(res.body)).toBe(true);
  });

  it("return one post", async () => {
    const res = await fakeServer
      .get(`/v1/posts/${_post?.uuid}`)
      .set("Accept", "application/json");

    expect(res.status).toEqual(200);
  });

  it("update post", async () => {
    const published = !_post.published;
    const res = await fakeServer
      .put(`/v1/posts/${_post.uuid}`)
      .send({ ..._post, published })
      .set("Accept", "application/json");

    expect(res.body.published).toBe(published);
  });

  it("delete post", async () => {
    const res = await fakeServer
      .delete(`/v1/posts/${_post.uuid}`)
      .set("Accept", "application/json");

    expect(res.status).toBe(204);
  });
});

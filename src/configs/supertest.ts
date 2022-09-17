import request from "supertest";
import app from "../app";

const fakeServer = request(app);
export { fakeServer };

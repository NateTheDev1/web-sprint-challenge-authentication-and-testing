const request = require("supertest");
const server = require("../api/server");

const body = { username: "exampletest", password: "example" };

describe("register", () => {
  it("creates a user", async () => {
    const res = await request(server).post("/api/auth/register").send(body);

    expect(res.status).toBe(201);
  });

  it("does not create a user without correct body", async () => {
    const res = await request(server).post("/api/auth/register").send({});

    expect(res.status).toBe(500);
  });

  it("should login a user", async () => {
    const res = await request(server).post("/api/auth/login").send(body);

    expect(res.body.message).toBe("Logged In");
  });

  it("should not create a user already created", async () => {
    const res = await request(server).post("/api/auth/register").send(body);

    expect(res.status).toBe(500);
  });
});

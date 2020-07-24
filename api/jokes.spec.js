const request = require("supertest");
const server = require("./server");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIwIjoiYSIsIjEiOiJkIiwiMiI6Im0iLCIzIjoiaSIsIjQiOiJuIiwiaWF0IjoxNTk1NjA2OTM5fQ.8XGnO_PltFEYrWaWCD33NjvR0-JhMvYRv-uWFuGFvbo";

describe("jokes route", () => {
  it("should return an array of jokes if token is valid", async () => {
    const expected = "object";

    const actual = await request(server)
      .get("/api/jokes")
      .set({ Authorization: token });
    expect(typeof actual.body[0]).toBe(expected);
  });

  it("should return access denied if token is not present", async () => {
    expectedStatus = 400;
    expectedMessage = "Access Denied";

    const actual = await request(server).get("/api/jokes");

    expect(actual.status).toBe(expectedStatus);
    expect(actual.body.error).toBe(expectedMessage);
  });
});

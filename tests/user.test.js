const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe("User CRUD API", () => {
  let token;

  // Setup token before tests
  beforeAll(async () => {
    // Generate JWT token here if necessary, or mock token
    token = "YOUR_JWT_TOKEN";
  });

  // Cleanup database after all tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        userName: "JohnDoe",
        accountNumber: "12345678",
        emailAddress: "john@example.com",
        identityNumber: "987654321",
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("id");
  });

  it("should retrieve a user by ID", async () => {
    const res = await request(app)
      .get("/api/users/USER_ID") // Replace USER_ID with actual test ID
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("userName");
  });

  it("should update a user by ID", async () => {
    const res = await request(app)
      .put("/api/users/USER_ID") // Replace USER_ID with actual test ID
      .set("Authorization", `Bearer ${token}`)
      .send({ userName: "UpdatedName" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.userName).toEqual("UpdatedName");
  });

  it("should delete a user by ID", async () => {
    const res = await request(app)
      .delete("/api/users/USER_ID") // Replace USER_ID with actual test ID
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("User deleted");
  });

  it("should retrieve a user by account number", async () => {
    const res = await request(app)
      .get("/api/users/account/ACCOUNT_NUMBER") // Ganti ACCOUNT_NUMBER dengan nilai nyata
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accountNumber");
  });

  it("should retrieve a user by identity number", async () => {
    const res = await request(app)
      .get("/api/users/identity/IDENTITY_NUMBER") // Ganti IDENTITY_NUMBER dengan nilai nyata
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("identityNumber");
  });
});

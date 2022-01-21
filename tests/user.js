const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
const app = require("../index");

chai.use(chaiHttp);

describe("Users API", () => {
  describe("GET /welcome", () => {
    it("should NOT return welcome message if user is NOT authenticated", async () => {
      const response = await chai.request(app).get("/welcome");
      expect(response.body).to.equal("Not authorized.");
    });
  });
});

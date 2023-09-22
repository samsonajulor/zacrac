import request from 'supertest';
import app from "./../index";
import mongoose from "mongoose";
import { expect } from 'chai';

jest.setTimeout(300000);
beforeAll((done: any) => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => {
      console.log("DB connected successfully");
      done();
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
});
afterAll((done: any) => {
  mongoose.connection.close();
  done();
});

/*
Logs in a test user, returns a JWT and status code of 200
 */
describe("POST /users/login ", () => {

  test("It should successfully log an existing user in", async () => {
   const response = await request(app)
    .post("/users/login")
    .expect("Content-Type", /json/)
    .send({
     email: "ebuka422@gmail.com",
     pin: "1111",
    });

   expect(response.body).haveOwnProperty("token");
   expect(response.body).haveOwnProperty("success", true);
   expect(response.statusCode).equal(200);
  });

  /*
  Generate a password reset token for a user on zacrac
  */
  describe("POST /users/token", () => {
   test("It should return OTP and send email to user", async () => {
    const data = await request(app)
     .post("/users/token")
     .expect("Content-Type", /json/)
     .send({
      email: "ebuka422@gmail.com",
      pin: "1111",
     });

    expect(data.body).haveOwnProperty("tempToken");
    expect(data.body).haveOwnProperty("success", true);
    expect(data.statusCode).equal(200);
   });
  });

  /*
  Generate a password reset token for a user on zacrac and reset password.
  */
  describe("POST /users/password", () => {
   test("It should fetch a new password after getting a token", async () => {
    const response = await request(app)
     .post("/users/token")
     .expect("Content-Type", /json/)
     .send({
      email: "samsonajulor@gmail.com",
     });

    expect(response.body).haveOwnProperty("tempToken");
    expect(response.body).haveOwnProperty("success", true);
    expect(response.statusCode).equal(200);

    const data = await request(app)
     .post("/users/password")
     .expect("Content-Type", /json/)
     .send({
      tempToken: response.body.tempToken,
      email: "ebuka422@gmail.com",
      pin: "1111",
     });

    expect(data.body).haveOwnProperty("success", true);
    expect(data.statusCode).equal(200);
   });
  });
});

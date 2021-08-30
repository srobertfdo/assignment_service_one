'use strict'

const { test, trait } = use('Test/Suite')('User Controller Functional Test')

trait("Test/ApiClient");

test("Test User File Data Publish", async ({ assert, client }) => {
  let userData = { 
    "name": "everything is fine", 
    "dob": "2020-02-12", 
    "salary": 1000,
    "age": 25 
  }
  const response = await client.post("/users").header('fileType', 'csv').send(userData).end();

  response.assertStatus(200);
  assert.isDefined(response.body.data)
  assert.isDefined(response.body.data.uuid)
}).timeout(0);

test("Test User File Data Publish Update", async ({ assert, client }) => {
  let userData = { 
    "name": "everything is fine", 
    "dob": "2020-02-12", 
    "salary": 1000,
    "age": 25 
  }
  const response = await client.put("/users/df9e4ffa-bfb5-42a9-826d-28ad9fc48945").header('fileType', 'csv').send(userData).end();

  response.assertStatus(200);
  assert.isDefined(response.body.data)
  assert.isDefined(response.body.data.uuid)
}).timeout(0);

test("Test Get User File Data", async ({ assert, client }) => {
  const response = await client.get("/users/df9e4ffa-bfb5-42a9-826d-28ad9fc48945").end();

  response.assertStatus(200);

  assert.isDefined(response.body.data)
  assert.isDefined(response.body.data.uuid)
  assert.equal('df9e4ffa-bfb5-42a9-826d-28ad9fc48945', response.body.data.uuid)
}).timeout(0);

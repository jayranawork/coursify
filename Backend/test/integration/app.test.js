const test = require("node:test");
const assert = require("node:assert/strict");
const { app } = require("../../index");

let server;
let baseUrl;

test.before(async () => {
  server = await new Promise((resolve) => {
    const instance = app.listen(0, () => resolve(instance));
  });
  const { port } = server.address();
  baseUrl = `http://127.0.0.1:${port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
});

test("health endpoint returns the API status", async () => {
  const response = await fetch(`${baseUrl}/`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.success, true);
});

test("unknown endpoints use the central 404 response", async () => {
  const response = await fetch(`${baseUrl}/api/test-endpoint-that-does-not-exist`);
  const body = await response.json();
  assert.equal(response.status, 404);
  assert.equal(body.success, false);
  assert.equal(body.message, "The requested endpoint was not found.");
});

const test = require("node:test");
const assert = require("node:assert/strict");
const {
  registerValidation,
  loginValidation,
} = require("../validation/UserValidation");

test("registerValidation accepts valid payload", () => {
  const { error } = registerValidation({
    username: "tester",
    email: "tester@example.com",
    password: "password123",
  });
  assert.equal(error, undefined);
});

test("registerValidation rejects short password", () => {
  const { error } = registerValidation({
    username: "tester",
    email: "tester@example.com",
    password: "short",
  });
  assert.ok(error);
});

test("loginValidation rejects missing email", () => {
  const { error } = loginValidation({
    password: "password123",
  });
  assert.ok(error);
});

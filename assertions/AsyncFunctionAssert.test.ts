import { Destitute } from "../mod.ts";

const assertThat = (value: (...args: unknown[]) => any) => (
  Destitute.AssertThat<Destitute.Assertions.AsyncFunctionAssertion>(value)
);

Deno.test("AsyncFunctionAssertion - throw()", async () => {
  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error();
    });
  }).does.throw();

  assertThat(async () => {
    await new Promise((resolve) => {
      resolve();
    });
  }).does.not.throw();
});

Deno.test("AsyncFunctionAssertion - throw(ErrorClass)", () => {
  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error();
    });
  }).does.throw(Error);

  assertThat(async () => {
    await new Promise((resolve) => {
      resolve();
    });
  }).does.not.throw();

  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error();
    });
  }).does.not.throw(SyntaxError);
});

Deno.test("FunctionAssertion - throw(, messageIncludes)", () => {
  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error("Hello world");
    });
  }).does.throw(undefined, "Hello");

  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error("Hello world");
    });
  }).does.throw(undefined, /world/);

  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error("Hello world");
    });
  }).does.not.throw(undefined, "bye");

  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error("Hello world");
    });
  }).does.not.throw(undefined, /bye/);
});

Deno.test("FunctionAssertion - throw(ErrorClass, messageIncludes)", () => {
  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error("Hello world");
    });
  }).does.throw(Error, "Hello");

  assertThat(async () => {
    await new Promise((resolve) => {
      throw new Error("Hello world");
    });
  }).does.throw(Error, /world/);
});

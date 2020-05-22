import { AssertThat } from "../mod.ts";
import { StringAssertion } from "./StringAssertion.ts";

const assertThat = (value: string) => AssertThat<StringAssertion>(value);

Deno.test("StringAssertion - match", () => {
  assertThat("Hello world").does.match(/\s/);
  assertThat("Hello world").does.not.match(/\d/);
});

Deno.test("StringAssertion - contain", () => {
  assertThat("Hello world").does.contain("world");
  assertThat("Hello world").does.not.contain("this");
});

Deno.test("StringAssertion - include", () => {
  assertThat("Hello world").does.include("world");
  assertThat("Hello world").does.not.include("this");
});

Deno.test("StringAssertion - lengthOf", () => {
  assertThat("Hello world").has.lengthOf(11);
  assertThat("Hello world").does.not.have.lengthOf(20);
  assertThat("Hello world").has.lengthOf(11);
});

Deno.test("StringAssertion - before", () => {
  assertThat("hello").is.before("world");
  assertThat("hello").is.not.before("figures");
});

Deno.test("StringAssertion - after", () => {
  assertThat("hello").is.after("figures");
  assertThat("hello").is.not.after("world");
});

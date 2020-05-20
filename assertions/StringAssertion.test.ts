import { AssertThat } from "../mod.ts";
import { StringAssertion } from "./StringAssertion.ts";

Deno.test("StringAssertion", () => {
  AssertThat<StringAssertion>("Hello world").does.contain("world");
  AssertThat<StringAssertion>("Hello world").does.not.contain("this");
  AssertThat<StringAssertion>("Hello world").does.include("world");
  AssertThat<StringAssertion>("Hello world").does.not.include("this");
  AssertThat<StringAssertion>("Hello world").has.lengthOf(11);
  AssertThat<StringAssertion>("Hello world").does.not.have.lengthOf(20);
  AssertThat<StringAssertion>("Hello world").has.lengthOf(11);
  AssertThat<StringAssertion>("Hello world").does.match(/\s/);
  AssertThat<StringAssertion>("Hello world").does.not.match(/\d/);
});

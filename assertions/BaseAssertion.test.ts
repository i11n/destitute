import { AssertThat } from "../mod.ts";

Deno.test("BaseAssertion chaining", () => {
  AssertThat(true).is.true();
  AssertThat(false).is.not.true();
  AssertThat(true).isnt.not.true();
});

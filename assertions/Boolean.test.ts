import { AssertThat } from "../mod.ts";
import { BooleanAssertion } from "./BooleanAssertion.ts";

Deno.test("BooleanAssertion", () => {
  AssertThat<BooleanAssertion>(true).is.true();
  AssertThat<BooleanAssertion>(false).is.not.true();
});

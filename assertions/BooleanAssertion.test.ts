import { AssertThat } from "../mod.ts";
import { BooleanAssertion } from "./BooleanAssertion.ts";

const assertThat = (value: boolean) => AssertThat<BooleanAssertion>(value);

Deno.test("BooleanAssertion - true", () => {
  assertThat(true).is.true();
  assertThat(false).is.not.true();
});

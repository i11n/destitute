import { Destitute } from "../mod.ts";

const assertThat = (value: boolean) =>
  Destitute.AssertThat<Destitute.Assertions.BooleanAssertion>(value);

Deno.test("BooleanAssertion - true", () => {
  assertThat(true).is.true();
  assertThat(false).is.not.true();
});

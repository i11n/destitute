import { Destitute } from "../mod.ts";

const assertThat = (value: number) =>
  Destitute.AssertThat<Destitute.Assertions.NumberAssertion>(value);

Deno.test("NumberAssertion - gt(num)", () => {
  assertThat(25).is.gt(12);
  assertThat(52).is.not.gt(52);
  assertThat(52).is.not.gt(60);
});

Deno.test("NumberAssertion - gte(num)", () => {
  assertThat(25).is.gte(12);
  assertThat(25).is.gte(25);
  assertThat(52).is.not.gte(60);
});

Deno.test("NumberAssertion - lt(num)", () => {
  assertThat(25).is.lt(30);
  assertThat(52).is.not.lt(52);
  assertThat(52).is.not.lt(13);
});

Deno.test("NumberAssertion - lte(num)", () => {
  assertThat(25).is.lte(100);
  assertThat(25).is.lte(25);
  assertThat(52).is.not.lte(10);
});

Deno.test("NumberAssertion - int", () => {
  assertThat(25).is.an.int();
  assertThat(25.8892).is.not.an.int();
});

Deno.test("NumberAssertion - btw(min, max)", () => {
  assertThat(25).is.btw(11, 50);
  assertThat(25).is.not.btw(26, 100);
  assertThat(25).is.not.btw(25, 100);
  assertThat(25).is.not.btw(1, 25);
});

Deno.test("NumberAssertion - within(min, max)", () => {
  assertThat(25).is.within(11, 50);
  assertThat(25).is.within(25, 100);
  assertThat(25).is.within(1, 25);
  assertThat(25).is.not.within(26, 100);
});

Deno.test("NumberAssertion - finite", () => {
  assertThat(25).is.finite();
  assertThat(-6287632841).is.finite();
  assertThat(Infinity).is.not.finite();
  assertThat(-Infinity).is.not.finite();
});

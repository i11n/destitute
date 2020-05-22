import { AssertThat } from "../AssertThat.ts";
import { ArrayAssertion } from "./ArrayAssertion.ts";
import { NumberAssertion } from "./NumberAssertion.ts";

function assertThat<T = any>(value: Array<T>) {
  return AssertThat<ArrayAssertion<T>>(value);
}

Deno.test("ArrayAssertion - lengthOf", () => {
  assertThat([1, 2, 3, 4, 5]).has.a.lengthOf(5);
  assertThat([1, 2, 3, 4, 5]).doesnt.have.a.lengthOf(10);
});

Deno.test("ArrayAssertion - contain", () => {
  assertThat([1, 2, 3, 4, 5]).does.contain(5);
  assertThat([1, 2, 3, 4, 5]).does.contain(1);
  assertThat([1, 2, 3, 4, 5]).does.not.contain(50);
});

Deno.test("ArrayAssertion - include", () => {
  assertThat([1, 2, 3, 4, 5]).does.include(5);
  assertThat([1, 2, 3, 4, 5]).does.include(1);
  assertThat([1, 2, 3, 4, 5]).does.not.include(50);
});

Deno.test("ArrayAssertion - containAll", () => {
  assertThat([1, 2, 3, 4, 5]).does.containAll([5, 2, 3]);
  assertThat([1, 2, 3, 4, 5]).does.containAll([1, 5]);
  assertThat([1, 2, 3, 4, 5]).does.not.containAll([5, 0]);
  assertThat([1, 2, 3, 4, 5]).does.not.containAll([1, 2, 3, 4, 5, 6]);
});

Deno.test("ArrayAssertion - includeAll", () => {
  assertThat([1, 2, 3, 4, 5]).does.includeAll([5, 2, 3]);
  assertThat([1, 2, 3, 4, 5]).does.includeAll([1, 5]);
  assertThat([1, 2, 3, 4, 5]).does.not.includeAll([5, 0]);
  assertThat([1, 2, 3, 4, 5]).does.not.includeAll([1, 2, 3, 4, 5, 6]);
});

Deno.test("ArrayAssertion - elementsMeet", () => {
  assertThat([1, 2, 3, 4, 5]).elementsMeet((el => 
    AssertThat<NumberAssertion>(el).meetsAll(
      (it) => it.is.gt(0),
      (it) => it.is.lte(5),
      (it) => it.is.an.int(),
    )
  ));
});
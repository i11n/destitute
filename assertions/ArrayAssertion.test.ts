import { Destitute } from "../mod.ts";

const { AssertArray, AssertNumber } = Destitute;

Deno.test("ArrayAssertion - lengthOf", () => {
  AssertArray<number>([1, 2, 3, 4, 5]).has.a.lengthOf(5);
  AssertArray<number>([1, 2, 3, 4, 5]).doesnt.have.a.lengthOf(10);
});

Deno.test("ArrayAssertion - contain", () => {
  AssertArray<number>([1, 2, 3, 4, 5]).does.contain(5);
  AssertArray<number>([1, 2, 3, 4, 5]).does.contain(1);
  AssertArray<number>([1, 2, 3, 4, 5]).does.not.contain(50);
});

Deno.test("ArrayAssertion - include", () => {
  AssertArray<number>([1, 2, 3, 4, 5]).does.include(5);
  AssertArray<number>([1, 2, 3, 4, 5]).does.include(1);
  AssertArray<number>([1, 2, 3, 4, 5]).does.not.include(50);
});

Deno.test("ArrayAssertion - containAll", () => {
  AssertArray<number>([1, 2, 3, 4, 5]).does.containAll([5, 2, 3]);
  AssertArray<number>([1, 2, 3, 4, 5]).does.containAll([1, 5]);
  AssertArray<number>([1, 2, 3, 4, 5]).does.not.containAll([5, 0]);
  AssertArray<number>([1, 2, 3, 4, 5]).does.not.containAll([1, 2, 3, 4, 5, 6]);
});

Deno.test("ArrayAssertion - includeAll", () => {
  AssertArray<number>([1, 2, 3, 4, 5]).does.includeAll([5, 2, 3]);
  AssertArray<number>([1, 2, 3, 4, 5]).does.includeAll([1, 5]);
  AssertArray<number>([1, 2, 3, 4, 5]).does.not.includeAll([5, 0]);
  AssertArray<number>([1, 2, 3, 4, 5]).does.not.includeAll([1, 2, 3, 4, 5, 6]);
});

Deno.test("ArrayAssertion - elementsMeet", () => {
  AssertArray<number>([1, 2, 3, 4, 5]).elementsMeet((el) =>
    AssertNumber(el).meetsAll(
      (it) => it.is.gt(0),
      (it) => it.is.lte(5),
      (it) => it.is.an.int(),
    )
  );
});

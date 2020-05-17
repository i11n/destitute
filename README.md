# Assert that

An assertion library for Deno.

```ts
AssertThat(false).is.not(Truthy());
AssertThat([1, 2, 3]).has(lengthOf(3));
```
```ts
// in test-deps.ts
import { NumberAssertion } from "https://denopkg.com/i11n/assert-that";
export { AssertThat } from "https://denopkg.com/i11n/assert-that";

class DeepThoughtAssertion extends NumberAssertion {
  theAnswer() {
    this.assert(
      (this.value === 42) === this.assertTrue,
      `Expect ${this}${this.assertTrue ? " " : " NOT "}to be the Answer to the Ultimate Question of Life, The Universe, and Everything.`
    );
  }
}

AssertionRouter.setRoute("number", MyNumberAssertion);
//  in my.test.ts
import { AssertThat } from "./test-deps.ts";
//  Do tests
Deno.test("example", () => {
  AssertThat(43).is.not.the.answer();
});
```

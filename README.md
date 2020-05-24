# Destitute

> An assertion library for [Deno](https://github.com/denoland/deno).

---

## Contents
- [Getting started](#getting-started)


## Getting started

Create your tests:

```ts
// some_test.ts

import { Destitute } from "https://denopkg.com/i11n/destitute";

Deno.test("Some tests", () => {
  Destitute.AssertThat(0).is.not.truthy();
  Destitute.AssertThat([1, 2, 3]).has.lengthOf(3);
});
```

For better code completion:

```ts
//  more_tests.ts

import { Destitute } from "https://denopkg.com/i11n/destitute";

const assertNumber = (value: number) => 
  Destitute.AssertThat<Destitute.Assertions.NumberAssertion>(value);
fnuction assertArray<T = any>(value: T[]) => 
  Destitute.AssertThat<Destitute.Assertions.ArrayAssertion<T>>(value);

Deno.test("More tests", () => {
  assertNumber(0).is.not.truthy();
  assertArray<number>([1, 2, 3]).has.lengthOf(3);
});
```

Then run your tests.

```bash
$ deno test
```

## Documentation


## License
Licensed under the [MIT License](https://github.com/i11n/destitute/blob/master/LICENSE).
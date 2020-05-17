import { AssertThat } from "./AssertThat.ts";

Deno.test("Example", () => {
  const fn = (a?: number) => AssertThat(a).is.defined();
  AssertThat(25).isnt.btw(31, 55);
  AssertThat({}).is.null();
  fn(25);
});
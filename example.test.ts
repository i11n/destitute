import { AssertThat } from "./AssertThat.ts";

Deno.test("Example", () => {
  AssertThat(25).is.equalTo(25);
});

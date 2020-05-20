import { AssertThat } from "../mod.ts";
import { BooleanAssertion } from "./BooleanAssertion.ts";
import { StringAssertion } from "./StringAssertion.ts";
import { BaseAssertion } from "./BaseAssertion.ts";

Deno.test("BaseAssertion chaining", () => {
  AssertThat<BooleanAssertion>(true).is.true();
  AssertThat<BooleanAssertion>(false).is.not.true();
  AssertThat<BooleanAssertion>(true).isnt.not.true();
  AssertThat<StringAssertion>("Hello world").does.contain("world");
  AssertThat<StringAssertion>("Hello world").does.not.contain("this");
  AssertThat<StringAssertion>("Hello world").has.lengthOf(11);
  AssertThat<StringAssertion>("Hello world").does.not.have.lengthOf(20);
  AssertThat<StringAssertion>("Hello world").does.not.have.a.lengthOf(20);
  AssertThat<StringAssertion>("Hello world").has.no.lengthOf(20);  
});

Deno.test("BaseAssertion - null", () => {
  AssertThat(null).is.null();
  AssertThat(0).isnt.null();
});

Deno.test("BaseAssertion - defined", () => {
  AssertThat(25).is.defined();
  AssertThat(undefined).isnt.defined();
});

Deno.test("BaseAssertion - truthy", () => {
  AssertThat(1).is.truthy();
  AssertThat(0).isnt.truthy();
});

Deno.test("BaseAssertion - exist", () => {
  AssertThat(25).does.exist();
  AssertThat(null).does.not.exist();
  AssertThat(undefined).does.not.null();
});

Deno.test("BaseAssertion - exists", () => {
  AssertThat(25).exists();
});

Deno.test("BaseAssertion - equal", () => {
  AssertThat(25).does.equal(25);
  AssertThat("hello").does.not.equal("world");
});

Deno.test("BaseAssertion - equals", () => {
  AssertThat(25).equals(25);
});

Deno.test("BaseAssertion - equalTo", () => {
  AssertThat(25).is.equalTo(25);
  AssertThat("hello").is.not.equalTo("world");
  //  more tests here for the different types to check
});
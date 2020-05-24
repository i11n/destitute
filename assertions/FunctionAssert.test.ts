import { AssertThat } from "../mod.ts";
import { FunctionAssertion } from "./FunctionAssertion.ts";

const assertThat = (value: (...args: unknown[]) => any) => (
  AssertThat<FunctionAssertion>(value)
);

Deno.test("FunctionAssertion - throw()", () => {
  assertThat(() => {
    throw new Error();
  }).does.throw();

  assertThat(() => {

  }).does.not.throw()
});

Deno.test("FunctionAssertion - throw(ErrorClass)", () => {
  assertThat(() => {
    throw new Error();
  }).does.throw(Error);
  
  assertThat(() => {
    
  }).does.not.throw()
  
  assertThat(() => {
    throw new Error();
  }).does.not.throw(SyntaxError)
});

Deno.test("FunctionAssertion - throw(, messageIncludes)", () => {
  assertThat(() => {
    throw new Error("Hello world");
  }).does.throw(undefined, "Hello");
  
  assertThat(() => {
    throw new Error("Hello world");
  }).does.throw(undefined, /world/);
  
  assertThat(() => {
    
  }).does.not.throw();
  
  assertThat(() => {
    throw new Error("Hello world");
  }).does.not.throw(undefined, "bye");

  assertThat(() => {
    throw new Error("Hello world");
  }).does.not.throw(undefined, /bye/);
});

Deno.test("FunctionAssertion - throw(ErrorClass, messageIncludes)", () => {
  assertThat(() => {
    throw new Error("Hello world");
  }).does.throw(Error, "Hello");
  
  assertThat(() => {
    throw new Error("Hello world");
  }).does.throw(Error, /world/);
});

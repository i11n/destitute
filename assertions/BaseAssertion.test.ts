import { Destitute } from "../mod.ts";
import { AssertionException } from "../exceptions/AssertionException.ts";

const {
  Test,
  AssertAny,
  AssertBoolean,
  AssertNumber,
  AssertString,
  AssertFunction,
} = Destitute;


Test("BaseAssertion chaining", () => {
  AssertBoolean(true).is.true();
  AssertBoolean(false).is.not.true();
  AssertBoolean(true).isnt.not.true();
  AssertString("Hello world").does.contain("world");
  AssertString("Hello world").does.not.contain("this");
  AssertString("Hello world").has.lengthOf(11);
  AssertString("Hello world").does.not.have.lengthOf(20);
  AssertString("Hello world").does.not.have.a.lengthOf(20);
  AssertString("Hello world").has.no.lengthOf(20);
});

Test("BaseAssertion - null", () => {
  AssertFunction(() => {
    AssertAny(null).is.null();
    AssertAny(0).isnt.null();
  }).doesnt.throw();

  AssertFunction(() => {
    AssertAny(null).is.not.null();
  }).does.throw(AssertionException, `Expected "null" NOT to be "null".`);

  AssertFunction(() => {
    AssertAny(25).is.null();
  }).does.throw(AssertionException, `Expected "25" to be "null".`);
});

Test("BaseAssertion - defined", () => {
  AssertFunction(() => {
    AssertAny(25).is.defined();
    AssertAny(undefined).isnt.defined();
  }).does.not.throw();

  AssertFunction(() => {
    AssertAny(25).is.not.defined();
  }).does.throw(AssertionException, `Expected "25" NOT to be "defined".`);

  AssertFunction(() => {
    AssertAny(undefined).is.defined();
  }).does.throw(AssertionException, `Expected "undefined" to be "defined".`);
});

Test("BaseAssertion - truthy", () => {
  AssertFunction(() => {
    AssertAny(1).is.truthy();
    AssertAny(0).isnt.truthy();
  }).does.not.throw();

  AssertFunction(() => {
    AssertAny(0).is.truthy();
  }).does.throw(AssertionException, `Expected "0" to be "truthy".`);

  AssertFunction(() => {
    AssertAny(1).is.not.truthy();
  }).does.throw(AssertionException, `Expected "1" NOT to be "truthy".`);
});

Test("BaseAssertion - exist/exists", () => {
  AssertFunction(() => {
    AssertNumber(25).exists();
    AssertString("Hi, there").exists();
    AssertAny().does.not.exist();
    AssertAny(null).does.not.exist();
  }).does.not.throw();

  AssertFunction(() => {
    AssertAny(null).exists();
  }).does.throw(
    AssertionException,
    `Expected "null" to be a value other than "undefined" or "null".`,
  );

  AssertFunction(() => {
    AssertAny().exists();
  }).does.throw(
    AssertionException,
    `Expected "undefined" to be a value other than "undefined" or "null".`,
  );

  AssertFunction(() => {
    AssertAny(50).doesnt.exist();
  }).does.throw(
    AssertionException,
    `Expected "50" NOT to be a value other than "undefined" or "null".`,
  );
});

Test("BaseAssertion - equal/equals/equalTo", () => {
  let object = {
    hello: "world",
    nest: {
      nest: {
        nest: true,
      },
    },
  };

  AssertFunction(() => {
    AssertAny(5 * 5).does.equal(25);
    AssertAny(`The answer is ${42}`).equals("The answer is 42");
    AssertAny(!false).equals(true);
    AssertAny([1, 2, "Hello", ["world"]].concat([["!"]])).equals(
      [1, 2, "Hello", ["world"], ["!"]],
    );
    AssertAny({ goodbye: ["Hello", 2, 3], ...object }).equals({
      goodbye: ["Hello", 2, 3],
      hello: "world",
      nest: {
        nest: {
          nest: true,
        },
      },
    });
  }).does.not.throw();

  AssertFunction(() => {
    AssertAny(5 * 5).does.not.equal(25);
  }).does.throw(AssertionException, `Expected "25" NOT to equal "25".`);
  
  AssertFunction(() => {
    AssertAny([25, 10, 15]).does.equal([10, 25, 15]);
  }).does.throw(AssertionException, `Expected "Array" to equal "Array".`);
  
  AssertFunction(() => {
    AssertAny(object).does.equal({goodbye: ["Hello"], nest: { nest : true}});
  }).does.throw(AssertionException, `Expected "Object" to equal "Object".`);
});

Test("BaseAssertion - meetsAll", () => {  
  AssertFunction(() => {
    AssertNumber(25).meetsAll(
      (it) => it.is.lt(30),
      (it) => it.equals(25),
      (it) => it.is.gte(25),
      (it) => it.is.an.int(),
    );
  }).does.not.throw();

  AssertFunction(() => {
    AssertNumber(25).meetsAll(
      (it) => it.is.lt(30),
      (it) => it.equals(26),
      (it) => it.is.gte(25),
      (it) => it.is.an.int(),
    );
  }).does.throw(AssertionException, `Expected "25" to meet all assertions. Failed on assertion 2 with message: Expected "25" to equal "26".`);
});

Test("BaseAssertion - meetsAny", () => {
  AssertFunction(() => {
    AssertNumber(25).meetsAny(
      (it) => it.is.lt(10),
      (it) => it.equals(26),
      (it) => it.is.gte(50),
      (it) => it.is.an.int(),
    );
  }).does.not.throw();

  AssertFunction(() => {
    AssertNumber(25).meetsAny(
      (it) => it.is.lt(10),
      (it) => it.equals(26),
      (it) => it.is.gte(50),
      (it) => it.is.not.an.int(),
    );
  }).does.throw(AssertionException, `Expected "25" to meet at least one assertion.`);
});

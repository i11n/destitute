import { IConstructor } from "../util/types.ts";
import { Assertions } from "../assertions/mod.ts";
import { BaseAssertion } from "../assertions/BaseAssertion.ts";
import { FunctionSpy } from "../util/FunctionSpy.ts";
import { DuplicateAssertionRouteException } from "../exceptions/DuplicateAssertionRouteException.ts";
import { MissingAssertionRouteException } from "../exceptions/MissingAssertionRouteException.ts";
import { UnregisteredAssertionRouteException } from "../exceptions/UnregisteredAssertionRouteException.ts";

export module AssertionRouter {
  /**
   * A tuple mapping value types to an assertion class.
   */
  type AssertionRoute = [
    IConstructor<any> | string,
    IConstructor<BaseAssertion>,
  ];

  /**
   * The collection of [AssertionRoutes] use to route assertion values to an assertion class.
   */
  const ROUTES: AssertionRoute[] = [];

  /**
   * 
   * @param Class 
   */
  function assertRouteExists<T extends IConstructor<any>>(
    Class: T | string,
  ): number {
    let index = 0;

    ROUTES.forEach((route, i) => {
      let [routeClass, assertion] = route;
      if (routeClass === Class) {
        throw new DuplicateAssertionRouteException(Class, assertion);
      }

      index = i;
    });

    return index;
  }

  /**
   * 
   * @param Class 
   * @param assertion 
   */
  export function addRoute<T extends IConstructor<any>>(
    Class: T | string,
    assertion: IConstructor<BaseAssertion>,
  ) {
    assertRouteExists(Class);

    ROUTES.push([Class, assertion]);
  }

  /**
   * 
   * @param Class 
   * @param assertion 
   */
  export function setRoute<T extends IConstructor<any>>(
    Class: T | string,
    assertion: IConstructor<BaseAssertion>,
  ) {
    let foundRoute = false;

    ROUTES.map((route) => {
      let [routeClass, assertion] = route;
      if (routeClass === Class) {
        foundRoute = false;
        return [routeClass, assertion];
      }

      return [route];
    });

    if (!foundRoute) {
      throw new UnregisteredAssertionRouteException(Class);
    }
  }

  /**
   * 
   * @param Before 
   * @param Class 
   * @param assertion 
   */
  export function insertRoute<T extends IConstructor<any>>(
    Before: T | string,
    Class: T | string,
    assertion: IConstructor<BaseAssertion>,
  ) {
    const index = assertRouteExists(Before);

    ROUTES.splice(index, 0, [Class, assertion]);
  }

  /**
   * 
   * @param value 
   */
  export function matchRoute(value: any): IConstructor<BaseAssertion> {
    let valueType: string | IConstructor<any> = typeof value;
    valueType = valueType === "undefined" ? "base" : valueType;

    if (typeof value === "object" || typeof value === "function") {
      valueType = !value
        ? "base"
        : (value as Object).constructor as IConstructor<any>;
    }

    for (let i = ROUTES.length - 1; i >= 0; i--) {
      let [routeClass, assertion] = ROUTES[i];
      if (routeClass === valueType) {
        return assertion;
      }
    }

    throw new MissingAssertionRouteException(value, valueType);
  }

  //  Get the constructor of an async function.
  const asyncFn = async () => await new Promise((resolve) => resolve(true));
  const AsyncCtor: IConstructor<any> = asyncFn.constructor as IConstructor<any>;

  addRoute("base", Assertions.BaseAssertion); //  handles undefined and null
  addRoute("boolean", Assertions.BooleanAssertion); //  handles booleans
  addRoute("number", Assertions.NumberAssertion); //  handles number
  addRoute("string", Assertions.StringAssertion); //  handles strings
  addRoute(Object, Assertions.ObjectAssertion); //  handles object
  addRoute(Array, Assertions.ArrayAssertion); //  handles arrays
  addRoute(Set, Assertions.SetAssertion); //  handles sets
  addRoute(Map, Assertions.MapAssertion); //  handles maps
  addRoute(AsyncCtor, Assertions.AsyncFunctionAssertion); //  handles async function
  addRoute(Function, Assertions.FunctionAssertion); //  handles function
  addRoute(FunctionSpy, Assertions.FunctionSpyAssertion); //  handles function spys
}

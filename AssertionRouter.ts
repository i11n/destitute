import { IAssertion, IConstructor } from "./types.ts";
import { BaseAssertion } from "./assertions/BaseAssertion.ts";
import { NumberAssertion } from "./assertions/NumberAssertion.ts";

export module AssertionRouter {
  export type AssertionRoute = [
    IConstructor<any> | string,
    IConstructor<IAssertion>,
  ];

  const ROUTES: AssertionRoute[] = [];

  function assertRouteExists<T extends IConstructor<any>>(Class: T | string) {
    ROUTES.forEach((route) => {
      let [routeClass, assertion] = route;
      if (routeClass === Class) {
        throw new Error(
          `A route matching "${
            typeof Class === "string"
              ? Class
              : Class.name
          }" is already mapped to "${assertion.name}". Use "setRoute()" to override.`,
        );
      }

      return [route];
    });
  }

  export function addRoute<T extends IConstructor<any>>(
    Class: T | string,
    assertion: IConstructor<IAssertion>,
  ) {
    assertRouteExists(Class);

    ROUTES.push([Class, assertion]);
  }

  export function setRoute<T extends IConstructor<any>>(
    Class: T | string,
    assertion: IConstructor<IAssertion>,
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
      throw new Error(
        `No route matching "${
          typeof Class === "string"
            ? Class
            : Class.name
        }" was found. Use "addRoute()" or "spliceRoute()" instead.`,
      );
    }
  }

  export function matchRoute(value: any): IConstructor<IAssertion> {
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

    throw new Error(
      `No route matching "${
        typeof valueType === "string"
          ? valueType
          : valueType.name
      }" for value (${value}) was found.`,
    );
  }

  addRoute("base", BaseAssertion); //  handles undefined and null
  //addRoute("boolean", BooleanAssertion);  //  handles booleans
  addRoute("number", NumberAssertion); //  handles number
  //addRoute("string", StringAssertion);  //  handles strings
}

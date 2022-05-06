import { App, Stack } from "aws-cdk-lib";
import { Construct as CdkConstruct } from "constructs";
import type { CdKConstructClass } from "./types";

/*
Strat tech:
    - check cdkConstruct is a class
    - instanciate a new cdkConstruct using dummy params but also cdkConfiguration.
        - if it throws because we gave wrong parameters to the construct's configuration parameter, throw a specific error.
    - check if that instance is a construct using CdkConstruct.isContruct()
*/
export function checkIsCdkConstruct(cdkConstruct: unknown): asserts cdkConstruct is CdKConstructClass {
    if (typeof cdkConstruct !== "function" || !/^class[\s{]/.test(Function.prototype.toString.call(cdkConstruct))) {
        throw new Error("specified value is not a class");
    }

    const app = new App();
    const stack = new Stack(app);
    //const instanciatedCdkConstruct = Object.create(cdkConstruct.prototype)(stack, "dummyString");

    // if (!CdkConstruct.isConstruct(instanciatedCdkConstruct)) {
    //     throw new Error("The input parameter cdkConstruct is not a CDK Construct");
    // }
}

// Code snippet from Codepen (JS ONLY)
/**
 * class MyClass {
  a;
  constructor() {
    this.a = "hello";
  }
}

function MyFunction() {
  return 'hello';
}

const dummy = "hello"

function invokeClass(dummyClass) {
  return new dummyClass()
}

const b = invokeClass(MyClass)

console.log(b)
console.log(b instanceof MyClass)
 */

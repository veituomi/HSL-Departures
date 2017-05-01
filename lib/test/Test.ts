/// <reference path="TestManager.ts" />
/// <reference path="UnitTest.ts" />

function Testable(target) {
    TestManager.addTestClass(target);
}

function Test(target, propertyKey: string) {
    TestManager.addTest(target.constructor.name, propertyKey);
}

function Timeout(time: number) {
    return function(target, propertyKey: string) {
        TestManager.addTimeout(target.constructor.name, propertyKey, time);
    }
}

function ExpectException(target, propertyKey: string) {
    TestManager.addException(target.constructor.name, propertyKey);
}

function Before(target, propertyKey: string) {
    TestManager.setBefore(target.constructor.name, propertyKey);
}

function After(target, propertyKey: string) {
    TestManager.setAfter(target.constructor.name, propertyKey);
}

function BeforeClass(target, propertyKey: string) {
    TestManager.setBeforeClass(target.constructor.name, propertyKey);
}

function AfterClass(target, propertyKey: string) {
    TestManager.setAfterClass(target.constructor.name, propertyKey);
}

function Ignore(target: UnitTest, propertyKey: string) {
    console.log(propertyKey + " was ignored.");
}
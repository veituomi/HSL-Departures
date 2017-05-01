/// <reference path="testCase.ts" />

abstract class UnitTest {
    private passed: number;
    private failed: number;
    private name: string;
    private method: string;

    private testCase: TestCase;

    constructor(n: string, t: TestCase) {
        this.passed = 0;
        this.failed = 0;

        this.name = n;
        this.testCase = t;

        this.run();
    }

    private run(): void {
        this.invokeMethod(this.testCase.beforeClass);
        for (let method of this.testCase.getTests()) {
            this.invokeMethod(this.testCase.before);

            let timeBefore = new Date();
            this.invokeMethod(method);
            
            let time = this.testCase.getTimeout(method);
            if (time > 0 && new Date(Date.now() - time) > timeBefore)
                this.fail(method + " took too long.");

            this.invokeMethod(this.testCase.after);
        }
        this.invokeMethod(this.testCase.afterClass);
        
        console.info(this.name + ": " + this.passed + "/" + (this.passed + this.failed));
    }

    private invokeMethod(method: string): void {
        if (typeof this[method] != "function") return;

        this.method = method;
        try {
            this[method]();
        } catch (ex) {
            if (this.testCase.getException(method)) {
                this.requireTrue("Exception was thrown as expected.", true);
            } else {
                this.fail("Test caused an unexpected exception.");
            }
            return;
        }
        if (this.testCase.getException(method)) {
            this.fail("Exception was unexpectedly not thrown.");
        }
    }
    
    private requireTrue(message: string, condition: boolean) {
        if (condition) {
            console.info(message);
            this.passed++;
        } else {
            console.error(message);
            this.failed++;
        }
    }

    fail(message: string) {
        this.requireTrue(message, false);
    }
    assertTrue(message: string, condition: boolean) {
        this.requireTrue(message, condition);
    }
    assertFalse(message: string, condition: boolean) {
        this.requireTrue(message, condition);
    }
    assertEquals(message: string, expected: any, actual: any, tolerance?: number) {
        if (tolerance != undefined) {
            this.requireTrue(message, Math.abs(expected - actual) < tolerance);
        } else {
            this.requireTrue(message, expected == actual);
        }
    }
    assertNull(message: string, object: Object) {
        this.requireTrue(message, object == null);
    }
    assertNotNull(message: string, object: Object) {
        this.requireTrue(message, object != null);
    }
    assertSame(message: string, expected: Object, actual: Object) {
        this.requireTrue(message, expected == actual);
    }
    assertNotSame(message: string, expected: Object, actual: Object) {
        this.requireTrue(message, expected != actual);
    }
}
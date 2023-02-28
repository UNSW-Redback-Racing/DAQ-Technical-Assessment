import * as fs from 'fs/promises';
import { tempRead } from "./interface";
import { logTemp, clearTemps } from "./invalid";

const lineCount = async () => {
    const content = await fs.readFile("incidents.log");
    return content.toString().split("\n").length - 1;
}

beforeEach(async () => {
    clearTemps();
    await fs.writeFile("incidents.log", " ");
})

afterAll(async () => {
    clearTemps();
    await fs.unlink("incidents.log");
})

describe("no logs", () => {

    test("less than 3 errors", async () => {
        const testData: tempRead = { battery_temperature: 1, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);
    })

    test("third error more than 5 seconds", async () => {
        const testData: tempRead = { battery_temperature: 1, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 7000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);
    })

    test("third value not erroneous", async () => {
        const testData: tempRead = { battery_temperature: 1, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 3000;
        testData.battery_temperature = 40;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);
    })

    test("on the fence edge values", async () => {
        const testData: tempRead = { battery_temperature: 1, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        testData.battery_temperature = 80;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 3000;
        testData.battery_temperature = 20;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);
    })
})

describe("logged error", () => {

    test("errors temp below 20", async () => {
        const testData: tempRead = { battery_temperature: 19, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 3000;
        await logTemp(testData);
        expect(await lineCount()).toBeGreaterThanOrEqual(1);
    })

    test("errors temp over 80", async () => {
        const testData: tempRead = { battery_temperature: 81, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 3000;
        await logTemp(testData);
        expect(await lineCount()).toBeGreaterThanOrEqual(1);
    })

    test("mix", async () => {
        const testData: tempRead = { battery_temperature: 81, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        testData.battery_temperature = 19;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 3000;
        await logTemp(testData);
        expect(await lineCount()).toBeGreaterThanOrEqual(1);
    })

    test("two logs", async () => {
        const testData: tempRead = { battery_temperature: 81, timestamp: 1000 }
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 2000;
        await logTemp(testData);
        expect(await lineCount()).toBeLessThan(1);

        testData.timestamp = 3000;
        await logTemp(testData);
        expect(await lineCount()).toBeGreaterThanOrEqual(1);

        testData.timestamp = 4000;
        await logTemp(testData);
        expect(await lineCount()).toBeGreaterThanOrEqual(2);
    })
})

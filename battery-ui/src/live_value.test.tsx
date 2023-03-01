import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LiveValue from "./live_value";

describe("error color", () => {

    // const interval = 666;

    // const sleep = (ms: number) => {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    test("over 80 error", async () => {
        const { getByText } = render(<LiveValue temp={81} />);
        expect(getByText("81°C")).toHaveStyle("color: 0xFFFFFF");   // default color
        // await sleep(interval);
        // expect(getByText("81°C")).toHaveStyle("color: rgb(233, 63, 51)");   // error color
    })

    test("below 20 error", async () => {
        const { getByText } = render(<LiveValue temp={19} />);
        expect(getByText("19°C")).toHaveStyle("color: 0xFFFFFF");
        // await act( async () => await sleep(interval * 2) );
        // console.log(getByText("19°C").style.cssText);
        // expect(getByText("19°C")).toHaveStyle("color: rgb(233, 63, 51)");
    })

})
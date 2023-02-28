import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LiveValue from "./live_value";

describe("error color", () => {

    test("over 80 error", () => {
        const { getByText } = render(<LiveValue temp={81} />);
        expect(getByText("81°C")).toHaveStyle("color: rgb(233, 63, 51)");
    })

    test("below 20 error", () => {
        const { getByText } = render(<LiveValue temp={19} />);
        expect(getByText("19°C")).toHaveStyle("color: rgb(233, 63, 51)");
    })

})
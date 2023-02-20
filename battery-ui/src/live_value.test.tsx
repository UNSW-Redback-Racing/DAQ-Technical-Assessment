import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LiveValue from "./live_value";

describe("Test colour", () => {
  it("should be green", () => {
    const { getByText } = render(<LiveValue temp={79} />);
    expect(getByText("79°C")).toHaveStyle("color: green");
  });

  it("should be red", () => {
    const { getByText } = render(<LiveValue temp={80} />);
    expect(getByText("80°C")).toHaveStyle("color: red");
  });
});

import React from "react";
import "./App.css";

interface TemperatureProps {
    temp: number;
}

function LiveValue({ temp }: TemperatureProps) {
    let valueColour = "white";

    if (temp < 20) {
        valueColour = "blue";
    } else if (temp > 80) {
        valueColour = "red";
    }

    return (
        <header className="live-value" style={{ color: valueColour }}>
            {`${temp.toString()}°C`}
        </header>
    );
}

export default LiveValue;

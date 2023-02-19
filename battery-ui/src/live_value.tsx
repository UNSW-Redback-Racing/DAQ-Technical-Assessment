import React from "react";
import "./App.css";

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp }: TemperatureProps) {
  return (
    <header
      className="live-value"
      style={{ color: temp >= 80 ? "red" : "green" }}
    >
      {`${temp.toString()}°C`}
    </header>
  );
}

export default LiveValue;

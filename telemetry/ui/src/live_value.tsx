import "./App.css";

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp }: TemperatureProps) {
  let valueColour = "white";

  return (
    <header className="live-value" style={{ color: valueColour }}>
      {`${temp.toPrecision(3)}°C`}
    </header>
  );
}

export default LiveValue;

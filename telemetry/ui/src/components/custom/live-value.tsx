interface TemperatureProps {
  temp: number;
}

/**
 * LiveValue component that displays the temperature value.
 * 
 * @param {number} props.temp - The temperature value to be displayed.
 * @returns {JSX.Element} The rendered LiveValue component.
 */
function LiveValue({ temp }: TemperatureProps) {
  // TODO: Change the color of the text based on the temperature
  // HINT:
  //  - Consider using cn() from the utils folder for conditional tailwind styling
  //  - (or) Use the div's style prop to change the colour
  //  - (or) other solution

  // Justify your choice of implementation in brainstorming.md

  return (
    <div className="text-foreground text-4xl font-bold">
      {`${temp.toPrecision(3)}°C`}
    </div>
  );
}

export default LiveValue;

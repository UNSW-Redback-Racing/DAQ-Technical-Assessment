import { cn } from "@/lib/utils"


interface TemperatureProps {
  temp: any;
}

/**
 * Numeric component that displays the temperature value.
 * 
 * @param {number} props.temp - The temperature value to be displayed.
 * @returns {JSX.Element} The rendered Numeric component.
 */
function Numeric({ temp }: TemperatureProps) {
  // TODO: Change the color of the text based on the temperature
  // HINT:
  //  - Consider using cn() from the utils folder for conditional tailwind styling
  //  - (or) Use the div's style prop to change the colour
  //  - (or) other solution

  // Justify your choice of implementation in brainstorming.md

  const numericTemp = typeof temp === "number" ? temp : parseFloat(temp);

  let color = "#ffffff";
  if (numericTemp < 20 || numericTemp > 80) color = "#ef4444";
  else if ((numericTemp >= 20 && numericTemp < 25) || (numericTemp > 75 && numericTemp <= 80)) color = "#eab308";
  else color = "#22c55e";

  return (
    <div
      className={cn("text-4xl font-bold")}
      style={{ color }}
    >
      {numericTemp.toFixed(3)}°C
    </div>
  );
}

export default Numeric;

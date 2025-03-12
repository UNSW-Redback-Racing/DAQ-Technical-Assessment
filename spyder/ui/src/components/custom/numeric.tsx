import { cn } from "../../lib/utils";
 
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
  const temperatureColor = cn({
    'text-temperature-safe': temp >= 20 && temp <= 80,
    'text-temperature-warning':  (temp >= 20 && temp <= 25) || (temp >= 75 && temp <= 80),
    'text-temperature-unsafe': temp < 20 || temp > 80,
  });

  return (
    <div className={cn("text-4xl font-bold", temperatureColor)}>
      {`${temp.toFixed(3)}°C`}
    </div>
  );
}

export default Numeric;

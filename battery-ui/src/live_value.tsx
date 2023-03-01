import { useEffect, useState } from 'react';
import { FaExclamationTriangle } from "react-icons/fa";
import './App.css';

interface TemperatureProps {
  temp: number;
}

function LiveValue({ temp }: TemperatureProps) {

  const interval = 666; // change accordingly based on data_emulator
  
  // to change color smoothly
  const [perc, setPerc] = useState(-1);
  const [percIncr, setPercIncr] = useState(-1);
  const [nextPerc, setNextPerc] = useState(-1);
  const [incrVal, setIncrVal] = useState(1);

  useEffect(() => {
    setPerc(nextPerc);
    setPercIncr(nextPerc);
    (temp >= 20 && temp <= 80) ? setNextPerc((temp - 20) / (80 - 20) * 100) : setNextPerc(99)
  }, [temp])

  useEffect(() => {
    setIncrVal((perc < nextPerc) ? 1 : -1);
  }, [perc, nextPerc])

  // from ori percentage (0%) to new percentage (90%), slowly change the value so smooth color change
  // 100% reserved for ERROR
  useEffect(() => {
    let lerpPerc: NodeJS.Timer;
    if (Math.floor(percIncr) !== Math.floor(nextPerc)) {
      lerpPerc = setInterval(() => setPercIncr(percIncr + incrVal), interval / Math.abs(nextPerc - perc));
    }
    return () => {
      clearInterval(lerpPerc);
    };
  }, [percIncr, nextPerc, perc, incrVal])

  return (
      // if in range, color changes from yellow (low) to red (high)
      <header className="live-value" style={{ "--percentage": percIncr } as React.CSSProperties}>
        { `${temp.toString()}°C` }
        { (temp < 20 || temp > 80) && <FaExclamationTriangle/> }
      </header>
  );
}

export default LiveValue;
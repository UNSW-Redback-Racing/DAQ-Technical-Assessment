import RedbackLogo from './RedbackLogo';
import Temperature from './Temperature';
import './App.css';
import { useEffect, useState } from 'react';

interface TemperatureProps {
  temp: number;
}

const Content = ({ temp }: TemperatureProps) => {

  const [open, setOpen] = useState(false);
  const [loadTemp, setLoadTemp] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    console.log(open + " " + loadTemp);
    if (loadTemp === 2 && open) {     // close
      timeout = setTimeout(() => {
        setOpen(false);
        setLoadTemp(0);
      }, 1000);
    } else if (open) {                // open
      timeout = setTimeout(() => setLoadTemp(1), 1000);
    } 
    return () => {
      clearTimeout(timeout);
    }
  }, [open, loadTemp])
  

  return (
    <>
      <RedbackLogo open={open} setOpen={setOpen} setLoadTemp={setLoadTemp}/>
      { loadTemp === 1 && <Temperature temp={temp}/> }
    </>
  )
}

export default Content
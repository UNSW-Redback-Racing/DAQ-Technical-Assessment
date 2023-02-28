import RedbackLogo from './RedbackLogo';
import Temperature from './Temperature';
import { useState } from 'react';

interface TemperatureProps {
  temp: number;
}

const Content = ({ temp }: TemperatureProps) => {

  const [open, setOpen] = useState(false);

  return (
    <>
      <RedbackLogo open={open} setOpen={setOpen}/>
      <Temperature temp={temp} open={open}/>
    </>
  )
}

export default Content
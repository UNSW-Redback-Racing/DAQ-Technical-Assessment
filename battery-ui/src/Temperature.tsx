import LiveValue from './live_value'
import './App.css';
import { useContext } from 'react';
import { DimContext } from './DimensionsProvider';

interface TemperatureProps {
  temp: number;
}

const Temperature = ({ temp }: TemperatureProps) => {

  const {windowHeight, windowWidth, logoDimensions} = useContext(DimContext);

  return (
    <div className='temp-container'>
      <p className='value-title'>
          Live Battery Temperature
      </p>
      <LiveValue temp={temp}/>
    </div>
  )
}

export default Temperature
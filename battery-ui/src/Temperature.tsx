import LiveValue from './live_value'
import './App.css';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { DimContext } from './DimensionsProvider';

interface TemperatureProps {
  temp: number;
  open: boolean;
}

const Temperature = ({ temp, open }: TemperatureProps) => {

  const { windowWidth } = useContext(DimContext); // could use media query but already have this

  const sideVariants = {
    open: {
			translateX: 0,
      transition: { duration: 1, delay: 0.2 }
		},
    close: {
			translateX: `50vw`,
      transition: { duration: 1 }
    },
  }

  const bottomVariants = {
    open: {
      translateX: `-50%`,
      translateY: `-60vh`,
      transition: { duration: 1, delay: 0.2 }
		},
    close: {
      translateX: `-50%`,
			translateY: 0,
      transition: { duration: 1 }
    },
  }

  return (
    <motion.div className='temp-container'
      animate={ open ? "open": "close" }
      variants={ (windowWidth >= 796) ? sideVariants : bottomVariants }
      initial={false}
    >
      <motion.p className='value-title'>
          Live Battery Temperature
      </motion.p>
      <LiveValue temp={temp}/>
    </motion.div>
  )
}

export default Temperature
import Logo from './redback_logo.jpg';
import { motion } from 'framer-motion'; 
import './App.css';
import { Dispatch, SetStateAction, useContext } from 'react';
import { DimContext } from './DimensionsProvider';

interface LogoProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setLoadTemp: Dispatch<SetStateAction<number>>;
}

const RedbackLogo = ({ open, setOpen, setLoadTemp }: LogoProps) => {

  const {windowHeight, windowWidth, logoDimensions} = useContext(DimContext)

	const openVariants = {
    open: {
			scale: Math.min(Math.max(windowHeight / logoDimensions, 1), 2.5),   // scale within (1, 2.5)
			translateX: `-${windowWidth / 2 - (windowHeight / logoDimensions - 1) * logoDimensions / 3}px`,
			transition: { duration: 1 }
		},
    close: {
			scale: 1.0,
			translateX: `-${logoDimensions / 2}px`,
      translateY: `-${logoDimensions / 2}px`,
			transition: { duration: 1 }
    },
  }

  const shakeVariants = {
    open: {},
    close: {
      rotate: [0, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatDelay: 1.5, delay: 1.5 }
    }
  }

  return (
    <motion.div className='logo-container'
      animate={ open ? "open": "close" }
      variants={shakeVariants}
    >
      <motion.img src={Logo} className="redback-logo" alt="Redback Racing Logo"
        onClick={() => open ? setLoadTemp(2) : setOpen(true)}
        animate={ open ? "open": "close" }
        variants={openVariants}
        initial={false}
      />
    </motion.div>
  )
}

export default RedbackLogo
import Logo from './redback_logo.jpg';
import { motion } from 'framer-motion'; 
import './App.css';
import { Dispatch, SetStateAction, useContext } from 'react';
import { DimContext } from './DimensionsProvider';

interface LogoProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

const RedbackLogo = ({ open, setOpen }: LogoProps) => {

  const {windowHeight, windowWidth, logoDimensions, scale} = useContext(DimContext)

  const sideOpen = {
    scale: scale,
    translateX: `-${windowWidth / 2 - (windowHeight / logoDimensions - 1) * logoDimensions / 3}px`,
    transition: { duration: 1 }
  }

  const bottomOpen = {
    scale: 0.5,
    translateY: `-${logoDimensions}px`,
    transition: { duration: 1 }
  }

	const openVariants = {
    open: (windowWidth >= 796) ? sideOpen : bottomOpen,
    close: {
			scale: 1.0,
			translateX: `-${logoDimensions / 2}px`,
      translateY: `-${logoDimensions / 2}px`,
			transition: { duration: 1, delay: 0.2 },
    },
  }

  const shakeVariants = {
    open: {},
    close: {
      opacity: [1, 0, 1],
      transition: { duration: 2, repeat: Infinity, repeatDelay: 0.5, delay: 1.5 }
    }
  }

  return (
    <motion.div className='logo-container'
      animate={ open ? "open": "close" }
      variants={shakeVariants}
    >
      <motion.img src={Logo} className="redback-logo" alt="Redback Racing Logo"
        onClick={() => setOpen(!open)}
        animate={ open ? "open": "close" }
        variants={openVariants}
        initial={false}
      />
    </motion.div>
  )
}

export default RedbackLogo
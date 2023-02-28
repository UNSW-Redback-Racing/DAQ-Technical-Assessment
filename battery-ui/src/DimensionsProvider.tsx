import { createContext, ReactNode, useEffect, useState } from 'react'

interface Dimensions {
  windowWidth: number,
  windowHeight: number,
  logoDimensions: number,
  scale: number;
}

interface ProviderProps {
  children?: ReactNode;
}

export const DimContext = createContext<Dimensions>({windowHeight: 0, windowWidth: 0, logoDimensions: 0, scale: 0});

const DimensionsProvider = ({ children }: ProviderProps) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [scale, setScale] = useState(0);
  const logoDimensions = 204.7;

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [])

  useEffect(() => {
    setScale(Math.min(Math.max(windowHeight / logoDimensions, 1), 2.5)); // scale within (1, 2.5)
  }, [windowHeight, windowWidth])

  return (
    <DimContext.Provider value={{ windowWidth, windowHeight, logoDimensions, scale }}>
      {children}
    </DimContext.Provider>
  )
}

export default DimensionsProvider
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react'

interface Dimensions {
  windowWidth: number,
  windowHeight: number,
  logoDimensions: number;
}

interface ProviderProps {
  children?: ReactNode;
}

export const DimContext = createContext<Dimensions>({windowHeight: 0, windowWidth: 0, logoDimensions: 0});

const DimensionsProvider = ({ children }: ProviderProps) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const logoDimensions = 204.7;

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [])

  return (
    <DimContext.Provider value={{ windowWidth, windowHeight, logoDimensions }}>
      {children}
    </DimContext.Provider>
  )
}

export default DimensionsProvider
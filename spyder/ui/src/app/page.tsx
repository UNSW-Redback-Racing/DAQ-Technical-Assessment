"use client"

import { useState, useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer, GripVertical, RotateCcw, Sun, Moon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Numeric from "../components/custom/numeric"
import TemperatureChart from "../components/custom/temperature-chart"
import RedbackLogoDarkMode from "../../public/logo-darkmode.svg"
import RedbackLogoLightMode from "../../public/logo-lightmode.svg"
import { Responsive, WidthProvider } from "react-grid-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)
const WS_URL = "ws://localhost:8080"
const MAX_DATA_POINTS = 50

interface VehicleData {
  battery_temperature: number
  timestamp: number
}
interface Widget {
  id: string
  title: string
  content: React.ReactNode
  x: number
  y: number
  w: number
  h: number
}

/**
 * Page component that displays DAQ technical assessment. Contains the LiveValue component as well as page header and labels.
 * Could this be split into more components?...
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function Page(): JSX.Element {
  const { theme, setTheme } = useTheme()
  const [temperature, setTemperature] = useState<any>(0)
  const [connectionStatus, setConnectionStatus] = useState<string>("Disconnected")
  const [temperatureData, setTemperatureData] = useState<{ timestamp: number; temperature: number }[]>([])
  const { lastJsonMessage, readyState }: { lastJsonMessage: VehicleData | null; readyState: ReadyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )
  const [layoutKey, setLayoutKey] = useState<number>(0)
  const [mounted, setMounted] = useState(false)

  const defaultLayouts = {
    lg: [
      { i: "temperature-chart", x: 0, y: 0, w: 8, h: 8 },
      { i: "live-temperature", x: 8, y: 0, w: 4, h: 8 },
      { i: "panel-1", x: 0, y: 8, w: 6, h: 6 },
      { i: "panel-2", x: 6, y: 8, w: 6, h: 6 }
    ],
    md: [
      { i: "temperature-chart", x: 0, y: 0, w: 8, h: 8 },
      { i: "live-temperature", x: 8, y: 0, w: 4, h: 8 },
      { i: "panel-1", x: 0, y: 8, w: 6, h: 6 },
      { i: "panel-2", x: 6, y: 8, w: 6, h: 6 }
    ],
    sm: [
      { i: "temperature-chart", x: 0, y: 0, w: 12, h: 8 },
      { i: "live-temperature", x: 0, y: 8, w: 12, h: 8 },
      { i: "panel-1", x: 0, y: 16, w: 12, h: 6 },
      { i: "panel-2", x: 0, y: 22, w: 12, h: 6 }
    ],
    xs: [
      { i: "temperature-chart", x: 0, y: 0, w: 12, h: 8 },
      { i: "live-temperature", x: 0, y: 8, w: 12, h: 8 },
      { i: "panel-1", x: 0, y: 16, w: 12, h: 6 },
      { i: "panel-2", x: 0, y: 22, w: 12, h: 6 }
    ]
  } 
  
  const [layouts, setLayouts] = useState(defaultLayouts)

  /** 
   * Effect hook to set the mounted state to true when the component is mounted
   */ 
  useEffect(() => {
    setMounted(true)
  }, [])

  /** 
   * Function to save layout to localStorage
   */ 
  const saveLayout = (currentLayout: any, layouts: any) => {
    localStorage.setItem('dashboard-layout', JSON.stringify(layouts));
  }
  
  /** 
   * Effect hook to load layout from localStorage
   */ 
  useEffect(() => {
    const savedLayout = localStorage.getItem('dashboard-layout');
    if (savedLayout) {
      try {
        setLayouts(JSON.parse(savedLayout));
      } catch (e) {
        console.error('Error loading saved layout:', e);
      }
    }
  }, []);

  /** 
   *  Function to reset layout to default
   */ 
  const resetLayout = () => {
    setLayouts(defaultLayouts);
    localStorage.removeItem('dashboard-layout');
    setLayoutKey(prevKey => prevKey + 1);
  }

  /**
   * Effect hook to handle WebSocket connection state changes.
   */
  useEffect(() => {
    switch (readyState) {
      case ReadyState.OPEN:
        console.log("Connected to streaming service")
        setConnectionStatus("Connected")
        break
      case ReadyState.CLOSED:
        console.log("Disconnected from streaming service")
        setConnectionStatus("Disconnected")
        break
      case ReadyState.CONNECTING:
        setConnectionStatus("Connecting")
        break
      default:
        setConnectionStatus("Disconnected")
        break
    }
  }, [readyState])

  /**
   * Effect hook to handle incoming WebSocket messages.
   */
  useEffect(() => {
    console.log("Received: ", lastJsonMessage)
    if (lastJsonMessage === null) {
      return
    }
    setTemperature(lastJsonMessage.battery_temperature)

    // Add to temperature history (for chart display)
    setTemperatureData(prevData => {
      const newDataPoint = {
        temperature: lastJsonMessage.battery_temperature,
        timestamp: lastJsonMessage.timestamp,
      }
      
      // Keep only the latest MAX_DATA_POINTS readings
      const updatedData = [...prevData, newDataPoint]
      if (updatedData.length > MAX_DATA_POINTS) {
        return updatedData.slice(-MAX_DATA_POINTS)
      }
      return updatedData
    })
  }, [lastJsonMessage])

  /**
   * Effect hook to set the theme to dark mode.
   */
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  /**
   * Create widgets for the dashboard
   */
  const widgets = {
    "temperature-chart": (
      <Card className="w-full h-full">
        <CardHeader className="cursor-move flex flex-row items-center p-4">
          <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
          <CardTitle>Temperature Chart</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <TemperatureChart data={temperatureData} />
        </CardContent>
      </Card>
    ),
    "live-temperature": (
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="cursor-move flex flex-row items-center p-4">
          <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-xl font-light flex items-center gap-2">
            <Thermometer className="h-6 w-6" />
            Live Battery Temperature
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          <Numeric temp={temperature} />
        </CardContent>
      </Card>
    ),
    "panel-1": (
      <Card className="w-full h-full">
        <CardHeader className="cursor-move flex flex-row items-center p-4">
          <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
          <CardTitle>Available Panel</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-muted-foreground">
          Space for additional components
        </CardContent>
      </Card>
    ),
    "panel-2": (
      <Card className="w-full h-full">
        <CardHeader className="cursor-move flex flex-row items-center p-4">
          <GripVertical className="mr-2 h-5 w-5 text-muted-foreground" />
          <CardTitle>Available Panel</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center text-muted-foreground">
          Space for additional components
        </CardContent>
      </Card>
    )
  }

  /**
   * Render loading state if not mounted yet
   */
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="px-5 h-20 flex items-center gap-5 border-b">
          <div className="h-12 w-36" /> {/* Logo placeholder */}
          <h1 className="text-foreground text-xl font-semibold">DAQ Technical Assessment</h1>
        </header>
        <main className="flex-grow p-4 md:p-6">
          {/* Loading state or placeholder for widgets */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Placeholder boxes */}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-5 h-20 flex items-center gap-5 border-b">
        {theme === "dark" ? (
          <Image
            src={RedbackLogoDarkMode}
            className="h-12 w-auto"
            alt="Redback Racing Logo"
          />
        ) : (
          <Image
            src={RedbackLogoLightMode}
            className="h-12 w-auto"
            alt="Redback Racing Logo"
          />
        )}
        <h1 className="text-foreground text-xl font-semibold">DAQ Technical Assessment</h1>
        <Badge variant={connectionStatus === "Connected" ? "success" : "destructive"} className="ml-auto">
          {connectionStatus}
        </Badge>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleTheme} 
                className="flex items-center gap-1"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle between light and dark mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetLayout} 
                className="flex items-center gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Layout
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset dashboard to default layout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>
      <main className="flex-grow p-4 md:p-6 overflow-hidden">
        <ResponsiveGridLayout
          key={layoutKey}
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
          rowHeight={40}
          isResizable={true}
          isDraggable={true}
          onLayoutChange={(currentLayout, allLayouts) => saveLayout(currentLayout, allLayouts)}
          draggableHandle=".cursor-move"
        >
          {Object.keys(widgets).map(key => (
            <div key={key}>
              {widgets[key as keyof typeof widgets]}
            </div>
          ))}
        </ResponsiveGridLayout>
      </main>
    </div>
  )
}

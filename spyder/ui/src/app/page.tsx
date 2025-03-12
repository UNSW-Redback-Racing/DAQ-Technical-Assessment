"use client"

import { useState, useEffect } from "react"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Thermometer } from "lucide-react"
import Numeric from "../components/custom/numeric"
import TemperatureChart from "../components/custom/temperature-chart"
import RedbackLogoDarkMode from "../../public/logo-darkmode.svg"
import RedbackLogoLightMode from "../../public/logo-lightmode.svg"

const WS_URL = "ws://localhost:8080"
const MAX_DATA_POINTS = 50

interface VehicleData {
  battery_temperature: number
  timestamp: number
}

/**
 * Page component that displays DAQ technical assessment. Contains the LiveValue component as well as page header and labels.
 * Could this be split into more components?...
 *
 * @returns {JSX.Element} The rendered page component.
 */
export default function Page(): JSX.Element {
  const { setTheme } = useTheme()
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
  useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-5 h-20 flex items-center gap-5 border-b">
        <Image
          src={RedbackLogoDarkMode}
          className="h-12 w-auto"
          alt="Redback Racing Logo"
        />
        <h1 className="text-foreground text-xl font-semibold">DAQ Technical Assessment</h1>
        <Badge variant={connectionStatus === "Connected" ? "success" : "destructive"} className="ml-auto">
          {connectionStatus}
        </Badge>
      </header>
      <main className="flex-grow p-4 md:p-6">
        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-12 md:col-span-8 h-80">
            <TemperatureChart data={temperatureData} />
          </div>

          <div className="col-span-12 md:col-span-4 h-80">
            <Card className="w-full h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-light flex items-center gap-2">
                  <Thermometer className="h-6 w-6" />
                  Live Battery Temperature
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow items-center justify-center">
                <Numeric temp={temperature} />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 md:col-span-6 h-64 flex items-center justify-center">
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle>Available Panel</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center text-muted-foreground">
                Space for additional components
              </CardContent>
            </Card>
          </div>
          
          <div className="col-span-12 md:col-span-6 h-64 flex items-center justify-center">
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle>Available Panel</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center text-muted-foreground">
                Space for additional components
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

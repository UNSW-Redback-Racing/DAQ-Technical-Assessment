import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import LiveValue from "./live_value";
import RedbackLogo from "./redback_logo.jpg";

function App() {
  const [temperature, setTemperature] = useState<number>(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ws: any = useRef(null);

  useEffect(() => {
    // using the native browser WebSocket object
    const socket: WebSocket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("opened");
    };

    socket.onclose = () => {
      console.log("closed");
    };

    socket.onmessage = (event) => {
      console.log("got message", event.data);
      const message_obj = JSON.parse(event.data);
      setTemperature(message_obj["battery_temperature"].toPrecision(3));
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={RedbackLogo} className="redback-logo" alt="Redback Racing Logo" />
        <p className="value-title">Live Battery Temperature</p>
        <LiveValue temp={temperature} />
      </header>
    </div>
  );
}

export default App;

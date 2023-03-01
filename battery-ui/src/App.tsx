import { useState, useRef, useEffect } from 'react';
import './App.css';
import Content from './Content';

function App() {

  const [temperature, setTemperature] = useState<number>(0);

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
      <Content temp={temperature} />
    </div>
  );
}

export default App;

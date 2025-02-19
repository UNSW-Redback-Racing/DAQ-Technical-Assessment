// battery_emulator.ts
import net from "net";
import { exit } from "process";

const tcpClient = new net.Socket();
const HOST = "streaming-service";
const PORT = 12000;

const MILLISECONDS = 500;
const IN_RANGE_PROBABILITY = 0.7;
const BINARY_PROBABILITY = 0.2;

function generate_and_send_battery_data() {
  let generated_value: number;

  if (Math.random() < IN_RANGE_PROBABILITY) {
    generated_value = getRandomIntInclusive(20, 80) + Math.random();
  } else {
    generated_value = Math.random() < 0.5
      ? getRandomIntInclusive(0, 20)
      : getRandomIntInclusive(82, 1000);
  }

  let data = {
    battery_temperature: Math.random() < BINARY_PROBABILITY 
      ? Buffer.from(new Uint32Array([generated_value]).buffer).toString('binary')
      : generated_value,
    timestamp: Date.now(),
  };

  if (!(tcpClient.destroyed || tcpClient.closed)) {
    let json_string = JSON.stringify(data);
    tcpClient.write(json_string);
  } else {
    console.log("connection to server closed");
    exit();
  }
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

tcpClient.connect(PORT, HOST, function () {
  console.log("CONNECTED TO: " + HOST + ":" + PORT);
});

tcpClient.on("error", function (e) {
  console.log(e.message);
});

tcpClient.on("connect", () => {
  console.log(
    `starting to generate and send emulated battery data every ${MILLISECONDS} milliseconds`
  );
  setInterval(generate_and_send_battery_data, MILLISECONDS);
});
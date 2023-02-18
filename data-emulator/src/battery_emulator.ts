import net from 'net';
import { exit } from 'process';

const tcpClient = new net.Socket();
const HOST = "localhost"
const PORT = 12000

function generate_and_send_battery_data() {
    let generated_value: number = 0;
    let error_chance = getRandomIntInclusive(1, 15);
    
    switch (error_chance) {
        case 1:
            generated_value = getRandomIntInclusive(82, 1000); // out of range
            break;
        case 2:
            generated_value = getRandomIntInclusive(0, 20); // out of range
            break;
        default:
            generated_value = getRandomIntInclusive(20, 80) + Math.random();
            break;
    }
    
    let data = {
        "battery_temperature" : generated_value,
        "timestamp": Date.now()
    };
    
    if (!(tcpClient.destroyed || tcpClient.closed)) {
        let json_string = JSON.stringify(data)
        if (error_chance === 3) {
            // make invalid JSON string by adding an extra symbol
            json_string += '}'
        }
        tcpClient.write(json_string);
    } else {
        console.log("connection to server closed");
        exit();
    }
    
}

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

tcpClient.connect(PORT, HOST, function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

tcpClient.on('error', function(e) {
    console.log(e.message);
});

tcpClient.on("connect", () => {
    setInterval(generate_and_send_battery_data, 500);
})
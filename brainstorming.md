# Brainstorming

## 20/02/2023 - Day One

### **Part One: Notes on Implementation**

/battery_ui - don't seem to need to touch this. this is just displaying what's going on with the server
using the React framework (front end)

/data_emulator - connects to localhost. this is where implementation is. contains two implementation functions:

- generate_and_send_battery_data()
- For every function call, an error flag is generated.
- Switch statement determines if the temperature is within the range or not using the next function
- Stores the random temperature (number) and the timestamp (native JS date object)
- Checks if the TCP connection is valid before sending through the data as a JSON file
- Checks error flag again but this time, it will append an extra bracket to the JSON file
- thus invalidating the JSON file. 
    - Param: Void
    - Returns: Void

- getRandomIntInclusive(min, max)
- Generates a random number in a given range; min - max.
    - Param: min (number), max (number)
    - Returns: number

/data_emulator also contains three TCP connection (CRUD) methods:
- .connect() -> initiates connection with streaming service
- .on() 'error' -> error message for when it cannot connect to server
- .on() 'connect' -> message to confirm that battery_emulator is connected to server. calls generate_and_send_battery data every x milliseconds by using native setInterval function.

/server - contains methods to send emulated data over to front end UI using WebSocket protocol

> !! Is there a reason as to why the emulated data can't be sent over TCP as well in order to simplify the stack !!

tcpServer.on() -> while the TCP method is on, console.log at the start of the TCP connections.
This also contains a suite of WebSocket methods.

### **Diagnosing the Issue** 
Changing output speed in battery_emulator.ts from 500ms to 1500ms. (Boomer reaction speed)

Currently, there is no correct error handling behaviour for when the generated temperature value is not within the given range.

One solution we can implement is to make a small change when the request is sent to the front end.
- Within Line 17 of server.ts the JSON.parse method is failing from an invalid temperature because of the appended close bracket from Line 36 of battery_emulator.ts.
- What we can do instead, is we can wrap the JSON.parse method in a try/catch statement and output the errors to the console.
    - At least this way, any errors produced won't halt the program execution.

> !! HOWERVER, invalid temperatures won't be displayed on the webpage and errors will only show up on the terminal which users are unlikely to open.
    > RESOLVED: With Part 2.

This is critical as Redback users need to know when the battery hits those critical temperatures.

=========================================================================
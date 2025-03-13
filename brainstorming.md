# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware
N/A 

## Spyder
Task #1: 
To install the nodemon packages, I first found the installation command in the nodemon docs and ran `npm install --save-dev nodemon` in both directories to install it as a dev dependency. 

Note: I did not install it globally (through `npm install -g nodemon`) as I believe that it won't affect your docker container. 

Task #2: 
When attempting this task, the first step I did was to run `docker compose up` to see what kind of invalid values/data was being sent. I found that sometimes the temp was sent in a binary-encoded string rather than a number, and after a quick look at the code in the emulator, my thinking was this block of code was causing it:

```
battery_temperature: Math.random() < BINARY_PROBABILITY 
  ? Buffer.from(new Uint32Array([generated_value]).buffer).toString('binary')
  : generated_value,
```

Basically, when Math.random() < 0.2, the temperature is converted to binary e.g. 7\u0000\u0000\u0000. Don't think this is ideal because we want numbers. I found that the data was sent to the frontend in server.ts so I should put my check there.

To handle this invalid data, there's a couple options I could pick from, for example, simply filtering out the data or converting the binary strings back into numbers.

I went for simply filtering out non-numeric data so that we can ensure that the frontend only receives valid data + it can handle a lot of unexpected data types and not just invalid binary strings which I felt was better in the long term. 

Some trade-offs, we do lose a bit of the data (~20%) which is not great. 

Coding-wise, my solution was pretty simple - just check battery temperature is a valid number, if it is then send the data to the frontend, if not then log an error msg and it doesn't get sent to the frontend.

Task #3:

Task #4:
Seeing the question - the first place I thought of to check for bugs was in page.tsx, because that's where the button is being set. 

```
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
  }, [])
```

Could immediately see the problem here. It's because the hook here has an empty dependency array so it means it only runs once when the component mounts, so it doesn't really react to changes to readyState. To fix the problem, I tried adding readyState to the dependency array, and it worked yay! The button now updated the connection status accordingly :) 

Task #5: 
Ideas for extra features:
- Toast notifications for Task 4 errors. make a notification button that opens up a popup that shows notifs?
- Light / Dark Mode toggle button 
- chart to display temp data.

Feature #1: You can move the widgets around and re-arrange your dashboard as you wish :) Drag and droppable <3 + there's also a 'reset layout' button in case you don't like your config.

Feature #2: Chart widget - where you can visualise real-time data (battery temps)

Feature #3: Light mode and dark mode! Press the little button on the top right to toggle dark/light mode! 
## Cloud
N/A
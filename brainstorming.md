# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware
N/A 

## Spyder
Task #1: 
- To install the nodemon packages, I first found the installation command in the nodemon docs and ran `npm install --save-dev nodemon` in both directories to install it as a dev dependency. 

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

## Cloud
N/A
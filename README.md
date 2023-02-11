# UNSW Redback Racing - Data Acquisition Team - Technical-Assessment

This assessment aims to gauge your current technical ability and give you a practical introduction
to some of what we do here at Redback Racing. There are two tasks to complete. 

### Submission Date: 

### Submission Link:

### Submission Instructions:


## Task 1 - Data Conversion

*TODO: Draft unfinished spec, rewrite properly*

The Redback team utilises a [CAN bus]() on the race car to transmit data from sensors to the ECU and to the DAQ box. The team uses [CAN utilities]() to record CAN data so that they can replay it later and debug and test their firmware.

* TASK: Revert internal data format into canplayer format

You are given three files:
* an example of a log file using the can-utils log format
* an example of a log file using our internal data format
* a 'sensor configuration file', which maps sensor ids to names

Your task is to write a C++ class which will convert the internal data format into a format that can be read by the CAN player.

You can test the successfulness of your program by attempting to run the canplayer using your converted file.

Initial Format:

[yy:mm:dd:ss] sensor_name : integer value

CAN player format

(1670370870.351768) can0 700#0000000000000000


## Task 2 - Battery Monitoring

You are given code for a simple live telemetry application which is able to visualise sensor data streamed over a network - specifically, it is able to visualise the temperature of a EV battery, ensuring that it doesn't get dangerously hot and explode!

It consists of three components:
* **Data Source** - this is meant to emulate a stream of data coming from the battery temperature sensor.
* **Backend Streaming Service** - this is an application that forwards incoming packets of data to connected frontend clients over the WebSocket protocol.
* **Frontend** - this is the frontend application that will visualise the temperature of the battery.

### Part 1

Fix any syntax errors and invalid parameters to get the code to compile

### Part 2

When running the emulator, the frontend will occasionally crash at runtime. Think about where this crash is happening, and add something to the code to handle this issue better than simply crashing.

### Part 3

The battery has a safe operating range of 20 - 80 degrees. Add something to the backend streaming service to:
    1. Be able to configure this safe operating range
    2. Each time the battery temperature exceeds this range more than 10 times in 5 seconds, log the current timestamp to a file named 'incidents.log'

### Part 4

The frontend is currently very basic. Extend the frontend by:
* Making the battery temperature value change colours based on the current temperature
* Making the frontend more aesthetically pleasing, however you see fit


## Task 3 - CI/CD









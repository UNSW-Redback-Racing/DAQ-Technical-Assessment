# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Spyder

Task 1:

For values in the incorrect format (invalid data), I just drop them, I dont display them in the frontend, but i keep a log of discarded data whenever i run the emulator for debugging purposes.

Task 2:

For this task, I track the frequency of out of range values by maintaining a sliding 5s time window. If the battery temperature exceeds the safe range more than 3 times, then we print a timestamped error message to console.

Task 3: 

I am not sure what I did to be honest, I intentionally skipped this task, but for some reason when I did task 4 light mode/dark mode feature, the connected badge worked, works when i stopped streaming data (badge shows disconnected) and works when i start streaming data (badge shows connected). 

Task 4:

Instead of relying on Tailwind classes, i just use inline style={{ color }} in the numeric.tsx component, might not be the most optimal approach but its much easier for me when it comes to basic style, also its compatible with the current tailwind and css setup. As for temperature, i just converted it to number and displayed to 3 decimal places for consistency, even if its whole numbers like 39.000 or 43.000. 

As for features, I added in a light mode/dark mode feature. This allows the user to toggle between light and dark themes on the DAQ dashboard.

I only did 1 feature for task 4 as im running out of time (i started this only yesterday) I could have completed everything if I started the technical assessment earlier


## Cloud
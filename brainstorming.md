# Brainstorming

This file is used to document your thoughts, approaches and research conducted across all tasks in the Technical Assessment.

## Firmware

## Spyder

Task 1:

For values in the incorrect format (invalid data), I just drop them, I dont display them in the frontend, but i keep a log of discarded data whenever i run the emulator for debugging purposes.

Task 2:

For this task, I track the frequency of out of range values by maintaining a sliding 5s time window. If the battery temperature exceeds the safe range more than 3 times, then we print a timestamped error message to console.

Task 3: 

Task 4:

Instead of relying on Tailwind classes, i just use inline style={{ color }} in the numeric.tsx component, might not be the most optimal approach but its much easier for me when it comes to basic style, also its compatible with the current tailwind and css setup. As for temperature, i just converted it to number and displayed to 3 decimal places for consistency, even if its whole numbers like 39.000 or 43.000. 


## Cloud
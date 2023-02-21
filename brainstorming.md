# Brainstorming
part 1: 
crash happens when the msg has an incorrect format and is passed to JSON.parse, e.g. an extra '}'.
So other than generating a syntax error and crash the whole service, try-and-catch is implemented to print an error message.

# Chat Application Project in Review:

`This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).`
## Why this project?
The initial purpose of this project was to learn more about the React frameword for JavaScript. I had previously worked with creating, reading,
and deleting data in a format that, although it could be created and altered by the user, wasn't as dynamic as a messaging thread. 

## Why React?
At this time I have seen countless developers consistently using Frameworks for the JavaScript they used in applications and I didn't quite 
understand why that was until I dove deeper into error handling and displaying errors to users for user authentication in my Study Tracker
project. The main pain point in that project was the amount of code I used in order to display pop-ups for users after their credentials were
unsuccessful in the authentication phase. React is a great way for me to make use of templated components instead of "hard-coding" values or 
using switch statements on lackluster templates that would mostly change the text inside of an object. With React Components I found the 
developer experience to be much more enjoyable and provide a great structure to my program that allowed me to more easily fix bugs.

## Initial Boundaries:
This application posed a few new complications that I hadn't previously worked through. Those issues being:
1. Gaining a firmer grasp of React Components and Hooks.
2. Updating information posted by users dynamically.
3. Keeping the program as minimal as possible without the use of a database (messages did not need to be saved for later review).
## Overcoming Boundaries:

### React Components and Hooks
Personally I find the style and format of a React application to be extremely pleasing and I can see why there are so many applications in the
real world using this framework. I didn't need to spend copious amounts of time learning how JS works through the files or what was happeing
with components and rendering. The "root" div of in the index.js(x) file is just that, the root of the project! When adding components to the
client I chose to follow what other developers have practiced and put the bulk of the logic into the App.js(x) file then export the App 
function into the index. This left me almost never touching the index file which seemed a bit redundant and I would need to take time testing
other file structures.

As far as the components go in every file you do sadly need to re-import the react module to get started but the time/code structure 
differences in my opinion are negligable. In this iteration of my porject I chose to export each component at the end of each file although
this could be changed upon declaration of the function using the same "export default" clause before declaring the constant or a new function.
Other than that I really enjoyed using React and I am looking forward to using NextJS in my next project coupled with TypeScript.

React Hooks initially looked daunting but upon understanding the core functions like "useState" and "useEffect" they began to make more sense.
The useState function is very useful when you would like to mark a variable that may be subject to change and track that variable with 
previously inputted data. The useEffect function when used in tandem with the variables returned from the useState function 
(1: the variable name, 2: a function that changed that variable) is great when you need to add "side-effects" as many developers have called
them. This funciton takes a callback and a dependency variable as parameters. The callback will be called anytime there is a change to the
variable that it is dependent on, this came in handy when I needed the program to preform actions when users sent messages to the Flask 
RestAPI.

### Updating information dynamically
Initially I assumed that I could create a datastructure that would house all of the messages sent in a thread and update them at some interval.
Upon further thinking this would prove ineffective since users are not used to sending and recieving messages as they are sent. After spending
some time on my own trying to figure out a solution using cookies and session I chose to ask an AI tool about my situation. I was then pointed
to WebSockets which I had never previously heard of. A WebSocket is (at a high level) a connection that is created between the client and the
server that is then left open and used to send and recieve data without preforming a completely new request. After building as much knowledge 
that I could in a day or two without spending too long to damper my porjects timeline I was able to implement WebSockets to send (or emit) and
recieve data from the client at real time which allowed me to properly display messages to users depending on which room they were in!

### Minimalistic design
I'm not sure if it something to be proud of but this feature has the capability to be run completely seperate from any other databases or 
files. Having the knowledge that a feature of this magnitude doesn't require multiple files helps me to understand how production level 
applications keep their overhead as low as possible. After bringing this project to an end I used the Chrome plugin TeleParty which I have 
been using for a while now and noticed that thier chat displayed messages and was created by a host initially each time. After using the
developer tool (while the movie was going which my friends would'nt be happy about) I noticed that although the scale is much larger, the 
structure looks very similar to what I decided to create. In my project the server creates an instance of a Tracker object which contains
methods for altering its data for servers created and being used at all times. In order to clear the data I planned to clear all servers 
every 24 hours but never felt the need to fully implement this. Instead I left the method to clear all servers in the code for future use.
As another way of managing the amount of servers being held in memory I chose to delete a room if at any point the room conatained 0 users.

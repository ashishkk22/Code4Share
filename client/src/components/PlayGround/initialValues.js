let initialHTML = `<!-- Hey, I am HTML! -->
<!-- I provide structure to the web pages -->
<!doctype html>
<html lang="en">
   <head>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title></title>
   </head>
   <body>
      <div class="center-div">
         <button class="btn">Welcome to Code4Share!</button>
      </div>
   </body>
</html>`;
let initialCSS = `/* Hey! what's up */
/* I am CSS, I make web pages look good*/
body {
	background: #282a36;
}

.center-div {
	display: flex;
	justify-content: center;
}

.btn {
	position: absolute;
	height: 5em;
	width: 15em;
	background: #444;
	background: linear-gradient(top, #555, #333);
	border: none;
	border-top: 3px solid #ed5b2d;
	border-radius: 0 0 0.2em 0.2em;
	color: #ffce6d;
	font-family: Helvetica, Arial, Sans-serif;
	font-size: 1em;
	transform-origin: 50% 5em;
	margin-top: 3rem;
    cursor:pointer;
}

.btn {
	animation: wiggle 2s linear infinite;
}

@keyframes wiggle {

	0%,
	7% {
		transform: rotateZ(0);
	}

	15% {
		transform: rotateZ(-15deg);
	}

	20% {
		transform: rotateZ(10deg);
	}

	25% {
		transform: rotateZ(-10deg);
	}

	30% {
		transform: rotateZ(6deg);
	}

	35% {
		transform: rotateZ(-4deg);
	}

	40%,
	100% {
		transform: rotateZ(0);
	}
}`;

let initialJS = `// Javascript here!
// I control the behaviour of Web Pages!`;

let initialCpp = `// Online C++ compiler to run C++ program online
#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Welcome to Code4Share!";

    return 0;
}`;
let initialJava = `// Online Java Compiler
// Use this editor to write, compile and run your Java code online

class Main {
    public static void main(String[] args) {
        System.out.println("Welcome to Code4Share!"); 
    }
}`;
let initialJavascript = `// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
    
console.log("Welcome to Code4Share!");
`;
let initialPython = `# Online Python compiler (interpreter) to run Python online.
# Write Python 3 code in this online editor and run it.
print("Welcome to Code4Share!")`;
let initialOutput = `//output goes here`;
export {
  initialHTML,
  initialCSS,
  initialJS,
  initialCpp,
  initialJava,
  initialJavascript,
  initialPython,
  initialOutput,
};

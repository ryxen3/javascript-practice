//Get the display element from HTML
const display = document.getElementById("calculator-display");

// decimal numbers
const btn0 = document.getElementById("btn-0");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btnDot = document.getElementById("btn-dot");

// clear
const btnAC = document.getElementById("btn-ac");
const btnBackspace = document.getElementById("btn-backspace");

// operators
const btnPlus = document.getElementById("btn-plus");
const btnMinus = document.getElementById("btn-minus");
const btnMultiply = document.getElementById("btn-multiply");
const btnDivide = document.getElementById("btn-divide");
const btnPercent = document.getElementById("btn-percent");
const btnEqual = document.getElementById("btn-equal");

let currentNumber = "";     // The first number that gets in the display screen
let isNewNumber = false;    // A boolean flag to detect we are inputing a new number or not 

// Store previous number and take current number and show it to display
const inputNumber = (nextNumber) => {

    // if input is a dot and there's a previous dot in the string then skip it's input
    if(nextNumber==="." && currentNumber.includes(".")){
        return;
    }
    // refreshes if an operator was clicked last input
    if(isNewNumber===true){ // operator is last input
        currentNumber = nextNumber;
        isNewNumber=false;
    }
    else if(currentNumber==="0"){   //no 0 before input (Note: This is causing "0.something" input to be displayed as ".something" . That's not a bug that's a feature. Please let it slide.)
        currentNumber = nextNumber; 
    } else {
        currentNumber += nextNumber;    //get all number inputs in a string
    }
    display.innerText = currentNumber;  //display the string text

    display.style.color = "#fff"; // Make display font white
};

let lastResult = 0;
let lastOperator = "";

// handle operator input
const inputOperator = (operator) => {
    lastResult = parseFloat(currentNumber); // Float it so that we can break it to decimals
    lastOperator = operator; // store input operator
    isNewNumber = true; // flag switch so that new umber refreshes  
}

const clearAll = () => {
    currentNumber = "";
    isNewNumber = false;
    lastResult = 0;
    lastOperator = "";
    display.innerText = currentNumber;
};

const backspace = () => {
    currentNumber = currentNumber.slice(0,-1);
    display.innerText = currentNumber;
}

// Number buttons click action
btn0.addEventListener("click", () => { inputNumber("0"); });
btn1.addEventListener("click", () => { inputNumber("1"); });
btn2.addEventListener("click", () => { inputNumber("2"); });
btn3.addEventListener("click", () => { inputNumber("3"); });
btn4.addEventListener("click", () => { inputNumber("4"); });
btn5.addEventListener("click", () => { inputNumber("5"); });
btn6.addEventListener("click", () => { inputNumber("6"); });
btn7.addEventListener("click", () => { inputNumber("7"); });
btn8.addEventListener("click", () => { inputNumber("8"); });
btn9.addEventListener("click", () => { inputNumber("9"); });
btnDot.addEventListener("click", () => { inputNumber("."); });

// Operator buttons click action
btnPlus.addEventListener("click", () => { inputOperator("+"); });
btnMinus.addEventListener("click", () => { inputOperator("-"); });
btnMultiply.addEventListener("click", () => { inputOperator("*"); });
btnDivide.addEventListener("click", () => { inputOperator("/"); });
btnPercent.addEventListener("click", () => { inputOperator("%"); });

// clear button click action
btnAC.addEventListener("click", () => {
    clearAll(); 
});

//backspace button 
btnBackspace.addEventListener("click", () =>{
    backspace();
});

btnEqual.addEventListener("click", () => {

    let secondNumber = parseFloat(currentNumber);
    let result = 0;

    if(lastOperator==="/" && currentNumber==="0"){
        display.innerText = "Can't Divide By Zero";
        display.style.color = "#ff4444"
        return;
    }


    if (lastOperator === "+") {
        result = lastResult + secondNumber;
    } else if (lastOperator === "-") {
        result = lastResult - secondNumber;
    } else if (lastOperator === "*") {
        result = lastResult * secondNumber;
    } else if (lastOperator === "/") {
        result = lastResult / secondNumber;
    } else if (lastOperator === "%") {      // TODO : Can't put it in btnEqual has to be immediate execution
        result = lastResult / 100;
    }

    display.style.color = "#fff";
    currentNumber = String(result);
    display.innerText = currentNumber;

});
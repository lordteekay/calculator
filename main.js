// const book={
//     title:"Mcmillian",
//     name:"Tokunbo",
//     surname:"adebaYo",
//     year:2012
//     // date:2013,
//     // getSummary:function(){
//     //     // return this
//     //     return `This book was written by ${this.title} `
//     // }
// }
// // console.log(book.getSummary());
// const newBook = Object.values(book).map((item)=>{
//     return item
// })
// console.log(newBook);
// function Book(title,author,year) {
//     console.log(this);
//     this.title = title,
//     this.author = author,
//     this.year= year
// }
// Book.prototype.getSummary = function () {
//     return `The book ${this.title} was written by ${this.author} in the year ${this.year}`
// }
// Book.prototype.getAge = function (years) {
//     this.years =years-this.year;
//     return `${this.title} is ${this.years} years old`
// }
// Book.prototype.revise= function (newYear) {
//     this.year = newYear;
//     this.revised = true;
// }

// const Book1 = new Book("akin and pawpaw","Ini-Edo",2011);
// const Book2 = new Book("Abrahim Adesanya","David",2013);
// Book1.getAge(2015)
// console.log(Book1.getAge(2020));
// console.log(Book1.revise(2022));
// console.log(Book2);

// function Magazine(title,author,year,month) {
//     Book.call(this,title,author,year)
//     this.month = month
// }
// Magazine.prototype = Object.create(Book.prototype)
// Magazine.prototype.constructor = Magazine;
// const mag1 = new Magazine("Mag one","You",2022,"jul");
// console.log(mag1);
// console.log(mag1.getSummary());

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }
  clear() {
    this.currentOperand = " ";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1)
  }
  appendNumber(number) {
    if(number==="." && this.currentOperand.includes(".")) return 
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOPeration(operation) {
    if(this.currentOperand==="")return
    if(this.previousOperand !==""){
        this.compute()
    }
    this.operation=operation
    this.previousOperand=this.currentOperand.toString()+" " + operation.toString()
    this.currentOperand=" "
  }
  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current =parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch(this.operation){
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        case "÷":
            computation = prev / current
            break
        default:
            return
    }
    this.currentOperand=computation
    this.operation=undefined
    this.previousOperand=""
  }
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand;
    this.previousOperandTextElement.innerText = this.previousOperand;
  }
}
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

const newCalculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    newCalculator.appendNumber(button.innerText);
    newCalculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    newCalculator.chooseOPeration(button.innerText);
    newCalculator.updateDisplay();
  });
});
equalsButton.addEventListener("click",button=>{
    newCalculator.compute()
    newCalculator.updateDisplay()
})
allClearButton.addEventListener("click",button=>{
    newCalculator.clear()
    newCalculator.updateDisplay()
})
deleteButton.addEventListener("click",()=>{
    newCalculator.delete()
    newCalculator.updateDisplay()
})
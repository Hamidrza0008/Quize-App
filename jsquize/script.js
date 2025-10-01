const question = [
    {
        question : "What is JavaScript primarily used for?",
        answers : [
            {text : "Styling web pages", correct : "false"},
            {text : "Adding interactivity to web pages", correct : "true"},
            {text : "Structuring web content", correct : "false"},
            {text : "Creating databases", correct : "false"}
        ]
    },
    {
        question : "Which keyword is used to declare a variable in JavaScript?",
        answers : [
            {text : "var", correct : "true"},
            {text : "let", correct : "true"},
            {text : "const", correct : "true"},
            {text : "All of the above", correct : "true"}
        ]
    },
    {
        question : "Which symbol is used for single-line comments in JavaScript?",
        answers : [
            {text : "//", correct : "true"},
            {text : "/*", correct : "false"},
            {text : "#", correct : "false"},
            {text : "<!--", correct : "false"}
        ]
    },
    {
        question : "How do you write 'Hello World' in an alert box?",
        answers : [
            {text : "msg('Hello World')", correct : "false"},
            {text : "alert('Hello World')", correct : "true"},
            {text : "prompt('Hello World')", correct : "false"},
            {text : "console.log('Hello World')", correct : "false"}
        ]
    },
    {
        question : "Which operator is used to assign a value to a variable?",
        answers : [
            {text : "=", correct : "true"},
            {text : "==", correct : "false"},
            {text : "===", correct : "false"},
            {text : "=>", correct : "false"}
        ]
    },
    {
        question : "What is the output of: typeof 'Hello'?",
        answers : [
            {text : "string", correct : "true"},
            {text : "text", correct : "false"},
            {text : "character", correct : "false"},
            {text : "object", correct : "false"}
        ]
    },
    {
        question : "Which method is used to convert a string into an integer in JavaScript?",
        answers : [
            {text : "parseInt()", correct : "true"},
            {text : "toInteger()", correct : "false"},
            {text : "Number.parse()", correct : "false"},
            {text : "int()", correct : "false"}
        ]
    },
    {
        question : "Which function is used to print data in the console?",
        answers : [
            {text : "print()", correct : "false"},
            {text : "console.log()", correct : "true"},
            {text : "log.console()", correct : "false"},
            {text : "echo()", correct : "false"}
        ]
    },
    {
        question : "Which operator is used to compare both value and type?",
        answers : [
            {text : "==", correct : "false"},
            {text : "===", correct : "true"},
            {text : "=", correct : "false"},
            {text : "!==", correct : "false"}
        ]
    },
    {
        question : "How do you create a function in JavaScript?",
        answers : [
            {text : "function myFunction() {}", correct : "true"},
            {text : "def myFunction() {}", correct : "false"},
            {text : "function:myFunction {}", correct : "false"},
            {text : "func myFunction() {}", correct : "false"}
        ]
    },
    {
        question : "Which method adds an element to the end of an array?",
        answers : [
            {text : "push()", correct : "true"},
            {text : "pop()", correct : "false"},
            {text : "shift()", correct : "false"},
            {text : "unshift()", correct : "false"}
        ]
    },
    {
        question : "What is the correct way to write an if statement in JavaScript?",
        answers : [
            {text : "if x > 5 then {}", correct : "false"},
            {text : "if (x > 5) {}", correct : "true"},
            {text : "if (x > 5): {}", correct : "false"},
            {text : "if {x > 5}", correct : "false"}
        ]
    }
];


let totalSeconds;
let timerInterval;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const homeBtn = document.getElementById("home-btn");

let curruntQuestionIndex = 0;
let score = 0;

function startQuiz() {
    curruntQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";

    if(timerInterval) clearInterval(timerInterval);

    totalSeconds = 60 * 2;
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    homeBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    reset();
    const curruntQuestion = question[curruntQuestionIndex];
    questionElement.textContent = (curruntQuestionIndex + 1) + ". " + curruntQuestion.question;

    curruntQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerElement.append(button);

        if(answer.correct === "true" || answer.correct === true) button.dataset.correct = "true";

        button.addEventListener("click", selectAnswer);
    });
}

function reset() {
    nextBtn.style.display = "none";
    homeBtn.style.display = "none";
    while(answerElement.firstChild) answerElement.removeChild(answerElement.firstChild);
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";

    Array.from(answerElement.children).forEach(button => {
        button.disabled = true;
        if(button.dataset.correct === "true") button.classList.add("correct");
        else if(button === selectedbtn) button.classList.add("incorrect");
    });

    if(isCorrect) score++;
    nextBtn.style.display = "block";
}

function showScore() {
    reset();
    questionElement.textContent = `Your Score is ${score} out of ${question.length}!`;
    nextBtn.textContent = "Play Again";
    nextBtn.style.display = "block";
    homeBtn.style.display = "block";

    homeBtn.addEventListener("click", () => {
        window.location.href = "../home.html";
    }, { once: true });

    clearInterval(timerInterval);
}

function handleNextbtn() {
    curruntQuestionIndex++;
    if(curruntQuestionIndex < question.length) showQuestion();
    else showScore();
}

nextBtn.addEventListener("click", () => {
    if(nextBtn.textContent === "Play Again") startQuiz();
    else handleNextbtn();
});

function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerElement.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    if(totalSeconds <= 0) {
        clearInterval(timerInterval);
        showScore();
    } else {
        totalSeconds--;
    }
}

startQuiz();

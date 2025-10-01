const question = [
    {
        question : "What is React?",
        answers : [
            {text : "A JavaScript framework", correct : "false"},
            {text : "A JavaScript library for building UIs", correct : "true"},
            {text : "A programming language", correct : "false"},
            {text : "A database", correct : "false"}
        ]
    },
    {
        question : "Who developed React?",
        answers : [
            {text : "Google", correct : "false"},
            {text : "Facebook (Meta)", correct : "true"},
            {text : "Microsoft", correct : "false"},
            {text : "Twitter", correct : "false"}
        ]
    },
    {
        question : "Which command is used to create a new React app?",
        answers : [
            {text : "npm create react-app myApp", correct : "false"},
            {text : "npx create-react-app myApp", correct : "true"},
            {text : "node create react-app", correct : "false"},
            {text : "react new app", correct : "false"}
        ]
    },
    {
        question : "What is a React component?",
        answers : [
            {text : "A reusable piece of UI", correct : "true"},
            {text : "A database table", correct : "false"},
            {text : "A CSS class", correct : "false"},
            {text : "A JavaScript variable", correct : "false"}
        ]
    },
    {
        question : "How do you write a functional component in React?",
        answers : [
            {text : "function MyComponent() { return &lt;div&gt;Hello&lt;/div&gt;; }", correct : "true"},
            {text : "component MyComponent() { return Hello }", correct : "false"},
            {text : "function:MyComponent() { return Hello }", correct : "false"},
            {text : "def MyComponent() { return Hello }", correct : "false"}
        ]
    },
    {
        question : "Which hook is used to handle state in a functional component?",
        answers : [
            {text : "useEffect", correct : "false"},
            {text : "useState", correct : "true"},
            {text : "useRef", correct : "false"},
            {text : "useContext", correct : "false"}
        ]
    },
    {
        question : "What does the useEffect hook do?",
        answers : [
            {text : "Manages component state", correct : "false"},
            {text : "Handles side effects like API calls", correct : "true"},
            {text : "Creates new components", correct : "false"},
            {text : "Returns JSX", correct : "false"}
        ]
    },
    {
        question : "What is JSX?",
        answers : [
            {text : "Java Syntax Extension", correct : "false"},
            {text : "JavaScript XML, a syntax extension for JavaScript", correct : "true"},
            {text : "JSON format", correct : "false"},
            {text : "A CSS preprocessor", correct : "false"}
        ]
    },
    {
        question : "Which method is used to render React content to the DOM?",
        answers : [
            {text : "ReactDOM.render()", correct : "true"},
            {text : "renderComponent()", correct : "false"},
            {text : "React.mount()", correct : "false"},
            {text : "component.render()", correct : "false"}
        ]
    },
    {
        question : "What is the correct way to pass data to a child component?",
        answers : [
            {text : "Using state", correct : "false"},
            {text : "Using hooks", correct : "false"},
            {text : "Using props", correct : "true"},
            {text : "Using context only", correct : "false"}
        ]
    },
    {
        question : "Which hook is used to access context in React?",
        answers : [
            {text : "useRef", correct : "false"},
            {text : "useState", correct : "false"},
            {text : "useEffect", correct : "false"},
            {text : "useContext", correct : "true"}
        ]
    },
    {
        question : "Which of the following is true about React?",
        answers : [
            {text : "React follows MVC architecture", correct : "false"},
            {text : "React is used only for backend development", correct : "false"},
            {text : "React uses a virtual DOM for better performance", correct : "true"},
            {text : "React replaces JavaScript completely", correct : "false"}
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
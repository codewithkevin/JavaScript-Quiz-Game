const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let socre = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: "HOW MANY YEARS MAKES A  CENTURIES",
        choice1: '8',
        choice2: '1900',
        choice3: '100',
        choice4: '10',
        answer: 3, 
    },
    {
        question: "WHICH OF THE FOLLOWING DEPARTMENT IS A KILLER DEPT",
        choice1: 'STAT',
        choice2: 'CS',
        choice3: 'IT',
        choice4: 'MATHS',
        answer: 4, 
    },
    {

        question: "What is 2 + 2",
        choice1: 'kelvin',
        choice2: 'kev',
        choice3: 'mike',
        choice4: 'kevin',
        answer: 4, 
    },
    {

        question: "HOW MANY DAYS MAKE A WEEK",
        choice1: '90',
        choice2: '365',
        choice3: '2',
        choice4: '7',
        answer: 4, 
    },
    
]    

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    socre = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentSocre', socre)

        return window.location.assign('/end.html')
    }

    questionCounter ++
    progressText.innerHTML =  `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    });

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct':
        'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000);
    })
});

incrementScore = num => {
    socre += num 
    scoreText.innerText = socre
}

startGame()
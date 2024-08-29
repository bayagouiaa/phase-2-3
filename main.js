<script>
    const questions = [
        {
            question: "Who is the all-time top scorer for FC Barcelona?",
            options: ["Lionel Messi", "Xavi Hernandez", "Andres Iniesta"],
            correctAnswer: 0
        },
        {
            question: "How many Champions League titles has FC Barcelona won?",
            options: ["4", "5", "6"],
            correctAnswer: 1
        },
        // Add more questions following the same structure...
    ];

    let currentQuestionIndex = 0;
    let userScore = 0;

    const startButton = document.querySelector('.start-button');
    const quizContainer = document.querySelector('.quiz-container');
    const startPage = document.querySelector('.start-page');
    const questionElement = document.querySelector('.question');
    const optionButtons = document.querySelectorAll('.option');
    const submitButton = document.querySelector('.submit-button');
    const feedbackElement = document.querySelector('.feedback');
    const resultPage = document.querySelector('.result-page');
    const finalScoreElement = document.getElementById('final-score');
    const finalMessageElement = document.getElementById('final-message');

    startButton.addEventListener('click', () => {
        startPage.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion();
    });

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionButtons.forEach((button, index) => {
            button.textContent = currentQuestion.options[index];
            button.classList.remove('selected');
        });
        feedbackElement.style.display = 'none';
    }

    optionButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            submitButton.style.backgroundColor = 'green';
        });
    });

    submitButton.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            const selectedAnswer = Array.from(optionButtons).indexOf(selectedOption);
            checkAnswer(selectedAnswer);
        }
    });

    function checkAnswer(selectedAnswer) {
        const correctAnswer = questions[currentQuestionIndex].correctAnswer;
        if (selectedAnswer === correctAnswer) {
            userScore += 3;
            feedbackElement.textContent = "Correct Answer!";
            feedbackElement.classList.add('correct');
        } else {
            feedbackElement.textContent = "Wrong Answer";
            feedbackElement.classList.add('incorrect');
            feedbackElement.innerHTML += `<div class="correct-answer">Correct Answer: ${questions[currentQuestionIndex].options[correctAnswer]}</div>`;
        }
        feedbackElement.style.display = 'block';
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setTimeout(displayQuestion, 2000);
        } else {
            setTimeout(showResult, 2000);
        }
    }

    function showResult() {
        quizContainer.style.display = 'none';
        resultPage.style.display = 'block';
        finalScoreElement.textContent = userScore;
        let finalMessage = "";
        if (userScore <= 10) {
            finalMessage = "Well, turns out you don't know much about the club 😢";
        } else if (userScore <= 20) {
            finalMessage = "You're almost there!";
        } else {
            finalMessage = "You're a true culer, congratulations!";
            // Add confetti effect here if you want to enhance it further
        }
        finalMessageElement.textContent = finalMessage;
    }
</script>

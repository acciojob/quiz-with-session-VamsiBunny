// List of quiz questions
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Initialize userAnswers from session storage, defaulting to an empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length);

// Display quiz questions and choices
function renderQuestions() {
  const questionsElement = document.getElementById("questions");
  questionsElement.innerHTML = ''; // Clear previous content

  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach((choice, j) => {
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Check if the user's answer matches this choice, and select it
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;  // Ensure the radio is checked based on saved userAnswers
      }

      // Add event listener to save the answer to sessionStorage
      choiceElement.addEventListener('change', () => saveAnswer(i, choice));

      const choiceLabel = document.createElement("label");
      choiceLabel.textContent = choice;
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceLabel);
    });

    questionsElement.appendChild(questionElement);
  });
}

// Save user answer to sessionStorage
function saveAnswer(questionIndex, answer) {
  userAnswers[questionIndex] = answer;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));  // Save progress in sessionStorage
}

// Handle quiz submission
function handleSubmit() {
  let score = 0;

  questions.forEach((question, i) => {
    if (userAnswers[i] === question.answer) {
      score++;
    }
  });

  // Save the score to localStorage
  localStorage.setItem("score", score);

  // Display score on the page
  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
}

// Load the score from localStorage if available
function loadScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore) {
    document.getElementById("score").textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  }
}

// Set up event listeners
document.getElementById("submit").addEventListener("click", handleSubmit);

// Render questions when the page loads
renderQuestions();

// Load any previously stored score if available
loadScore();

// Ensure the page is fully loaded and all elements are rendered after a reload
window.onload = () => {
  // Ensure sessionStorage is read after page load
  userAnswers = JSON.parse(sessionStorage.getItem("progress")) || new Array(questions.length);

  // Avoid redundant rendering and ensure persistence of state
  renderQuestions();
};

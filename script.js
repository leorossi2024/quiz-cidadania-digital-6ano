const questions = [
  {
    question: "O que é cidadania digital?",
    options: [
      "Usar a internet para comprar roupas.",
      "Participar de redes sociais sem limites.",
      "Agir com responsabilidade e respeito online.",
      "Compartilhar tudo que você vê na internet."
    ],
    answer: 2
  },
  {
    question: "Qual dessas atitudes é segura na internet?",
    options: [
      "Postar sua localização em tempo real.",
      "Compartilhar senhas com amigos.",
      "Ignorar atualizações de segurança.",
      "Usar senhas fortes e não compartilhá-las."
    ],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");

function showQuestion() {
  const q = questions[currentQuestion];
  quizContainer.innerHTML = \`<p><strong>${currentQuestion + 1}.</strong> \${q.question}</p>\`;
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.textContent = opt;
    div.onclick = () => selectOption(i);
    quizContainer.appendChild(div);
  });
  nextBtn.style.display = "none";
}

function selectOption(index) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll(".option");
  options.forEach((opt, i) => {
    opt.onclick = null;
    if (i === q.answer) opt.classList.add("correct");
    else if (i === index) opt.classList.add("incorrect");
  });
  if (index === q.answer) score++;
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    quizContainer.style.display = "none";
    nextBtn.style.display = "none";
    scoreContainer.style.display = "block";
    scoreContainer.innerHTML = \`<h2>Você acertou \${score} de \${questions.length} questões!</h2>\`;
  }
};

showQuestion();
const questions = [{
 question:"What is the Capital of Turkey"  , 
 options: ["Ankara", "Istanbul", "Izmir", "Bursa"],
 answer:0
},
{
question:"Which language is used for web apps",
options: ["Python", "Java", "JavaScript", "C++"],
answer:2
},
{
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
}
];
window.onload = () => {
    loadQuestion();
};
let currentQuestionIndex = 0;
let score = 0;

function loadQuestion(){
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById("question").innerText = currentQuestion.question;
    const options=document.querySelectorAll(".option");
    options.forEach((button,index)=>{
        button.innerText = currentQuestion.options[index];
        button.onclick = ()=> checkAnswer(index);
    })
};

function checkAnswer(selectedIndex){
    const correctIndex = questions[currentQuestionIndex].answer;
    const options = document.querySelectorAll(".option");
    if(selectedIndex === correctIndex){
        options[selectedIndex].style.backgroundColor = "green";
        score++;}else{
            options[selectedIndex].style.backgroundColor = "red";
            options[correctIndex].style.backgroundColor = "green";
        }
        document.getElementById("next-button").disabled = false;
}

document.getElementById("next-button").onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      resetOptions();
      loadQuestion();
    } else {
      showResults();
    }
  };
  
  function resetOptions() {
    const options = document.querySelectorAll(".option");
    options.forEach(button => (button.style.backgroundColor = ""));
    document.getElementById("next-button").disabled = true;
  }

  function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("score").innerText = `Your score: ${score}/${questions.length}`;
  }
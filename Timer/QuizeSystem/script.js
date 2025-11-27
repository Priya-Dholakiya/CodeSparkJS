let index = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionBox = document.getElementById( "questionBox" );
const optionsBox = document.getElementById( "optionsBox" );
const nextBtn = document.getElementById( "nextBtn" );
const result = document.getElementById( "result" );
const lastScore = document.getElementById( "lastScore" );

if ( localStorage.getItem( "lastScore" ) ) {
      lastScore.innerText = "Last Score: " + localStorage.getItem( "lastScore" );
}

function startTimer() {
      timeLeft = 15;
      document.getElementById( "time" ).innerText = timeLeft;

      timer = setInterval( () => {
            timeLeft--;
            document.getElementById( "time" ).innerText = timeLeft;

            if ( timeLeft === 0 ) {
                  clearInterval( timer );
                  nextQuestion();
            }
      }, 1000 );
}

function loadQuestion() {
      clearInterval( timer );
      startTimer();

      const q = questions[ index ];

      questionBox.innerText = q.question;

      document.getElementById( "progressBar" ).style.width =
            ( ( index + 1 ) / questions.length ) * 100 + "%";

      optionsBox.innerHTML = "";

      q.options.forEach( ( opt, i ) => {
            const li = document.createElement( "li" );
            li.innerText = opt;
            li.onclick = () => selectOption( i );
            optionsBox.appendChild( li );
      } );
}

function selectOption( selected ) {
      if ( selected === questions[ index ].answer ) {
            score++;
      }
      nextQuestion();
}

function nextQuestion() {
      index++;

      if ( index < questions.length ) {
            loadQuestion();
      } else {
            showResult();
      }
}

function showResult() {
      clearInterval( timer );
      questionBox.innerText = "Quiz Completed!";
      optionsBox.innerHTML = "";
      result.innerText = "Your Score: " + score;

      localStorage.setItem( "lastScore", score );

      nextBtn.style.display = "none";
}

nextBtn.onclick = nextQuestion;
loadQuestion();

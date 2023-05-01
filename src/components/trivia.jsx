import { useState, useEffect } from "react";
import axios from "axios";

const Trivia = () => {
  const [trivia, setTrivia] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [correctMessages, setCorrectMessages] = useState([
    "Way to go!",
    "That's the stuff.",
    "Right on!",
    "Nothing but net!",
    "Gold blooded.",
    "You're unstoppable.",
    "Swish!",
    "Out of the Park!",
    "Look at you!",
    "On your puter!"
  ]);
  const [incorrectMessages, setIncorrectMessages] = useState([
    "Not quite.",
    "Nope.",
    "Close!",
    "Keep trying.",
    "!@#$%^&*",
    "Almost!",
    "Oof.",
  ]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=21")
      .then((res) => {
        setTrivia(res.data.results);
        setTotalQuestions(res.data.results.length);
      })
      .catch((err) => console.log(err));
  }, []);

  const currentQuestion = trivia[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      setIsCorrectAnswer(true);
      setCheckedAnswer(true);
      const randomMessage =
        correctMessages[Math.floor(Math.random() * correctMessages.length)];
      const messageWithCorrectAnswer = `${randomMessage} The correct answer is ${currentQuestion.correct_answer}`;
      setAnswer(messageWithCorrectAnswer);
      setScore(score + 1);
    } else {
      setIsCorrectAnswer(false);
      setCheckedAnswer(false);
      const randomMessage =
        incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
      const messageWithCorrectAnswer = `${randomMessage} The correct answer is ${currentQuestion.correct_answer}`;
      setAnswer(messageWithCorrectAnswer);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < trivia.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
      setCheckedAnswer(false);
      setIsCorrectAnswer(false);
    } else {
      setGameOver(true);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (gameOver) {
    return (
      <div className="main-container">
        <div className="trivia-container">
          <h1 className="score">Your score is: {score}/{totalQuestions}</h1>
          <button className="btn-retry" onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="main-container">
      <div
        className={`trivia-container ${
          isCorrectAnswer ? "correct-answer" : ""
        }`}
      >
        {trivia.length > 0 && (
          <div className="question-container">
            <h2
              className="question"
              dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            ></h2>
  
            {currentQuestion.incorrect_answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => {
                  handleAnswer(answer);
                }}
                className={`btn-question ${answer ? "selected" : ""} ${
                  checkedAnswer && answer === currentQuestion.correct_answer
                    ? "btn-correct"
                    : ""
                } ${
                  checkedAnswer && answer !== currentQuestion.correct_answer
                    ? "btn-wrong"
                    : ""
                }`}
                disabled={checkedAnswer}
              >
                {answer}
              </button>
            ))}
            <button
              onClick={() => {
                handleAnswer(currentQuestion.correct_answer);
              }}
              className={`btn-question ${
                currentQuestion.correct_answer === answer ? "selected" : ""
              }`}
              disabled={checkedAnswer}
            >
              {currentQuestion.correct_answer}
            </button>
            {checkedAnswer && <p className="answer">{answer}</p>}
            {!checkedAnswer && answer !== "" && (
              <p className="answer">{answer}</p>
            )}
            {answer !== "" && (
              <button className="btn-next" onClick={handleNextQuestion}>
                {currentQuestionIndex === trivia.length - 1 ? "See Score" : "Next Question"}
              </button>
            )}
          </div>
        )}
        {currentQuestionIndex === trivia.length && (
          <div>
          <div className="score-container">
            <p className="score-text">Your Score:</p>
            <p className="score-number">{score}/{totalQuestions}</p>
          </div>
          <button className="btn-retry" onClick={() => window.location.reload()}>
  Retry
</button>
          </div>
        )}
      </div>
    </div>
  );  
}

export default Trivia;

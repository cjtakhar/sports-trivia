import { useState, useEffect } from "react";
import axios from "axios";

const Trivia = () => {
  const [trivia, setTrivia] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [correctMessages, setCorrectMessages] = useState([
    "Way to go!",
    "That's the stuff.",
    "Right on!",
    "Nothing but net!",
    "Gold blooded.",
    "Bet.",
    "You're unstoppable.",
    "Swish!",
    "Out of the Park!",
    "Look at you!",
    "On your puter!",
    "You're on fire!",
  ]);
  const [incorrectMessages, setIncorrectMessages] = useState([
    "Not quite.",
    "Nope.",
    "Close!",
    "Keep trying.",
    "!@#$%^&*",
    "Almost!",
    "Negative.",
    "That was a hard one.",
  ]);

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple"
        );
        setTrivia(response.data.results);
        setTotalQuestions(response.data.results.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrivia();
  }, []);

  const shuffleAnswers = (answers) => {
    // Create a new array with all answer options, including the correct answer
    const allAnswers = [...answers, trivia[currentQuestionIndex].correct_answer];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  };

  const handleAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);
    setIsCorrectAnswer(selectedAnswer === trivia[currentQuestionIndex].correct_answer);
    setCheckedAnswer(true);
    if (selectedAnswer === trivia[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswer("");
    setIsCorrectAnswer(false);
    setCheckedAnswer(false);
    if (currentQuestionIndex === trivia.length - 1) {
      setGameOver(true);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
<div className="main-container">
  {gameOver ? (
    <div className="score-container">
      <p className="score-text">Your Score:</p>
      <p className="score-number">{score}/{totalQuestions}</p>
      <button className="btn-retry" onClick={handleRetry}>
        Retry
      </button>
    </div>
  ) : (
    <div className={`trivia-container ${isCorrectAnswer ? "correct-answer" : ""}`}>
      {trivia.length > 0 && (
        <div className="question-container">
          <div className="question-number">Sports Trivia {currentQuestionIndex + 1} of {totalQuestions}</div>
          <h2 className="question" dangerouslySetInnerHTML={{ __html: trivia[currentQuestionIndex].question }} />
          {shuffleAnswers([...trivia[currentQuestionIndex].incorrect_answers]).map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className={`btn-question ${answer ? "selected" : ""} ${
                checkedAnswer && answer === trivia[currentQuestionIndex].correct_answer ? "btn-correct" : ""
              } ${
                checkedAnswer && answer !== trivia[currentQuestionIndex].correct_answer ? "btn-wrong" : ""
              }`}
              disabled={checkedAnswer}
            >
              {answer}
            </button>
          ))}
          {checkedAnswer && (
            <>
              <p className={`feedback ${isCorrectAnswer ? "correct-feedback" : "incorrect-feedback"}`}>
                {isCorrectAnswer ? correctMessages[Math.floor(Math.random() * correctMessages.length)] : incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)]}
              </p>
              <h2 className="answer-display">The correct answer is {trivia[currentQuestionIndex].correct_answer}</h2>
            </>
          )}
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
    </div>
  )}
</div>

  );
  
   
};

export default Trivia;

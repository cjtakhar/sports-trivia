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
  ])

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=21")
      .then((res) => {
        setTrivia(res.data.results);
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
      alert("Trivia completed!");
    }
  };

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
                Next Question
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trivia;

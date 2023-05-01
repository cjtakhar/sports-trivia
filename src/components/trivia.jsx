import { useState, useEffect } from "react";
import axios from "axios";

const Trivia = () => {
  const [trivia, setTrivia] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [checkedAnswer, setCheckedAnswer] = useState(false);

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
      setCheckedAnswer(true);
    } else {
      setCheckedAnswer(false);
    }
    setAnswer(selectedAnswer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < trivia.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer("");
      setCheckedAnswer(false);
    } else {
      alert("Trivia completed!");
    }
  };

  return (
    <div className="main-container">
      <div className="trivia-container">
        {trivia.length > 0 && (
          <div>
            <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>

            {currentQuestion.incorrect_answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => {
                  handleAnswer(answer);
                }}
                className={`btn-question ${answer ? "selected" : ""}`}
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
            {checkedAnswer && (
              <p className="answer">Correct! The answer is {currentQuestion.correct_answer}</p>
            )}
            {!checkedAnswer && answer !== "" && (
              <p className="answer">
                {currentQuestion.correct_answer}
              </p>
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






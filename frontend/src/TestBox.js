import React, { useState, useEffect } from "react";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import "./TestBox.css";
import moment from "moment";

function TestBox(props) {
  const [questions, setQuestions] = useState(props.quiz.questions);
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(1);
  const [number, setNumber] = useState(0);
  const [quizName, setQuizName] = useState(props.quiz.name);
  const [status, setStatus] = useState(null);
  const [hint, setHint] = useState(null);
  const [disable, setdisable] = useState(false);
  const [startTime, setTime] = useState(null);

  let options = ["a", "b", "c", "d"];

  useEffect(() => {
    let time = new Date().getTime()
    setTime(time);
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    setNumber(number + 1);
    setdisable(false);
    setHint(null);
    setStatus(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let minutes = Math.round((new Date().getTime() - startTime) / 60000);
    setDuration(minutes);
    const requestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quiz_id: props.quiz.quiz_id,
        username: props.user,
        score: score,
        duration: duration,
      }),
    };
    fetch("/result/save-result", requestOption).then((response) => {
      if (response.ok) {
        console.log("submitted");
        setNumber(number + 1);
      }
    });
  };
  const computeAnswer = (event, selected_option, correct) => {
    setdisable(true);
    if (selected_option === correct) {
      setScore(score + 1);
      setStatus("correct");
    } else {
      setStatus("wrong");
      setHint(correct);
    }
  };

  if (number < 10) {
    return (
      <div className='testbox'>
        <div className='textbox-top'>
          <div className='test-question'>{(number+1)+". "+questions[number].question}</div>
          <div className='score'>
            Score:<span>{score}</span>
          </div>
        </div>
        <div className='options'>
          {questions[number].options.map((option, ind) => {
            return (
              <button
                className='default-btn'
                onClick={(e) => {
                  e.preventDefault();
                  computeAnswer(
                    e,
                    options[ind],
                    questions[number].correct_option,
                  );
                }}
                disabled={disable}>
                {options[ind] + ". " + option}
              </button>
            );
          })}
        </div>
        <div className='testbox-bottom'>
          {status === "correct" && (
            <div className={`status ${status}`}>
              <CheckCircleRoundedIcon />
              {status}
            </div>
          )}
          {status === "wrong" && (
            <div className={`status ${status}`}>
              <CancelRoundedIcon />
              {status}
            </div>
          )}
          {hint && <div className='hint'>Correct option is {hint}</div>}
        </div>
        <button
          onClick={number < 9 ? handleNext : handleSubmit}
          className='btn-next'>
          {number < 9 ? "Next" : "Submit"}
        </button>
      </div>
    );
  } else {
    return (
      <div className='instant-result'>
        <h1 className='quiz-title'>{quizName}</h1>
        <p className='result-passorfail'>
          Result :{" "}
          <span>
            {score * 10 < parseInt(props.quiz.pass_percentage)
              ? "Fail"
              : "Pass"}
          </span>
        </p>
        <p className='result-precentage'>
          Percentage : <span>{score * 10 + "%"}</span>
        </p>
        <p className='duration'>
          Duration : <span>{duration + " minutes"}</span>
        </p>
      </div>
    );
  }
}

export default TestBox;

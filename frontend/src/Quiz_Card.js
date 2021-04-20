import React from "react";
import "./Quiz_card.css";

function Quiz_Card(props) {
  return (
    <div className='quiz-card'>
      <h3 className='quiz-card-title'>{props.name}</h3>
      <div className='quiz_details'>
        <div className='row'>
          <p>
            Category : <span>{props.category+" "}</span>
          </p>
          <p>
            Difficulty : <span>{props.difficulty}</span>
          </p>
        </div>
        <div className='row'>
          <p>
            Percentage: <span>{props.pass_percentage}%</span>
          </p>
          <p>
            Submission: <span>{props.submissions}</span>
          </p>
        </div>
      </div>
      <div className='buttons'>
        {!props.is_student && (
          <>
            <button
              className='see_results'
              onClick={(e) => {
                e.preventDefault();
                props.handleShowResult(props.quiz_id);
              }}>
              See result
            </button>
            <button
              className='delete'
              onClick={(e) => {
                e.preventDefault();
                props.handleQuizDelete(props.quiz_id);
              }}>
              Delete
            </button>
          </>
        )}
        {props.is_student && (
          <button
            className='start'
            onClick={(e) => {
              e.preventDefault();
              props.handletest(props.quiz_id);
            }}>
            Start
          </button>
        )}
      </div>
    </div>
  );
}

export default Quiz_Card;

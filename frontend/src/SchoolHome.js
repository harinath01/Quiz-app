import React, { useState } from "react";
import "./SchoolHome.css";
import CreateQuiz from "./CreateQuiz";
import Quiz_Card from "./Quiz_Card";
import Result from "./Result";
import Header from "./Header";

function SchoolHome(props) {
  const [showCreateQuiz, setShow] = useState(false);
  const [showResult, setshowResult] = useState(false);
  const [resultQuiz_id, setResultQuiz_id] = useState(null);
  
  const handleCreateQuiz = () => {
    setShow(!showCreateQuiz);
  };

  const handleShowResult = (id) => {
    if (resultQuiz_id === null) {
      setResultQuiz_id(id);
      setshowResult(true);
    } else {
      setResultQuiz_id(null)
      setshowResult(false);
    }
  };


  if (!showResult) {
    return (
      <div className='school-home'>
        <Header handleLogout={props.handleLogout} back={showCreateQuiz} backCallBack={handleCreateQuiz}/>
        <div className='title-bar'>
          <h1 className='title'>{props.user}</h1>
          {!showCreateQuiz && (
            <button className='btn-create' onClick={handleCreateQuiz}>
              Create Quiz
            </button>
          )}
        </div>
        {!showCreateQuiz && (
          <div className='quizes_bar'>
            {props.quizes.map((quiz) => {
              return (
                <Quiz_Card
                  {...quiz}
                  is_student={false}
                  handleShowResult={handleShowResult}
                  handleQuizDelete={props.handleQuizDelete}
                />
              );
            })}
          </div>
        )}
        {showCreateQuiz && (
          <CreateQuiz
            handleCreateQuiz={handleCreateQuiz}
            handleRefresh={props.handleRefresh}
          />
        )}
      </div>
    );
  } else {
    return (
      <Result
        id={resultQuiz_id}
        handleShowResult={handleShowResult}
      />
    );
  }
}

export default SchoolHome;

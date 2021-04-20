import React, { useState } from "react";
import "./StudentHome.css";
import Quiz_Card from "./Quiz_Card";
import TestBox from "./TestBox";
import Header from "./Header";

function StudentHome(props) {
  const [showtestBox, SetShowTestBox] = useState(false);
  const [quiz, setQuiz] = useState([]);

  const handletest = (id) => {
    if (showtestBox) {
      SetShowTestBox(false);
    } else {
      const requestOption = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz_id: id }),
      };
      async function fetchquiz() {
        let response = await fetch("/quizes/take-quiz", requestOption)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return null;
          })
          .then((data) => {
            if (data !== null) {
              setQuiz(data);
              SetShowTestBox(true);
            }
          });
      }
      fetchquiz();
    }
  };
  return (
    <div className='student-home'>
      <Header
        handleLogout={props.handleLogout}
        back={showtestBox}
        backCallBack={handletest}
      />
      <h1 className='title'>{props.school}</h1>
      {!showtestBox && (
        <div className='quizes_bar'>
          {props.quizes.map((quiz, index) => {
            return (
              <Quiz_Card {...quiz} is_student={true} handletest={handletest} />
            );
          })}
        </div>
      )}
      {showtestBox && <TestBox quiz={quiz} user={props.user} />}
    </div>
  );
}

export default StudentHome;

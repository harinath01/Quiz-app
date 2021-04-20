import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { animateScroll as scroll } from "react-scroll";
import CreateQuestion from "./CreateQuestion";
import "./CreateQuiz.css";

function CreateQuiz(props) {
  const [category, setCategory] = useState("none");
  const [category_name, setCategory_name] = useState("none");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("none");
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(null);
  const [passpercentage, setPassPercentage] = useState(0);
  const [error1, setError1] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleChange = (e) => {
    setCategory(parseInt(e));
    console.log(typeof(category),category)
    switch (parseInt(category)) {
      case 18:
        setCategory_name("Computer");
        break;
      case 19:
        setCategory_name("Mathemetics");
        break;
      case 21:
        setCategory_name("Sports");
        break;
      case 22:
        setCategory_name("geography");
        break;
      case 23:
        setCategory_name("History");
        break;
      default:
        setCategory_name('basic')
        break
    }
  };
  const handleDifficulty = (event) => {
    setDifficulty(event.target.value);
  };
  const handlePasspercentage = (event) => {
    setPassPercentage(parseInt(event.target.value));
  };

  const convertData = (raw_data) => {
    let correct_option;
    let option = ["a", "b", "c", "d"];
    const getOptions = (array, correct_answer) => {
      array.push(correct_answer);
      let sorted_array = array.sort(() => Math.random() - 0.5);
      correct_option = option[array.indexOf(correct_answer)];
      return sorted_array;
    };
    let arr = raw_data.map((array) => {
      return {
        question: array.question,
        options: getOptions(array.incorrect_answers, array.correct_answer),
        correct_option: correct_option,
      };
    });
    setQuestions([]);
    setQuestions(arr);
    scroll.scrollToBottom();
  };

  const handleGetquestion = (event) => {
    event.preventDefault();
    if (category === "none" || difficulty === "none") {
      setError("select the category and difficulty correctly");
    } else {
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`,
      )
        .then((response) => response.json())
        .then((data) => {
          convertData(data.results);
        });
    }
  };

  const handlePushquestion = (data) => {
    let newarr = [...questions];
    newarr.push(data);
    setQuestions(newarr);
    scroll.scrollToBottom();
  };

  const handleSubmit = () => {
    if (name === "") {
      setError1("enter the quiz name");
    } else if (category_name === "none" || difficulty === "none") {
      setError1("select the category and difficulty correctly");
    } else if (passpercentage === 0) {
      setError1("enter the pass percentage");
    } else {
      let requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          category: category_name,
          difficulty: difficulty,
          questions: questions,
          pass_percentage: passpercentage,
        }),
      };
      fetch("/quizes/save-quiz", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return null;
        })
        .then((data) => {
          if (data) {
            props.handleCreateQuiz();
            props.handleRefresh();
          }
        });
    }
  };

  return (
    <div className='create-quiz'>
      <div className='create-question'>
        <input
          type='text'
          placeholder='Enter the Quiz Name'
          onChange={handleNameChange}
        />
        <Select value={category} onChange={(e) => { handleChange(e.target.value) }} className='dropdown'>
          <MenuItem value='none' disabled={true}>
            Select category
          </MenuItem>
          <MenuItem value={23}>History</MenuItem>
          <MenuItem value={22}>Geography</MenuItem>
          <MenuItem value={19}>Mathemetics</MenuItem>
          <MenuItem value={18}>Computer Science</MenuItem>
          <MenuItem value={21}>Sports</MenuItem>
        </Select>
        <Select
          value={difficulty}
          onChange={handleDifficulty}
          className='dropdown'>
          <MenuItem value='none' disabled>
            Select Difficulty
          </MenuItem>
          <MenuItem value={"easy"}>Easy</MenuItem>
          <MenuItem value={"medium"}>Medium</MenuItem>
          <MenuItem value={"hard"}>Hard</MenuItem>
        </Select>
        {error && <p className='error'>{error}</p>}
        <button className='get-question' onClick={handleGetquestion}>
          Get questions
        </button>
        <p className='helpertext'>*above one need network connection</p>
        <hr></hr>
        <h1 className='heading2'>Questions</h1>
        <div className='enteredquestion'>
          {questions.map((question, ind) => {
            return (
              <div className='question-box'>
                <p className='question'>
                  {ind + 1}. {question.question}
                </p>
                <div id='group'>
                  {question.options.map((option, index) => {
                    let options = ["a", "b", "c", "d"];
                    return (
                      <label className='radio'>
                        {question.correct_option === options[index] ? (
                          <input
                            type='radio'
                            name={`option${ind}`}
                            value={options[index]}
                            defaultChecked
                          />
                        ) : (
                          <input
                            type='radio'
                            name={`option${index}`}
                            value={options[index]}
                            disabled='true'
                          />
                        )}
                        {" " + option}
                        <br></br>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {questions.length < 9 && (
            <CreateQuestion handlePushquestion={handlePushquestion} />
          )}
          <input
            type='number'
            className='passinput'
            max='100'
            onChange={handlePasspercentage}
            placeholder='Enter the pass percentage (10 to 100)'
          />
        </div>
        {error1 && <p className='error'>{error1}</p>}
        {questions.length >= 9 && (
          <>
            <button className='btn-submit' onClick={handleSubmit}>
              submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateQuiz;

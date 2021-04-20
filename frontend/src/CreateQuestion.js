import React, { Component } from "react";
import './CreateQuestion.css'

export default class CreateQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      correct_answer: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      error: null,
    };
  }
  handleInput = (event, field) => {
    this.setState({ [field]: event.target.value });
  };
  handleCorrectAnswer = (event) => {
    this.setState({ correct_answer: event.target.value });
  };
  convertData = (e) => {
    e.preventDefault()
    if (this.state.question === "") {
      this.setState({ error: "enter the question" });
    } else if (
      this.state.option1 === "" ||
      this.state.option2 === "" ||
      this.state.option3 === "" ||
      this.state.option4 === ""
    ) {
      this.setState({ error: "enter the options correctly" });
    } else {
      let data = {
        question: this.state.question,
        options: [
          this.state.option1,
          this.state.option2,
          this.state.option3,
          this.state.option4,
        ],
        correct_option: this.state.correct_answer,
      };
      this.props.handlePushquestion(data);
      this.setState({
        question: "",
        correct_answer: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        error: null,
      });
    }
  };
  get = (val) => {
    switch (val) {
      case "option1":
        return this.state.option1;
      case "option2":
        return this.state.option2;
      case "option3":
        return this.state.option3;
      case "option4":
        return this.state.option4;
    }
    
  }
  render() {
    return (
      <div className='create-question'>
        <form className='add-question'>
          <h1>Create a question</h1>
          <input
            type='text'
            className='question-input'
            value={this.state.question}
            placeholder='Enter the question'
            onChange={(event) => {
              this.handleInput(event, "question");
            }}
          />
          <div className='question-options'>
            {["a", "b", "c", "d"].map((val, index) => {
              return (
                <label className='radio'>
                  <input
                    type='radio'
                    value={val}
                    onChange={this.handleCorrectAnswer}
                    name='option'
                  />
                  <input
                    type='text'
                    value={this.get(`option${index + 1}`)}
                    placeholder={`option ${val}`}
                    onChange={(event) => {
                      this.handleInput(event, `option${index + 1}`);
                    }}
                  /><br></br>
                </label>
              );
            })}
          </div>
          <p className='helpertext'>Select the correct option</p>
          {this.state.error && <p className='error'>{this.state.error}</p>}
          <button className='btn-next' onClick={this.convertData}>
            Next
          </button>
        </form>
      </div>
    );
  }
}

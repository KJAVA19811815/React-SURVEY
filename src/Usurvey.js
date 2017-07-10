import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

var config = {
    apiKey: "AIzaSyDFBiTa6xDx8oRwenXQiMWo6REXPMPfQhk",
    authDomain: "usurvey-faf28.firebaseapp.com",
    databaseURL: "https://usurvey-faf28.firebaseio.com",
    projectId: "usurvey-faf28",
    storageBucket: "usurvey-faf28.appspot.com",
    messagingSenderId: "328535776108"
  };
  firebase.initializeApp(config);

class Usurvey extends Component {
  nameSubmit(event) {
    var studentName = this.refs.name.value;
    this.setState({studentName: studentName}, function() {
      console.log(this.state);
    });

  }

  answerSelected(event) {
    var answers = this.state.answers;
    if(event.target.name === 'answer1') {
      answers.answer1 = event.target.value;
    } else if(event.target.name === 'answer2') {
        answers.answer2 = event.target.value;
      } else if(event.target.name === 'answer3') {
          answers.answer3 = event.target.value;
        }
        this.setState({answers: answers}, function() {
          console.log(this.state);
        });
    }

  questionSubmit() {
    firebase.database().ref('uSurvey/'+this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});

  }

  constructor(props) {
    super(props)

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer3: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this)
      this.answerSelected = this.answerSelected.bind(this)
      this.questionSubmit = this.questionSubmit.bind(this)
  }
  render() {
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted === false) {
      studentName = <div>
        <h1>What is your name?</h1>
        <form onSubmit={this.nameSubmit}>
          <input className="namy" type="text" ref="name"/>
        </form>
      </div>;

      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted === false) {
      studentName = <h1>Welcome to Usurvey, {this.state.studentName}</h1>;
      questions = <div>
        <h2>Here are some questions:</h2>
        <form onSubmit={this.questionSubmit}>
          <div className="card">
            <label>What kind of courses you like the most?</label><br />
            <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Tech
            <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
            <input type="radio" name="answer1" value="Sales" onChange={this.answerSelected} />Sales

          </div>
          <div className="card">
            <label>What kind of movies you like the most?</label><br />
            <input type="radio" name="answer2" value="action" onChange={this.answerSelected} />action
            <input type="radio" name="answer2" value="comedy" onChange={this.answerSelected} />comedy
            <input type="radio" name="answer2" value="drama" onChange={this.answerSelected} />drama

          </div>
          <div className="card">
            <label>What kind of music you like the most?</label><br />
            <input type="radio" name="answer3" value="rock" onChange={this.answerSelected} />rock
            <input type="radio" name="answer3" value="pop" onChange={this.answerSelected} />pop
            <input type="radio" name="answer3" value="rap" onChange={this.answerSelected} />rap

          </div>
          <input className="feedback-button" type="submit" value="submit" />
        </form>
      </div>
    } else if(this.state.isSubmitted === true) {
      studentName = <h1>thanks, {this.state.studentName}</h1>
    }
    return(
      <div>
        {studentName}
        -------------
        {questions}
      </div>
    )
  }
}

export default Usurvey;

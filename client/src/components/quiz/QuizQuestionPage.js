import React, { Component } from 'react'

import QuizTimer from './QuizTimer'

class QuizQuestionPage extends Component {
    state = {
        userAnswer: -1,    //current users answer
        currentIndex:0,  //current questions index
        options: [],       //the four options
        answers: [],
        quizEnd: 0,
        disabled: true
    }
    

    //Component that holds the current quiz
    loadQuiz = () => {
        const {currentIndex} = this.state //get the current index
        this.setState(() => {
            return {
                question: this.props.questions[currentIndex].question,
                options : this.props.questions[currentIndex].options,
                answer: this.props.questions[currentIndex].answer          
            }
        }
        )
    }

    //Handles Click event for the next button
    nextQuestionHander = () => {
        const {userAnswer, answers} = this.state
        const newAnswers = [...answers, userAnswer]
        this.setState({
            userAnswer: -1,
            currentIndex: this.state.currentIndex + 1,
            answers: newAnswers
        })
    }

    //Load the quiz once the component mounts
    componentDidMount(){
        this.loadQuiz();
    }

    //Update the component
    componentDidUpdate(prevProps, prevState){
        const {currentIndex} = this.state;
        if(this.state.currentIndex !== prevState.currentIndex){
            this.setState(() => {
                return {
                    disabled: true,
                    question: this.props.questions[currentIndex].question,
                    options : this.props.questions[currentIndex].options,
                    answer: this.props.questions[currentIndex].answer          
                }
            });

        }
    }

    //Check the answer
    checkAnswer = answer => {
        this.setState({
            userAnswer: answer,
            disabled:false
        })
    }

    //Responds to the click of the finish button
    finishHandler = () => {
        const {userAnswer, answers} = this.state
        const newAnswers = [...answers, userAnswer]

        this.setState({
            quizEnd: 1 //normal end
        })

        this.props.submitAnswers(newAnswers)
    }    

    notifyTimerEnd = ()=> {
        this.setState({
            quizEnd: 2  //timer end
        })  
    }

    render() {
        const {question, options, currentIndex, userAnswer, quizEnd} = this.state //get the current state       
        if(quizEnd === 1) {
            return (
                this.props.score >= 0 ? 
                <div>
                    <h4>Final score is {this.props.score} points                        
                    </h4>
                    <h4>You can review the quiz in My Profile.</h4>
                </div> : <h4>Waiting for final score...</h4>
            )
        } else if(quizEnd === 2) {
            return  <div>
                        <h4>Time is up.</h4>
                        <h4>Please try again.</h4>
                    </div>
        }
               
        return (
            <div>
                <QuizTimer initialMinute={5} initialSeconds={0} notifyTimerEnd={this.notifyTimerEnd} />
                <h2>{question}</h2>
                <span>{`Question ${currentIndex+1} of ${this.props.questions.length}`}</span>
                {options.map((option,index) => (  //for each option, new paragraph
                    <p key={index} 
                        className={`options ${userAnswer === index ? "selected" : null}`}
                        onClick= {() => this.checkAnswer(index)}>
                        {option}
                    </p>
                ))}
                {
                    !this.state.disabled && currentIndex < this.props.questions.length -1 &&  
                    // Next button only displays if the above is true
                        <span 
                            className="get-started-btn" 
                            onClick = {this.nextQuestionHander}
                        >Next Question</span>
                }
                 {  !this.state.disabled && currentIndex === this.props.questions.length -1 &&
                        <span
                        className="get-started-btn"
                        onClick = {this.finishHandler}
                        >Finish</span>
                 }
            </div>
        )
    }
}

export default QuizQuestionPage

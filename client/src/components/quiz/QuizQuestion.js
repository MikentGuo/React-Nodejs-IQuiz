import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import QuizQuestionPage from './QuizQuestionPage'

import ReactLoading from 'react-loading';

export default function QuizQuestion() {
    const {state} = useLocation()
    const [data] = useState(state)
    const [questions, setQuestions] = useState(null)
    const [score, setScore] = useState(-1)
    
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "quiz/question/" + state.id, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {            
            const data = res.data.questionList.map( (item)=>{
                return {
                    id: item.id,
                    question: item.body,
                    options: [item.answer1, item.answer2, item.answer3, item.answer4],
                }
            })
            //console.log("question list",data)
            setQuestions(data)
        })
    },[]);

    const submitAnswers = (answers) => {
        const answerList = answers.map( (item, index)=>{
            return {
                questionId: questions[index].id,
                answer: item
            }
        })
        const dataPost = {
            quizCategory: data.id,
            answerList
        }
        axios.post(process.env.REACT_APP_SERVER_URL + "quiz/answer", dataPost, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            //console.log("submitAnswers", res)
            setScore(res.data.score)
        })        
    }
    
    return (
        <main id="main">           
            <div className="breadcrumbs" data-aos="fade-in">
                <div className="container d-flex justify-content-center">
                    <h2>{data.title}</h2>                             
                    <h2><Link to={"/quiz/detail/"} state={data} className="get-started-btn">Back</Link></h2>
                </div>                
            </div>            
            <section id="about" className="about">
                <div className="container" data-aos="fade-up">                    
                    {questions ? <QuizQuestionPage 
                                    questions={questions}
                                    score={score}
                                    submitAnswers={submitAnswers}
                                 />
                              : (
                                <div className="col-lg-2 container justify-content-center">
                                    <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                                  </div>
                              )
                    }         
                </div>            
            </section>
        </main>
    )
}

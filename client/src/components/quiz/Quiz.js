import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import QuizItem from "./QuizItem"
import TotalScoreRank from './TotalScoreRank'

import ReactLoading from 'react-loading';

export default function Quiz() {
    const [quizList, setQuizList] = useState(null)

    useEffect( ()=>{
        Axios.get(process.env.REACT_APP_SERVER_URL + "quiz/list").then(res => {
           const data = res.data.quizList.map( (item) => {
               return {
                   "id": item.id,
                   "type": item.category,
                   "title": item.category,
                   "brief": item.brief,
                   "img": process.env.REACT_APP_SERVER_URL+item.imageFilePath,
                   "detail": item.detail,        
                   "questionNum": item.quizSize,
                   "timeLimit": item.timeLimit,
                   "userNum": item.totalPicked
               }
           })             
           setQuizList(data)
        }, err => {
            console.log(err)
        })

        return () => {
            //console.log('Quiz cleaned up');
        };        
    },[])


    return (
        <main id="main">   
            <div className="breadcrumbs" data-aos="fade-in">
                <div className="container">
                    <h2>Quiz</h2>
                </div>
            </div>
            <section id="courses" className="courses">
                <div className="container" data-aos="fade-up">
                    <div className="section-title">
                        <h2>Quiz</h2>
                    </div>
                    <div className="row" data-aos="zoom-in" data-aos-delay="100">                        
                    {
                        quizList ? quizList.map( (quiz)=> (                                    
                            <QuizItem key={quiz.id} quiz={quiz} />
                        )):(
                            <div className="col-lg-2 container justify-content-center">
                              <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                            </div>               
                        )
                    }  
                    </div>
                </div>
            </section>
            <TotalScoreRank />
        </main>
    )
}

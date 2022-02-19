import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import LeaderBoard from './LeaderBoard'
import { AuthContext } from '../public/Auth'
//import LeaderBoardData from '../../mock/LeaderBoard.json'

export default function QuizDetailItem(props) {
    const { authState } = useContext(AuthContext)    
    const { quiz } = props

    const [leaderboard, setLeaderboard] = useState(null) 

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "quiz/leaderboard/" + quiz.id).then(res => {
            setLeaderboard(res.data.leaderboard)            
            //setLeaderboard(LeaderBoardData)
        })

        return () => {
            //console.log("Event 1unmounted", eventList)
        };
    },[quiz.id]);


    return (
        <section id="course-details" className="course-details">
            <div className="container" data-aos="fade-up">

                <div className="row">
                    <div className="col-lg-8">
                        <img src={quiz.img} className="img-fluid" alt="" />                        
                        <h3>{quiz.title}</h3>
                        {/* <p>{quiz.detail}</p> */}
                        {quiz.detail.split("\n").map((i,key) => {
                            return <div key={key}>{i}</div>;
                        })}
                        <br/>
                        <div className="row">
                            <div className="course-info d-flex justify-content-between align-items-center">  
                                <h5>Number of Questions</h5>
                                <p>{quiz.questionNum}</p>
                            </div>
                    
                            <div className="course-info d-flex justify-content-between align-items-center">
                                <h5>Time Limit</h5>
                                <p>{quiz.timeLimit/60} minutes</p>
                            </div>
                        </div>    
                        {
                            authState.status ? <h2><Link to="/quiz/question" state={quiz} className="get-started-btn">Start Quiz</Link></h2>
                                            : (
                                            <div>
                                                <h4><b>Please sign in to start quiz</b></h4>
                                            </div>
                                            )
                        }                                      
                    </div>
                    <div className="col-lg-4">
                        <LeaderBoard users={leaderboard} />             
                    </div>
                </div>
            </div>   
        </section>

    )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function QuizItem(props) {
    const {quiz} = props
    return (
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div className="course-item">
                <img src={quiz.img} className="img-fluid course-img" alt="..." />
                <div className="course-content">
                    <h2><Link to={"/quiz/detail"} state={quiz} className="get-started-btn">{quiz.title}</Link></h2>
                    <div className="trainer d-flex justify-content-between align-items-center">
                        <div className="trainer-profile d-flex align-items-center">
                            <span>{quiz.brief}</span>
                        </div>
                        <div className="trainer-rank d-flex align-items-center">
                            <i className="bx bx-user">{quiz.userNum}</i>
                        </div>
                    </div>
                </div>                
            </div>            
        </div>
    )
}

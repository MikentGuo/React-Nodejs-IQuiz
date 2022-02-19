import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

import QuizDetailItem from './QuizDetailItem'


export default function QuizDetail() {
    const {state} = useLocation()
    const [data] = useState(state)
    
    return (
        <main id="main" data-aos="fade-in">   
            <div className="breadcrumbs">
                <div className="container d-flex justify-content-center">
                    <h2>Quiz Detail</h2>
                    <h2><Link to={"/quiz"} className="get-started-btn">Back</Link></h2>
                </div>                
            </div>
            {
                <QuizDetailItem quiz={data} />
            }
        </main>  
    )
}

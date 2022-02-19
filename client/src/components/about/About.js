import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { DataStat } from '../public/DataStat'
import Counts from '../public/Counts'
import Testimonial from './Testimonial'

export default function About() {
    const [dataCounts, setDataCounts] = useState(null)

    useEffect(() => {

        axios.get(process.env.REACT_APP_SERVER_URL + "stat/counts")
            .then(res => {
                DataStat[0].end = res.data.countUser.toString()
                DataStat[1].end = res.data.countUserQuiz.toString()
                DataStat[2].end = res.data.countQuestion.toString()
                DataStat[3].end = res.data.countEvent.toString()
                setDataCounts(DataStat)            
            })

        return () => {
            //console.log("about 1unmounted")
        };
    },[]);

    return (
        <main id="main">
            <div className="breadcrumbs" data-aos="fade-in">
                <div className="container">
                    <h2>About Us</h2>            
                </div>
            </div>
        
            <section id="about" className="about">
                <div className="container" data-aos="fade-up">

                    <div className="row">
                        <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100">
                            <img src="assets/img/about.jpg" className="img-fluid" alt="" />
                        </div>
                        <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content">
                            <h3>IQuiz is a game-based learning platform </h3>
                            <p className="fst-italic">
                            IQuiz can be used to review students' knowledge, for formative assessment, or as a break from traditional classroom activities or to practice interview skills as job seekers.
                            </p>
                            <ul>
                                <li><i className="bi bi-check-circle"></i> Test your knowledge and skills with thousands of questions</li>
                                <li><i className="bi bi-check-circle"></i> Learning with fun games</li>
                                <li><i className="bi bi-check-circle"></i> Compete with your friends and have fun together</li>
                            </ul>
                            <p>
                                Join us now, it's free!
                            </p>

                        </div>
                    </div>

                </div>
            </section>

            <Counts data={dataCounts}/>
            <Testimonial/>
        </main>
    
    )
}

import { useState, useEffect } from 'react'
import axios from 'axios';

import { DataStat } from '../public/DataStat'
import Counts from '../public/Counts'
import Hero from './Hero'
import Popular from './Popular'
import WhyUs from './WhyUs'

export default function Home() {
    const [dataCounts, setDataCounts] = useState(null) 
    const [popularQuiz, setPopularQuiz] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "stat/counts").then(res => {
            DataStat[0].end = res.data.countUser.toString()
            DataStat[1].end = res.data.countUserQuiz.toString()
            DataStat[2].end = res.data.countQuestion.toString()
            DataStat[3].end = res.data.countEvent.toString()
            setDataCounts(DataStat)            
        })

        axios.get(process.env.REACT_APP_SERVER_URL + "stat/popular").then(res => {
            //console.log("popular", res.data)
            const data = res.data.map( (item) => {
                const quiz = {
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
                return quiz
            })
            setPopularQuiz(data)
        })        

        return () => {
            //console.log("home 1unmounted")
        };
    },[]);

    return (
        <main id="main">
            <Hero />
            <WhyUs />
            <Counts data={dataCounts}/>
            <Popular data={popularQuiz}/>
        </main>
    )
}

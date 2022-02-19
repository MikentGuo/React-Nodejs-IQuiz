import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {jsPDF} from 'jspdf';
import * as html2canvas from 'html2canvas'

export default function QuizDetail(props) {
    const quiz = props.quiz
    const [questionList, setQuestionList] = useState([])
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "users/questionlist/" + quiz.id, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setQuestionList(res.data.questionList)
        })
    }, [])

    const printTable = () => {
        const input = document.getElementById('tableToPrint')
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png')
                const pdf = new jsPDF('p', 'pt', 'a4', false)
                pdf.addImage(imgData, 'PNG', 0, 0, 600, 0, undefined, false)
                pdf.save("quiz.pdf")
            })
    }
    console.log(questionList)
    return (
        <div >
            <div className="btn btn-primary btn-sm mb-3" onClick={printTable}> Save as pdf </div>
            <table className="table table-striped table-bordered" id="tableToPrint">
                <thead className="table-dark">
                    <tr>
                        <th width="30%"> Question</th>
                        <th width="20%"> Code demo </th>
                        <th> Choices </th>
                        <th width="10%"> Result </th>
                    </tr>
                </thead>
                <tbody>
                    {questionList.map((question, i) => {
                        return (
                            <tr key={i}>
                                <td>{question.Question.body}</td>
                                <td>{question.Question.codeDemo}</td>
                                <td>
                                    <table className='table'>
                                        <tbody>
                                            <tr><td>answer1: {question.Question.answer1}</td></tr>
                                            <tr><td>answer2: {question.Question.answer2}</td></tr>
                                            <tr><td>answer3: {question.Question.answer3}</td></tr>
                                            <tr><td>answer4: {question.Question.answer4}</td></tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td ><img src={question.userAnswer === question.Question.correctAnswer ? "/right.png" : "/wrong.png"} width="50px"></img></td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    );
}

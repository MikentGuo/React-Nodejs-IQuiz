import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionForm from './QuestionForm';

export default function Question() {
    const [questionList, setQuestionList] = useState([])
    const [quizList, setQuizList] = useState([])
    const [showQuestionForm, setShowQuestionForm] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [reload, setReload] = useState(false)
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/question", {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setQuestionList(res.data.questionList)
        })
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/quiz", {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setQuizList(res.data.quizList)
        })
        setShowQuestionForm(false)
    }, [reload])
    const addQuestion = () => {
        setSelectedQuestion("")
        setShowQuestionForm(!showQuestionForm)

    }
    const updateQuestion = (question) => {
        setShowQuestionForm(false)
        setSelectedQuestion(question)
        setShowQuestionForm(true)
    }
    const deleteQuestion = (questionId) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + "admin/question/byId/" + questionId, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(res => {
            setReload(!reload)
        })
    }
    return (
        <div className='container'>
            <div className="row">
                <h1> Question Categories </h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="btn btn-primary btn-sm mb-3" onClick={addQuestion}> Add Question</div>
                </div>
            </div>
            {showQuestionForm && <QuestionForm question={selectedQuestion ? selectedQuestion : null} quizList={quizList} />}
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th> Category </th>
                        <th> Question</th>
                        <th> Code demo </th>
                        <th> Choices </th>
                        <th> Answer </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {questionList.map((question, i) => {
                        return (
                            <tr key={i}>
                                <td >{question.QuizCategory.category}</td>
                                <td width="200px">{question.body}</td>
                                <td width="200px">{question.codeDemo}</td>
                                <td width="500px">
                                    <table className='table' width="500px">
                                        <tbody>
                                            <tr><td>answer1: {question.answer1}</td></tr>
                                            <tr><td>answer2: {question.answer2}</td></tr>
                                            <tr><td>answer3: {question.answer3}</td></tr>
                                            <tr><td>answer4: {question.answer4}</td></tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td >{question.correctAnswer}</td>
                                <td>
                                    <div
                                        className="btn btn-primary" onClick={() => updateQuestion(question)}>Update</div>&nbsp;

                                    <div
                                        className="btn btn-danger" onClick={() => deleteQuestion(question.id)}>Delete</div>

                                </td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
        </div>
    );
}

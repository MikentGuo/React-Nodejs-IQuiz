import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizForm from './QuizForm';

export default function Quiz() {
    const [quizList, setQuizList] = useState([])
    const [showQuizForm, setShowQuizForm] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState("")
    const [reload, setReload] = useState(false)
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/quiz", {
            headers: {accessToken: localStorage.getItem("accessToken")}
        }).then(res => {
            setQuizList(res.data.quizList)
        })
        setShowQuizForm(false)
    }, [reload])
    const addQuiz = () => {
        setSelectedQuiz("")
        setShowQuizForm(!showQuizForm)

    }
    const updateQuiz = (quiz) => {
        setShowQuizForm(false)
        setSelectedQuiz(quiz)
        setShowQuizForm(true)
    }
    const deleteQuiz = (quizId) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + "admin/quiz/byId/" + quizId, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(res => {
            setReload(!reload)
        })
    }
    return (
        <div className='container'>
            <div className="row">
                <h1> Quiz Categories </h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="btn btn-primary btn-sm mb-3" onClick={addQuiz}> Add Quiz</div>
                </div>
            </div>
            {showQuizForm && <QuizForm quiz={selectedQuiz ? selectedQuiz : null}/>}
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th> Image </th>
                        <th> Category</th>
                        <th> Brief </th>
                        <th> Description </th>
                        <th> Quiz size </th>
                        <th> Time limit </th>
                        <th> Total picked </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    { quizList.map((quiz, i) => {
                        return (
                            <tr key={i}>
                        <td width="100px"><img style={{borderRadius: '50%'}, {width: '60px'}, {height: '60px'}} src={process.env.REACT_APP_SERVER_URL + quiz.imageFilePath} width="100px" /></td>
                        <td >{quiz.category}</td>
                        <td >{quiz.brief}</td>
                        <td >{quiz.detail}</td>
                        <td >{quiz.quizSize}</td>
                        <td >{quiz.timeLimit}</td>
                        <td >{quiz.totalPicked}</td>
                        <td>
                            <div
                                className="btn btn-primary" onClick={() => updateQuiz(quiz)}>Update</div>

                            <div
                                className="btn btn-danger" onClick={() => deleteQuiz(quiz.id)}>Delete</div>

                        </td>
                    </tr>
                        )
                    })}
                    
                </tbody>

            </table>
        </div>
        
    )
}

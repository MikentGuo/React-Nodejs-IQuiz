import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizDetail from './QuizDetail';
import moment from 'moment'

export default function MyQuiz() {
  const [myQuizList, setMyQuizList] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState("")
  const [showQuizDetail, setShowQuizDetail] = useState(false)
  useEffect(() => {
    axios.get(process.env.REACT_APP_SERVER_URL + "users/myquizlist", {
      headers: { accessToken: localStorage.getItem("accessToken") }
    }).then(res => {
      console.log(res.data.myQuizList)
      setMyQuizList(res.data.myQuizList)
    })
  }, [])
  const displayQuizDetail = (quiz) => {
    setShowQuizDetail(!showQuizDetail)
    setSelectedQuiz(quiz)
  }
  const backToList = () => {
    setShowQuizDetail(!showQuizDetail)
  }
  const parseDate = (datetime) => {
    return new Date(Date.parse(datetime))
  }
  return (
    <div>
      <div className="row">
        <h1>{showQuizDetail ? "Quiz Detail" : "My quiz list"} </h1>
      </div>
      {showQuizDetail ? (
        <div className="row">
        <div className="col-lg-3">
            <div className="btn btn-primary btn-sm mb-3" onClick={backToList}> Return </div>
        </div>
    </div>
      ) : null }
      {showQuizDetail ? <QuizDetail quiz={selectedQuiz} /> :
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th colSpan="2"> Category </th>
              <th width="20%"> Number of questions</th>
              <th> Score </th>
              <th> Taken time </th>
              <th width="20%"> Show detail </th>
            </tr>
          </thead>

          <tbody>
            {myQuizList.map((myQuiz, i) => {
              return (
                <tr key={i}>
                  <td width="100px"><img style={{ borderRadius: '50%' }, { width: '60px' }, { height: '60px' }} src={process.env.REACT_APP_SERVER_URL + myQuiz.QuizCategory.imageFilePath} width="100px" /></td>
                  <td >{myQuiz.QuizCategory.category}</td>
                  <td >{myQuiz.QuizCategory.quizSize}</td>
                  <td >{myQuiz.totalScore}</td>
                  <td >{moment(myQuiz.createdAt).format('MMMM Do YYYY, h:mm a')}</td>
                  <td>
                    <div
                      className="btn btn-primary" onClick={() => displayQuizDetail(myQuiz)}>Detail</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  );
}

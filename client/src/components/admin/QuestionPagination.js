import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import QuestionForm from './QuestionForm';

function Items({ currentItems, updateQuestion, deleteQuestion}) {
    return (
      <>
        {currentItems &&
                currentItems.map((question, i) => {
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
                })
           }
      </>
    );
}

function PaginatedItems({ itemsPerPage, items, resetPage, setResetPage, updateQuestion, deleteQuestion }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    useEffect(() => {
      // Fetch items from another resources.
      if(resetPage){
        setItemOffset(0)
        setResetPage(false)
        return
      }
      const endOffset = itemOffset + itemsPerPage;
      //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      //console.log("items", items)
      setCurrentItems(items.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, resetPage, items]);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />        
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
                <Items currentItems={currentItems} updateQuestion={updateQuestion} deleteQuestion={deleteQuestion}/>
            </tbody>                    
            
        </table>
      </>
    );
}

export default function Question() {
    const [questionList, setQuestionList] = useState([])
    const [quizList, setQuizList] = useState([])
    const [showQuestionForm, setShowQuestionForm] = useState(false)
    const [selectedQuestion, setSelectedQuestion] = useState("")
    const [reload, setReload] = useState(false)
    const [quizCategoryId, setQuizCategoryId] = useState(-1)
    const [questionListAll, setQuestionListAll] = useState([])
    const [resetPage, setResetPage] = useState(true)
    const inputFile = useRef(null) 

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/question", {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setQuestionList(res.data.questionList)
            setQuestionListAll(res.data.questionList)
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
    const changeFilter = (e) => {
        //console.log(e.target.value)
        setQuizCategoryId(e.target.value)
        if(e.target.value == -1){
            setQuestionList(questionListAll)
        }else{
            const filterQuestionList = questionListAll.filter( (q)=> q.QuizCategoryId == e.target.value )
            setQuestionList(filterQuestionList)
        }        
        setResetPage(true)
    }
    const loadQuestionJson = () => {
        inputFile.current.click();       
    }

    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];        
        
        //console.log(file);

        var form = new FormData();
        form.append('file', file);
        axios.post(process.env.REACT_APP_SERVER_URL + "admin/questionFile", form, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            //console.log(res.data);
            setReload(true)
        })        
        event.target.value = ''
    }

    return (
        <div className='container'>
            <div className="row">
                <h1> Question Categories </h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="btn btn-primary btn-sm mb-3" onClick={addQuestion}> Add Question</div>                    
                    <input type='file' id='file' ref={inputFile} 
                        style={{display: 'none'}}
                        onChange={onFileChange}
                    />
                    <div style={{ marginLeft:'10px'}} className="btn btn-primary btn-sm mb-3" onClick={loadQuestionJson}> Load Question File</div>                    
                </div>                
                <div className="col-lg-3">
                    <select className="form-select" 
                        value={quizCategoryId}
                        onChange={changeFilter} 
                        >
                      <option value='-1'>All</option>
                      {quizList.map((quiz, i) => <option key={i} value={quiz.id}>{quiz.category}</option> )}
                    </select>
                </div>
            </div>
            {showQuestionForm && <QuestionForm question={selectedQuestion ? selectedQuestion : null} quizList={quizList} />}
            <PaginatedItems itemsPerPage={4} 
                items={questionList} 
                resetPage={resetPage} 
                setResetPage={(flag)=>setResetPage(flag)}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
                />
        </div>
    );
}

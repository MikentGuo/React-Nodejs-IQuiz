import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  body: yup.string().min(2).max(1000).required(),
  codeDemo: yup.string(),
  answer1: yup.string().min(1).max(1000).required(),
  answer2: yup.string().min(1).max(1000).required(),
  answer3: yup.string().min(1).max(1000),
  answer4: yup.string().min(1).max(1000)
})

export default function QuestionForm(props) {
  const question = props.question
  const quizList = props.quizList
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        reset(props.question)
    }, [props.question])
    const submitForm = (data) => {
        if(!question) {
            axios.post(process.env.REACT_APP_SERVER_URL + "admin/question", data, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then(res => {
                window.location.reload()
            })
        } else {
            data.id = question.id
            axios.put(process.env.REACT_APP_SERVER_URL + "admin/question/byId", data, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then (res => {
                window.location.reload()
            })
        }
    }
  return (
    <div className='container'>
        <form className="form-a" onSubmit={handleSubmit(submitForm)}>
            <div className="row g-4">
                <div className="col-md-7 mx-auto">
                    <h4>{!question ? "Create new question" : "Update Question #" + question.id}</h4>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Category</label>
                    <select {...register('QuizCategoryId')} defaultValue={question ? question.QuizCategory.id : null}>
                      {quizList.map((quiz, i) => <option key={i} value={quiz.id}>{quiz.category}</option> )}
                    </select>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Question</label>
                    <input type="text"
                        className={errors.body ? 'form-control is-invalid' : 'form-control'}
                        {...register('body')}
                        defaultValue={question ? question.body : null} />
                    <div className="text-danger">{errors.body ? errors.body.message : null}</div>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Code demo</label>
                    <input type="text"
                        className={errors.codeDemo ? 'form-control is-invalid' : 'form-control'}
                        {...register('codeDemo')}
                        defaultValue={question ? question.codeDemo : null} />
                    <div className="text-danger">{errors.codeDemo ? errors.codeDemo.message : null}</div>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Answer 1</label>
                    <input type="text"
                        className={errors.answer1 ? 'form-control is-invalid' : 'form-control'}
                        {...register('answer1')}
                        defaultValue={question ? question.answer1 : null} />
                    <div className="text-danger">{errors.answer1 ? errors.answer1.message : null}</div>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Answer 2</label>
                    <input type="text"
                        className={errors.answer2 ? 'form-control is-invalid' : 'form-control'}
                        {...register('answer2')}
                        defaultValue={question ? question.answer2 : null} />
                    <div className="text-danger">{errors.answer2 ? errors.answer2.message : null}</div>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Answer 3</label>
                    <input type="text"
                        className={errors.answer3 ? 'form-control is-invalid' : 'form-control'}
                        {...register('answer3')}
                        defaultValue={question ? question.answer3 : null} />
                    <div className="text-danger">{errors.answer3 ? errors.answer3.message : null}</div>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Answer 4</label>
                    <input type="text"
                        className={errors.answer4 ? 'form-control is-invalid' : 'form-control'}
                        {...register('answer4')}
                        defaultValue={question ? question.answer4 : null} />
                    <div className="text-danger">{errors.answer4 ? errors.answer4.message : null}</div>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Correct answer</label>
                    <select {...register('correctAnswer')} defaultValue={question ? question.correctAnswer : "answer1"}>
                      <option value="answer1">answer1</option>
                      <option value="answer2">answer2</option>
                      <option value="answer3">answer3</option>
                      <option value="answer4">answer4</option>
                    </select>
                </div>
                <br />
                <div className="col-md-7 mx-auto">
                    <button type="submit" className="btn btn-primary" >{question ? "Update" : "Create"}</button>
                </div>
            </div>
        </form><br /> <br />
    </div>
);
}

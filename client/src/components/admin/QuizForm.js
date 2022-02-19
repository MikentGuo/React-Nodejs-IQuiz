import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    category: yup.string().min(2).max(20).required(),
    brief: yup.string().min(2).max(50),
    detail: yup.string().min(1).max(1000).required(),
    quizSize: yup.number().notRequired(),
    timeLimit: yup.number().notRequired(),
    image: yup.mixed().test("fileSize", "File too large", (value) => {
        if (value[0]) {
            return value[0].size <= 524880
        }
        return true
    })
    .test("fileType", "Unsupported File Format", (value) => {
        if (value[0]) {
            return ["image/jpeg", "image/jpg", "image/gif", "image/png"].includes(value[0].type)
        }
        return true
    })
})

export default function QuizForm(props) {
    const quiz = props.quiz
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        reset(props.quiz)
    }, [props.quiz])
    const submitForm = (data) => {
        if(!quiz) {
            axios.post(process.env.REACT_APP_SERVER_URL + "admin/quiz", data, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then(res => {
                window.location.reload()
            })
        } else {
            const formData = new FormData()
            formData.append("id", quiz.id)
            formData.append("image", data.image[0])
            formData.append("category", data.category)
            formData.append("brief", data.brief)
            formData.append("detail", data.detail)
            formData.append("timeLimit", data.timeLimit)
            formData.append("quizSize", data.quizSize)
            formData.append("imageFilePath", data.imageFilePath)
            axios.put(process.env.REACT_APP_SERVER_URL + "admin/quiz/byId", formData, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then (res => {
                if (res.data == "ERROR") {
                    setError("image", {message: "Failed to upload file"})
                } else {
                    window.location.reload()
                }
            })
        }
    }
    return (
        <div className='container'>
            <form className="form-a" onSubmit={handleSubmit(submitForm)}>
                <div className="row g-4">
                    <div className="col-md-7 mx-auto">
                        <h4>{!quiz ? "Create new Quiz" : "Update quiz #" + quiz.id}</h4>
                    </div>
                    <div className="col-md-7 mx-auto" style={{display: quiz ? null : 'none'}}>
                        <label className="text-dark">Image</label>
                        <input type="file"  name='picture'
                            className='form-control'
                            {...register('image')} 
                            />
                        <div className="text-danger">{errors.image ? errors.image.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Category</label>
                        <input type="text"
                            className={errors.category ? 'form-control is-invalid' : 'form-control'}
                            {...register('category')}
                            defaultValue={quiz ? quiz.category : null} />
                        <div className="text-danger">{errors.category ? errors.category.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Brief</label>
                        <input type="text"
                            className={errors.brief ? 'form-control is-invalid' : 'form-control'}
                            {...register('brief')}
                            defaultValue={quiz ? quiz.brief : null} />
                        <div className="text-danger">{errors.brief ? errors.brief.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Detail</label>
                        <input type="text"
                            className={errors.detail ? 'form-control is-invalid' : 'form-control'}
                            {...register('detail')}
                            defaultValue={quiz ? quiz.detail : null} />
                        <div className="text-danger">{errors.detail ? errors.detail.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Number of questions</label>
                        <input type="text"
                            className={errors.quizSize ? 'form-control is-invalid' : 'form-control'}
                            {...register('quizSize')}
                            defaultValue={quiz ? quiz.quizSize : null} />
                        <div className="text-danger">{errors.quizSize ? errors.quizSize.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Time limit (second)</label>
                        <input type="text"
                            className={errors.timeLimit ? 'form-control is-invalid' : 'form-control'}
                            {...register('timeLimit')}
                            defaultValue={quiz ? quiz.timeLimit : null} />
                        <div className="text-danger">{errors.timeLimit ? errors.timeLimit.message : null}</div>
                    </div>
                    <br />
                    <div className="col-md-7 mx-auto">
                        <button type="submit" className="btn btn-primary" >{quiz ? "Update" : "Create"}</button>
                    </div>
                </div>
            </form><br /> <br />
        </div>
    )
}

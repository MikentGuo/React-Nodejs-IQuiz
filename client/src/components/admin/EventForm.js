import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const today = new Date()
const schema = yup.object().shape({
    title: yup.string().min(1).max(20).required(),
    body: yup.string().min(1).max(1000).required(),
    startTime: yup.date().min(today),
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

export default function EventForm(props) {
    const event = props.event
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        reset(props.event)
    }, [props.event])
    const submitForm = (data) => {
        if(!event) {
            axios.post(process.env.REACT_APP_SERVER_URL + "admin/event", data, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then(res => {
                window.location.reload()
            })
        } else {
            const formData = new FormData()
            formData.append("id", event.id)
            formData.append("image", data.image[0])
            formData.append("title", data.title)
            formData.append("body", data.body)
            formData.append("startTime", data.startTime)
            formData.append("imageFilePath", data.imageFilePath)
            axios.put(process.env.REACT_APP_SERVER_URL + "admin/event/byId", formData, {
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
                        <h4>{!event ? "Create new Event" : "Update event #" + event.id}</h4>
                    </div>
                    <div className="col-md-7 mx-auto" style={{display: event ? null : 'none'}}>
                        <label className="text-dark">Image</label>
                        <input type="file"  name='picture'
                            className='form-control'
                            {...register('image')} 
                            />
                        <div className="text-danger">{errors.image ? errors.image.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Title</label>
                        <input type="text"
                            className={errors.title ? 'form-control is-invalid' : 'form-control'}
                            {...register('title')}
                            defaultValue={event ? event.title : null} />
                        <div className="text-danger">{errors.title ? errors.title.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Description</label>
                        <input type="text"
                            className={errors.body ? 'form-control is-invalid' : 'form-control'}
                            {...register('body')}
                            defaultValue={event ? event.body : null} />
                        <div className="text-danger">{errors.body ? errors.body.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Start time</label>
                        <input type="Date"
                            className={errors.startTime ? 'form-control is-invalid' : 'form-control'}
                            {...register('startTime')}
                            defaultValue={event ? event.startTime : null} />
                        <div className="text-danger">{errors.startTime ? errors.startTime.message : null}</div>
                    </div>
                    <br />
                    <div className="col-md-7 mx-auto">
                        <button type="submit" className="btn btn-primary" >{event ? "Update" : "Create"}</button>
                    </div>
                </div>
            </form><br /> <br />
        </div>
    )
}

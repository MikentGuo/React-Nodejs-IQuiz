import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    body: yup.string().min(2).max(1000).required()
  })
export default function TestimonialForm(props) {
    const testimonial = props.testimonial
  const userList = props.userList
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        reset(props.testimonial)
    }, [props.testimonial])
    const submitForm = (data) => {
        if(!testimonial) {
            axios.post(process.env.REACT_APP_SERVER_URL + "admin/testimonial", data, {
                headers: { accessToken: localStorage.getItem("accessToken") }
            }).then(res => {
                window.location.reload()
            })
        } else {
            data.id = testimonial.id
            axios.put(process.env.REACT_APP_SERVER_URL + "admin/testimonial/byId", data, {
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
                    <h4>{!testimonial ? "Create new testimonial" : "Update Testimonial #" + testimonial.id}</h4>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">User</label>
                    <select {...register('UserId')} defaultValue={testimonial ? testimonial.User.id : null}>
                      {userList.map((user, i) => <option key={i} value={user.id}>{user.username}</option> )}
                    </select>
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Testimonial</label>
                    <input type="text"
                        className={errors.body ? 'form-control is-invalid' : 'form-control'}
                        {...register('body')}
                        defaultValue={testimonial ? testimonial.body : null} />
                    <div className="text-danger">{errors.body ? errors.body.message : null}</div>
                </div>
                <br />
                <div className="col-md-7 mx-auto">
                    <button type="submit" className="btn btn-primary" >{testimonial ? "Update" : "Create"}</button>
                </div>
            </div>
        </form><br /> <br />
    </div>
);
}

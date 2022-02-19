import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TestimonialForm from './TestimonialForm';

export default function Testimonial() {
    const [testimonialList, setTestimonialList] = useState([])
    const [userList, setUserList] = useState([])
    const [showTestimonialForm, setShowTestimonialForm] = useState(false)
    const [selectedTestimonial, setSelectedTestimonial] = useState("")
    const [reload, setReload] = useState(false)
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/testimonial", {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setTestimonialList(res.data.testimonialList)
        })
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/users", {
            headers: {accessToken: localStorage.getItem("accessToken")}
        }).then(res => {
            setUserList(res.data.userList)
        })
        setShowTestimonialForm(false)
    }, [reload])
    const addTestimonial = () => {
        setSelectedTestimonial("")
        setShowTestimonialForm(!showTestimonialForm)

    }
    const updateTestimonial = (testimonial) => {
        setShowTestimonialForm(false)
        setSelectedTestimonial(testimonial)
        setShowTestimonialForm(true)
    }
    const deleteTestimonial = (testimonialId) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + "admin/testimonial/byId/" + testimonialId, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(res => {
            setReload(!reload)
        })
    }
  return (
    <div className='container'>
        <div className="row">
            <h1> Testimonial Categories </h1>
        </div>
        <div className="row">
            <div className="col-lg-3">
                <div className="btn btn-primary btn-sm mb-3" onClick={addTestimonial}> Add Testimonial</div>
            </div>
        </div>
        {showTestimonialForm && <TestimonialForm testimonial={selectedTestimonial ? selectedTestimonial : null} userList={userList}/>}
        <table className="table table-striped table-bordered">
            <thead className="table-dark">
                <tr>
                    <th> User Image </th>
                    <th> User</th>
                    <th> Content </th>
                    <th> Actions </th>
                </tr>
            </thead>

            <tbody>
                {testimonialList.map((testimonial, i) => {
                    return (
                        <tr key={i}>
                            <td width="100px"><img style={{ borderRadius: '50%' }, { width: '60px' }, { height: '60px' }} src={process.env.REACT_APP_SERVER_URL + testimonial.User.imageFilePath} width="100px" /></td>
                            <td >{testimonial.User.username}</td>
                            <td >{testimonial.body}</td>
                            <td>
                                <div
                                    className="btn btn-primary" onClick={() => updateTestimonial(testimonial)}>Update</div>

                                <div
                                    className="btn btn-danger" onClick={() => deleteTestimonial(testimonial.id)}>Delete</div>

                            </td>
                        </tr>
                    )
                })}

            </tbody>

        </table>
    </div>

);
}

import React from 'react'
import {Routes, Route} from 'react-router-dom'
import SignUpForm from './RegistrationForm'
import LoginForm from './LoginForm'

export default function Login() {
    return (
        <section id="hero" className="d-flex justify-content-center align-items-center">
        <div style={{width: "850px"}, {borderRadius: "25px"}, {backgroundColor: "#0a53be7f"}} className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
            <Routes>
                <Route path = '/' element = {<LoginForm />}></Route>
                <Route path = '/register' element = {<SignUpForm />}></Route>
            </Routes>
        </div>
        </section>
    )
}

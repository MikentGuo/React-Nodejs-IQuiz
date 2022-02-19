import React from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().min(4).max(15).required(),
    passwordRepeat: yup.string().oneOf([yup.ref("password"), null])
})
function Registration(props) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        resolver: yupResolver(schema)
    })

    const { toggleShowLogin } = props
    const checkUserExists = (e) => {
        let username = e.target.value;
        if (username !== "") {
            axios.get(process.env.REACT_APP_SERVER_URL + "users/username/" + username).then(res => {
                if (res.data) {
                    console.log(res.data)
                    setError('username', {message: 'username taken'})
                    
                }
            })
        }
    }
    const checkEmailExists = (e) => {
        let email = e.target.value;
        if (email !== "") {
            axios.get(process.env.REACT_APP_SERVER_URL + "users/email/" + email).then(res => {
                if (res.data) {
                    setError('email', {message: 'email already registered'})
                }
            })
        }
    }
    const submitForm = (data) => {
        axios.post(process.env.REACT_APP_SERVER_URL + "users/registration", data).then(res => {
            console.log(res.data)
            if (res.data === "SUCCESS") {
                reset();
                //navigate("/")
                toggleShowLogin()
            } else {
                navigate("/error")
            }
        })
        
    }
    return (
        <div className='container'>
            <form className="form-a" onSubmit={handleSubmit(submitForm)}>
                <div className="row g-4">
                    {/* <div className="col-md-7 mx-auto">
                        <h1>Sign Up</h1>
                    </div> */}
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Email address</label>
                        <input type="text"  
                            className={errors.email ? 'form-control is-invalid' : 'form-control'}  
                            {...register('email')} 
                            onBlur={ checkEmailExists}/>
                        <div className="text-danger">{errors.email ? errors.email.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Your Name</label>
                        <input type="text" 
                            className= {errors.username ? 'form-control is-invalid' : 'form-control'}  
                            {...register('username')} 
                            onBlur={checkUserExists}/>
                        <div className="text-danger">{errors.username ? errors.username.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Password</label>
                        <input type="password" id="password" className="form-control" {...register('password')} />
                        <div className="text-danger">{errors.password ? errors.password.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Re-enter password</label>
                        <input type="password" id="passwordRepeat" className="form-control" {...register('passwordRepeat')} />
                        <div className="text-danger">{errors.passwordRepeat ? "Please enter the same password" : null}</div>
                    </div>
                    <br />
                    <div className="col-md-7 mx-auto">
                        <button type="submit" className="get-started-btn text-light" disabled={errors.username || errors.email}>Sign Up</button>
                        <span onClick={toggleShowLogin} className="get-started-btn text-light" name="submit">Sign In</span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Registration

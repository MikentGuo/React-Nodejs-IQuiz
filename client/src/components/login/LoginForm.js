import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../public/Auth'
import { useNavigate } from 'react-router-dom';

export default function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const { setAuthState } = useContext(AuthContext)
    const navigate = useNavigate()

    const { toggleShowRegister } = props

    const login = () => {
        const data = { email: email, password: password }
        if (!email || !password) {
            setError("Please enter your email and password")
        } else {
            axios.post(process.env.REACT_APP_SERVER_URL + "users/login", data).then(res => {
                if (res.data.error) {
                    setError(res.data.error)
                } else {
                    localStorage.setItem("accessToken", res.data.token)
                    setAuthState({
                        username: res.data.username,
                        id: res.data.id,
                        imageFilePath: res.data.imageFilePath,
                        status: true
                    })
                    //setError("")
                    if(res.data.isAdmin) {
                        navigate('./')
                        window.location.reload()
                    }
                }
            })
        }
    }

    return (
        <div className="container" >
            <div className="row g-5">
                {/* <div className="col-md-7 mx-auto">
                    <h1>Sign In</h1>
                </div> */}
                <div className="col-md-7 mx-auto">
                    <h4 className="text-danger" >{error}</h4>
                    <label className="text-dark">Email address</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div className="col-md-7 mx-auto">
                    <label className="text-dark">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                </div>
                <br />
                <div className="col-md-7 mx-auto">
                    <button onClick={login} className="get-started-btn text-light" name="submit">Sign In</button>
                    <span onClick={toggleShowRegister} className="get-started-btn text-light" name="submit">Sign Up</span>
                </div>
            </div>
            </div>
    )
}

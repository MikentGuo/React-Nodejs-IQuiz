import React,  { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';


const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().max(15),
    passwordRepeat: yup.string().oneOf([yup.ref("password"), null]),
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

export default function UserForm(props) {
    const user = props.user
    const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(() => {
        reset(props.user)
    }, [props.user])
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
        if(!user) {
            axios.post(process.env.REACT_APP_SERVER_URL + "users/registration", data).then(res => {
                if (res.data == "SUCCESS") {
                    window.location.reload()
                } 
            })
        } else {
            const formData = new FormData()
            formData.append("id", user.id)
            formData.append("image", data.image[0])
            formData.append("username", data.username)
            formData.append("email", data.email)
            formData.append("password", data.password)
            formData.append("imageFilePath", data.imageFilePath)
            axios.put(process.env.REACT_APP_SERVER_URL + "admin/users/byId", formData, {
                headers: { accessToken: localStorage.getItem("accessToken")}
            }).then(res => {
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
            <form className="form-a" onSubmit={handleSubmit(submitForm)} >
                <div className="row g-4">
                    <div className="col-md-7 mx-auto">
                        <h4>{!user ? "Create new User" : "Update user #" + user.id}</h4>
                    </div>
                    <div className="col-md-7 mx-auto" style={{display: user ? null : 'none'}}>
                        <label className="text-dark">Image</label>
                        <input type="file"  name='picture'
                            className='form-control'
                            {...register('image')} 
                            />
                        <div className="text-danger">{errors.image ? errors.image.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Email address</label>
                        <input type="text"  
                            className={errors.email ? 'form-control is-invalid' : 'form-control'}  
                            {...register('email')} 
                            onBlur={ user? null : checkEmailExists}
                            defaultValue={user? user.email : null}/>
                        <div className="text-danger">{errors.email ? errors.email.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto">
                        <label className="text-dark">Your Name</label>
                        <input type="text" 
                            className= {errors.username ? 'form-control is-invalid' : 'form-control'}  
                            {...register('username')} 
                            onBlur={user? null : checkUserExists}
                            defaultValue={user? user.username : null}/>
                        <div className="text-danger">{errors.username ? errors.username.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto" style={{display: user ? null : 'none'}}>
                        <label className="text-dark">New Password</label>
                        <input type="password"  className="form-control" {...register('password')} />
                        <div className="text-danger">{errors.password ? errors.password.message : null}</div>
                    </div>
                    <div className="col-md-7 mx-auto" style={{display: user ? null : 'none'}}>
                        <label className="text-dark">Re-enter password</label>
                        <input type="password"  className="form-control" {...register('passwordRepeat')} />
                        <div className="text-danger">{errors.passwordRepeat ? "Please enter the same password" : null}</div>
                    </div>
                    <br />
                    <div className="col-md-7 mx-auto">
                        <button type="submit" className="btn btn-primary" disabled={errors.username || errors.email}>{user ? "Update" : "Create"}</button>
                    </div>
                </div>
            </form><br /> <br />
        </div>
    )
}

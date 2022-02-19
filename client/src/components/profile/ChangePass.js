import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

const schema = yup.object().shape({
  originalPass: yup.string().max(15),
  newPass: yup.string().min(4).max(15),
  passwordRepeat: yup.string().oneOf([yup.ref("newPass"), null])
})

export default function ChangePass() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: yupResolver(schema)
  })
  const [successMsg, setSuccessMsg] = useState("")
  const submitForm = (data) => {
    axios.post(process.env.REACT_APP_SERVER_URL + "users/change_pass", data, {
      headers: { accessToken: localStorage.getItem("accessToken")}
    }).then(res => {
      if (res.data == "ERROR") {
        setError("originalPass", {message: "Incorrect password"})
      } else {
        setSuccessMsg("Password Changed")
      }
    })
  }
  return (
    <div className='container'>
      <div className="col-md-7 mx-auto"><h4 className='text-success'>{successMsg}</h4></div>
      <form className="form-a" onSubmit={handleSubmit(submitForm)} >
        <div className="row g-4">
          <div className="col-md-7 mx-auto">
            <label className="text-dark">Current Password</label>
            <input type="password"
              className={errors.originalPass ? 'form-control is-invalid' : 'form-control'}
              {...register('originalPass')} />
            <div className="text-danger">{errors.originalPass ? errors.originalPass.message : null}</div>
          </div>
          <div className="col-md-7 mx-auto" >
            <label className="text-dark">New Password</label>
            <input type="password" className="form-control" {...register('newPass')} />
            <div className="text-danger">{errors.newPass ? errors.newPass.message : null}</div>
          </div>
          <div className="col-md-7 mx-auto" >
            <label className="text-dark">Re-enter password</label>
            <input type="password" className="form-control" {...register('passwordRepeat')} />
            <div className="text-danger">{errors.passwordRepeat ? "Please enter the same password" : null}</div>
          </div>
          <br />
          <div className="col-md-7 mx-auto">
            <button type="submit" className="btn btn-primary" >Submit</button>
          </div>
        </div>
      </form><br /> <br />
    </div>
  );
}

import React, { useContext, useRef } from 'react';
import { AuthContext } from '../public/Auth';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import MyQuiz from './MyQuiz';
import ChangePass from './ChangePass';

export default function Profile() {
    const { authState, setAuthState } = useContext(AuthContext)
    const inputFile = useRef("")
    const clickImage = (e) => {
        inputFile.current.click()
    }
    const saveImage = (e) => {
        console.log(e.target.files[0])
        let image = e.target.files[0]
        const fileType = ["image/jpeg", "image/jpg", "image/gif", "image/png"]
        if(image && image.size <= 524880 && fileType.includes(image.type)) {
            const formData = new FormData()
            formData.append("image", image)
            axios.post(process.env.REACT_APP_SERVER_URL + "users/change_image", formData, 
                {headers: { accessToken: localStorage.getItem("accessToken")}}
            ).then(res => {
                if (res.data != "ERROR") {
                    authState.imageFilePath = res.data
                    window.location.reload()
                }
            })
        }
    }
    return (
        <main id='main'>
            <div className="breadcrumbs" data-aos="fade-in">
                <div className="container">
                    <h2>My Profile</h2>
                </div>
            </div>
            <div className="with_sidebar">
                <ul className="nav flex-column col-lg-4 text-black nav_bar">
                    <li>
                        <input type="file" style={{display: "none"}} ref={inputFile} onChange={saveImage}/>
                        <div className='btn' onClick={clickImage}><img style={{borderRadius: '50%', width: '150px', height: '150px'}} src={process.env.REACT_APP_SERVER_URL + authState.imageFilePath} alt="user image" /></div>
                    </li>
                    <li className='h4 text-primary'><span>Hello {authState.username}</span></li>
                    <li className='h4'><Link to="/profile/myquiz">My quiz</Link></li>

                    <li className='h4'><Link to="/profile/changepw">Change password</Link></li>
                </ul>
                <div className="profile_content">
                    <Routes>
                        <Route path="/myquiz" element={<MyQuiz />}></Route>
                        <Route path="/changepw" element={<ChangePass />}></Route>
                        <Route path="*" element={<MyQuiz />}></Route>
                    </Routes>
                </div>
            </div>
        </main>
    );
}

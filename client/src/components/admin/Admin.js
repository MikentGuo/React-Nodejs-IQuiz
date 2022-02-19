import React, { useEffect } from 'react';
import { useNavigate, NavLink, Route, Routes } from 'react-router-dom';
import Users from './Users';
import Quiz from './Quiz';
//import Question from './Question';
import Question from './QuestionPagination';
import Event from './Event';
import Testimonial from './Testimonial';

export default function NavBar() {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/")
        window.location.reload()
    };

    return (
        <div >
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">

                <h3 style={{ color: "white" }}>Admin Menu</h3>&nbsp;&nbsp;&nbsp;&nbsp;

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/users">Users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/quiz">Quizzes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/question">Questions</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/events">Events</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/testimonials">Testimonials</NavLink>
                        </li>
                    </ul>
                </div>

                <div style={{ right: 0 }} className="navbar-brand btn" onClick={logout}> &laquo; Exit </div>
            </nav>
            <div className='container'>
                <Routes>
                    <Route path='/users' element={<Users />} />
                    <Route path='/quiz' element={<Quiz />} />
                    <Route path='/question' element={<Question />} />
                    <Route path='/events' element={<Event />} />
                    <Route path='/testimonials' element={<Testimonial />} />
                    <Route path='*' element={<Users />} />
                </Routes>
            </div>
        </div>

    )
}

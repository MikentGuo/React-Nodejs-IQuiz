import React, { useState, useContext, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import LoginForm from '../login/LoginForm';
import Registration from '../login/RegistrationForm';
import { AuthContext } from '../public/Auth'

export default function Header() {
    const { authState, setAuthState } = useContext(AuthContext)    
    const [ isShowLogin, setIsShowLogin ] = useState(false)
    const [ isShowRegister, setIsShowRegister ] = useState(false)

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({ email: "", id: 0, isAdmin: false, imageFilePath: "", status: false });
        setIsShowLogin(false)
        setIsShowRegister(false)          
    };    

    const useScrollToTop = () => {         
        const { pathname } = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
            setIsShowLogin(false)
            setIsShowRegister(false)    
        }, [pathname]);

        return null;
    }; 

    useScrollToTop();

    const toggleShowLogin = () => {
        setIsShowRegister(false)
        setIsShowLogin(!isShowLogin)
    }

    const toggleShowRegister = () => {
        setIsShowLogin(false)
        setIsShowRegister(!isShowRegister)
    }
    return (
        <div id="header" className="fixed-top">
            <div className="container d-flex align-items-center">
                <h1 className="logo me-auto"><NavLink to="/">IQUIZ</NavLink></h1>

                <nav id="navbar" className="navbar order-last order-lg-0">
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/quiz">Quiz</NavLink></li>
                        <li><NavLink to="/event">Event</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
                    </ul>
                    <div>
                        {
                            authState.status ?
                            (
                                <li className="dropdown">
                                    <img style={{borderRadius: '50%', width: '50px', height: '50px'}} src={process.env.REACT_APP_SERVER_URL + authState.imageFilePath} alt="user" />
                                    <ul>
                                        <li><NavLink to="/profile">My Profile</NavLink></li>
                                        <li><NavLink to="/" onClick={logout}>Sign Out</NavLink></li>
                                    </ul>
                                </li>
                            )
                            :
                            (
                                <div>
                                    <span onClick={toggleShowLogin} className="get-started-btn">Sign In</span>
                                </div>
                            )
                        }
                    </div>                    
                </nav>                
            </div>            
            { authState.status ? null: (isShowLogin && 
                <>
                    <hr/>
                    <LoginForm toggleShowRegister={toggleShowRegister}/> 
                </>
            )}
            { authState.status ? null: (isShowRegister && 
                <>
                    <hr/>
                    <Registration toggleShowLogin={toggleShowLogin}/>
                </>                
            )}
        </div>

    )
}

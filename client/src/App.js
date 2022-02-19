import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { AuthContext } from './components/public/Auth';
import Home from './components/home/Home';
import About from './components/about/About';
import Event from './components/event/Event';
import Quiz from './components/quiz/Quiz';
import QuizDetail from './components/quiz/QuizDetail'
import Contact from './components/contact/Contact';
import Header from './components/public/Header';
import Footer from './components/public/Footer';
import NotFound from './components/public/NotFound';
import Admin from './components/admin/Admin'
import QuizQuestion from './components/quiz/QuizQuestion';
import Profile from './components/profile/Profile';


function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    imageFilePath: "",
    status: false,
    isAdmin: false
  });
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_URL +"users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
            isAdmin: response.data.isAdmin,
            imageFilePath: response.data.imageFilePath
          });
        }
      });
  }, [authState.isAdmin]);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
      {authState.isAdmin ? 
      (<Routes>
        <Route path='/' element={<Admin />} />
        <Route path='/admin/*' element={<Admin />} />
        </Routes>) 
      : 
        (<><Header />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/event/*' element={<Event />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/quiz/detail' element={<QuizDetail />} />
            <Route path='/quiz/question' element={<QuizQuestion />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile/*' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        <Footer /></>)
      }
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

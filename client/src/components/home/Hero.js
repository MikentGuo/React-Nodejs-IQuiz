import React from 'react'
import {Link} from 'react-router-dom'

export default function Hero() {
    return (
      <section id="hero" className="d-flex justify-content-center align-items-center">
        <div className="container position-relative" data-aos="zoom-in" data-aos-delay="100">
          <h1>Free Online Quiz<br/>Play with IQuiz</h1>
          <Link to="/quiz" className="btn-get-started">Get Started</Link>
        </div>
      </section>        
    )
}

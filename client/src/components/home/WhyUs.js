import React from 'react'
import {Link} from 'react-router-dom'

export default function WhyUs() {
    return (
        <section id="why-us" className="why-us">
          <div className="container" data-aos="fade-up">
    
            <div className="row">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="content">
                  <h3>Why Choose IQuiz?</h3>
                  <p>
                  IQuiz is a game-based learning platform. 
                  Users can test their skill and knowledge level of different professions.
                  </p>
                  <div className="text-center">
                    <Link to="/about" className="more-btn">Learn More<i className="bx bx-chevron-right"></i></Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                <div className="icon-boxes d-flex flex-column justify-content-center">
                  <div className="row">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-receipt"></i>
                        <h4>Best Online Quiz</h4>
                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-cube-alt"></i>
                        <h4>Learning with fun games</h4>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box mt-4 mt-xl-0">
                        <i className="bx bx-images"></i>
                        <h4>Improve your skills and knowledge</h4>
                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
          </div>
        </section>
   
    )
}

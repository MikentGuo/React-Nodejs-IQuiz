import React from 'react'
import QuizItem from "../quiz/QuizItem"
import ReactLoading from 'react-loading';

export default function Popular(props) {
    const { data } = props

    return (
        <section id="popular-courses" className="courses">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Quiz</h2>
            <p>Popular Quiz</p>
          </div>
  
          <section id="courses" className="courses">
                <div className="container" data-aos="fade-up">
                    <div className="row" data-aos="zoom-in" data-aos-delay="100">                        
                    {
                        data ? data.map( (quiz)=> (                                    
                            <QuizItem key={quiz.id} quiz={quiz} />
                        )) :
                        (
                          <div className="col-lg-2 container justify-content-center">
                            <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                          </div>                                 
                        )
                    }  
                    </div>
                </div>
            </section>

        </div>
      </section>        
    )
}

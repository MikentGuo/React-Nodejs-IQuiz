import React from 'react'

export default function TestimonialItem(props) {
    const { testimonial } = props
    return (
        <div className="swiper-slide">
            <div className="testimonial-wrap">
                <div className="testimonial-item">
                    <img src={process.env.REACT_APP_SERVER_URL + testimonial.imageFilePath} className="testimonial-img" alt="" />
                    <h3>{testimonial.username}</h3>
                    { 
                        testimonial.title ? <h4>{testimonial.title}</h4> : null
                    }
                    <p>
                        {testimonial.title ? null : <i className="bx bxs-quote-alt-left quote-icon-left"></i> }
                        <span>{testimonial.body}</span>
                        {testimonial.title ? null: <i className="bx bxs-quote-alt-right quote-icon-right"></i> }
                    </p>
                </div>
                </div>
        </div>        
    )
}

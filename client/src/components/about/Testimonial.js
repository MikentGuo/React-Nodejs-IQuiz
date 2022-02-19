import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TestimonialItem from '../public/TestimonialItem';
 
import ReactLoading from 'react-loading';

export default function Testimonial(props) {
    const [testimonialList, setTestimonialList] = useState(null)

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "stat/testimonial").then(res => {
            setTestimonialList(res.data.testimonialList)           

            Swiper.use([Navigation, Pagination, Autoplay]);
            new Swiper('.testimonials-slider', {
                speed: 600,
                loop: true,
                autoplay: {
                  delay: 3000,
                  disableOnInteraction: false
                },
                slidesPerView: 'auto',
                pagination: {
                  el: '.swiper-pagination',
                  type: 'bullets',
                  clickable: true
                },
                breakpoints: {
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 20
                  },
            
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  }
                }
              }); 
        })

        return () => {
            //console.log("home 1unmounted")
        };
    },[]);    

    return (
        <section id="testimonials" className="testimonials">
            <div className="container" data-aos="fade-up">
    
            <div className="section-title">
                <h2>Testimonials</h2>
                <p>What are they saying</p>
            </div>
    
            <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                <div className="swiper-wrapper">    
                {
                    testimonialList ? testimonialList.map( (item, index)=>                                     
                        <TestimonialItem key={index} testimonial={item} />
                    ):(
                      <div className="col-lg-2 container justify-content-center">
                        <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                      </div>                 
                    )
                }                          
                </div>
                <div className="swiper-pagination"></div>
            </div>
    
            </div>
      </section>
    )
}

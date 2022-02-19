import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TestimonialItem from '../public/TestimonialItem';
 
export default function TotalScoreRank() {
    const [leaderboard, setLeaderboard] = useState(null) 

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "quiz/leaderboard").then(res => {
            //console.log("totalscore",res.data)
            setLeaderboard(res.data.leaderboard)            

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
            //console.log("Event 1unmounted", eventList)
        };
    },[]);

    return (
        <section id="testimonials" className="testimonials">
            <div className="container" data-aos="fade-up">
    
                <div className="section-title">
                    <h2>LeaderBoard</h2>
                </div>
        
                <div className="testimonials-slider swiper" data-aos="fade-up" data-aos-delay="100">
                    <div className="swiper-wrapper">    
                    {
                        leaderboard ? leaderboard.map( (item)=>                                     
                            <TestimonialItem key={item.id} testimonial={item} />                            
                        ) : null
                    }                          
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
    
            </div>
      </section>
    )
}

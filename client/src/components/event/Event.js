import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

import ReactLoading from 'react-loading';

export default function Event() {
    const [eventList, setEventList] = useState(null) 

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "stat/event").then(res => {
            setEventList(res.data.eventList)            
        })

        return () => {
            //console.log("Event 1unmounted", eventList)
        };
    },[]);

    return (
        <main id="main" data-aos="fade-in">   
            <div className="breadcrumbs">
                <div className="container">
                    <h2>Event</h2>
                </div>
            </div>
            
            <section id="events" className="events">
                <div className="container" data-aos="fade-up">
                    <div className="row">
                    {
                        eventList ? eventList.map( (event)=> 
                            (
                                <div key={event.id} className="col-md-6 d-flex align-items-stretch">
                                    <div className="card">
                                        <div className="card-img">
                                            <img src={process.env.REACT_APP_SERVER_URL + event.imageFilePath} alt="..." />
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">{event.title}</h5>
                                            <p className="fst-italic text-center" >{event.startTime}</p>
                                            <p className="card-text" >{event.body}</p>
                                        </div>
                                    </div>
                                </div>                            
                            )
                        ): (
                            <div className="col-lg-2 container justify-content-center">
                                <ReactLoading type="spinningBubbles" color="#7f7fff" height={"72px"} width={"72px"} />
                            </div>
                        )
                    }
                    </div>
                </div>
            </section>
    
        </main>
    )
}

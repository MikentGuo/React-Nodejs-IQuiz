import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './EventForm';

export default function Event() {
    const [eventList, setEventList] = useState([])
    const [showEventForm, setShowEventForm] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState("")
    const [reload, setReload] = useState(false)
    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER_URL + "admin/event", {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(res => {
            setEventList(res.data.eventList)
        })
        setShowEventForm(false)
    }, [reload])
    const addEvent = () => {
        setSelectedEvent("")
        setShowEventForm(!showEventForm)

    }
    const updateEvent = (event) => {
        setShowEventForm(false)
        setSelectedEvent(event)
        setShowEventForm(true)
    }
    const deleteEvent = (eventId) => {
        axios.delete(process.env.REACT_APP_SERVER_URL + "admin/event/byId/" + eventId, {
            headers: { accessToken: localStorage.getItem("accessToken") },
        }).then(res => {
            setReload(!reload)
        })
    }
    return (
        <div className='container'>
            <div className="row">
                <h1> Event Categories </h1>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <div className="btn btn-primary btn-sm mb-3" onClick={addEvent}> Add Event</div>
                </div>
            </div>
            {showEventForm && <EventForm event={selectedEvent ? selectedEvent : null} />}
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th> Image </th>
                        <th> Title</th>
                        <th> Description </th>
                        <th> Start time </th>
                        <th> Actions </th>
                    </tr>
                </thead>

                <tbody>
                    {eventList.map((event, i) => {
                        return (
                            <tr key={i}>
                                <td width="100px"><img style={{ borderRadius: '50%' }, { width: '60px' }, { height: '60px' }} src={process.env.REACT_APP_SERVER_URL + event.imageFilePath} width="100px" /></td>
                                <td >{event.title}</td>
                                <td >{event.body}</td>
                                <td >{event.startTime}</td>
                                <td>
                                    <div
                                        className="btn btn-primary" onClick={() => updateEvent(event)}>Update</div>

                                    <div
                                        className="btn btn-danger" onClick={() => deleteEvent(event.id)}>Delete</div>

                                </td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>
        </div>

    );
}

import React, { useState } from 'react'

export const EventContext = React.createContext()

export const EventProvider = props => {
    const [events, setEvents] = useState([])

    const getEvents = () => {
        return fetch("http://localhost:8000/events", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            }
        })
            .then(res => res.json())
            .then(setEvents)
    }

    const createEvent = event => {
        return fetch("http://localhost:8000/events", {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
            body: JSON.stringify(event)
        })
        .then(getEvents)
    }
    return (
        <EventContext.Provider value={{events, getEvents, createEvent}} >
            { props.children }
        </EventContext.Provider>
    )
}
import React, {useContext, useEffect} from 'react'
import {EventContext} from "./EventProvider"

export const EventList = props => {
    const {events, getEvents} = useContext(EventContext)

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <article className="events">
            <header className="events_header">
                <h1>Level Up Game Events</h1>
            </header>
            {
                events.map(e => {
                    return <section key={e.id} className="registration">
                        <div className="registration__game">{e.game.title}</div>
                        <div className="registration__location">{e.location}</div>
                        <div className="registration__event_time">
                            {
                                new Date(e.event_time).toLocaleDateString("en-US",
                                {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }
                        </div>
                    </section>
                })
            }
        </article>
    )
}
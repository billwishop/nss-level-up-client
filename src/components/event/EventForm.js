import React, {useContext, useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { EventContext } from './EventProvider.js'
import { GameContext } from '../game/GameProvider.js'

export const EventForm = () => {
    const history = useHistory()
    const {getEvents, createEvent} = useContext(EventContext)
    const {games, getGames } = useContext(GameContext)
    const [currentEvent, setEvent] = useState({
        time: "",
        gameId: "",
        location: ""
    })

    useEffect(() => {
        getGames()
        .then(getEvents)
    }, [])

    const changeEventState = event => {
        const newEventState = Object.assign({}, currentEvent)
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="form">
            <h2 className="eventForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={ changeEventState }>
                        <option value="0">Select a game...</option>
                        {
                            games.map(game => (
                                <option value={game.id}>{game.title}</option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form__section">
                    <label htmlFor="location">Location:</label>
                    <input type="text" name="location" required autoFocus 
                        className="form__location"
                        value={currentEvent.location}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form__section">
                    <label htmlFor="time">Date and Time:</label>
                    <input type="datetime-local" name="time" required autoFocus 
                        className="form__time"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createEvent(currentEvent)
                    .then(()=> history.push("/events"))
                }}
                className="btn btn-primary">Create Event</button>
        </form>
    )
}
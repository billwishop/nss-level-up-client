import React, { useContext, useState, useEffect } from 'react'
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'

export const GameForm = () => {
    const history = useHistory()
    const { createGame, getGameTypes, gameTypes } = useContext(GameContext)

    /* 
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    const [currentGame, setCurrentGame] = useState({
        numberOfPlayers: "",
        title: "",
        description: "",
        gameTypeId: ""
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    useEffect(() => {
        getGameTypes()
    }, [])

    /*
        This function is responsible for updating the state of 
        the current game as the user generates it. 
    */
    const changeGameState = event => {
        const newGameState = Object.assign({}, currentGame)
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="form">
            <h2 className="form__title">Register New Game</h2>
            <fieldset>
                <div className="form__section">
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" required autoFocus 
                        className="form__title"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form__section">
                    <label htmlFor="description">Description:</label>
                    <input type="text" name="description" required autoFocus 
                        className="form__description"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form__section">
                    <label htmlFor="numberOfPlayers">Number Of Players:</label>
                    <input type="text" name="numberOfPlayers" required autoFocus 
                        className="form__numberOfPlayers"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form__section">
                    <label htmlFor="gameTypeId">Game Type:</label>
                    <select name="gameTypeId" 
                        className="form__gameTypeId"
                        onChange={changeGameState}>
                        <option value="0">Select a game type</option>
                        {
                            gameTypes.map(gt => {
                                return <option value={gt.id}>{gt.label}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                className="btn"
                onClick={evt => {
                    evt.preventDefault()
                    createGame(currentGame)
                    .then(()=> history.push("/"))
                }}>Save Game</button>
        </form>
    )
}
import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from 'react-router-dom'

export const GameList = props => {
    const {games, getGames} = useContext(GameContext)

    const history = useHistory()

    useEffect(()=>{
        getGames()
    }, [])

    return (
        <article className="games">
            <header className="games_header">
                <h1>Level Up Games</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={()=>{
                        history.push({ pathname: "/games/new"})
                    }}>
                        Register New Game
                </button>
            </header>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title}</div>
                        <div className="game__description">{game.description}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                    </section>
                })
            }
        </article>
    )
}
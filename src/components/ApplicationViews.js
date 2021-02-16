import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { EventProvider } from "./event/EventProvider"
import { GameForm } from "./game/GameForm.js"
import { EventForm } from "./event/EventForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}> 
            <GameProvider>
                <Route exact path="/">
                    <GameList />
                </Route>
            </GameProvider>
            <EventProvider>
                <GameProvider>
                    <Route exact path="/events">
                        <EventList />
                    </Route>
                    <Route exact path="/events/new">
                        <EventForm />
                    </Route>
                </GameProvider>
            </EventProvider>
            <GameProvider>
                <Route exact path="/games/new">
                    <GameForm />
                </Route>
            </GameProvider>
        </main>
    </>
}
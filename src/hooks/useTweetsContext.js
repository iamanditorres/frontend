import { TweetsContext } from "../context/TweetContext"
import { useContext } from "react"

export const useTweetsContext = () => {
    // pass state and dispatch
    const context = useContext(TweetsContext)

    // if no context
    if (!context) {
        throw Error('useTweetsContext must be used inside an TweetsContextProvider')
    }

    return context
}
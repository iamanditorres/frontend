import { createContext, useReducer } from "react"

export const TweetsContext = createContext()

export const tweetsReducer = (state, action) => {
    // update locally 
    switch (action.type) {
        case 'SET_TWEETS' :
            return {
                tweets: action.payload,
                dict: state.dict
            }
        case 'CREATE_TWEET' :
            return {
                tweets: [action.payload, ...state.tweets]
            }
        case 'DELETE_TWEET' :
            return {
                tweets: state.tweets.filter((w) => w._id !== action.payload._id)
            }
        case 'SET_DICTIONARY' :
            return {
                tweets: state.tweets,
                dict: action.payload
            }
        default:
            return state
    }
}

export const TweetsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tweetsReducer, {
        tweets: null,
        dict: null
    })

    return(
        <TweetsContext.Provider value={{...state, dispatch}}>
            { children }
        </TweetsContext.Provider>
    )
}
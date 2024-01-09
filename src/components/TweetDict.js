/* don't need this */

import { useState } from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'

const TweetDict = () => {
    const { tweets, dict, dispatch } = useTweetsContext()
    const [error, setError] = useState('')

    const getDictionary = async(classification) => {
        const response = await fetch('/api/tweets/pullDictionaries', {
            method: 'POST',
            body: JSON.stringify({"classification": classification}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }else{
            setError(null)
            return json
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        // no need to edit the other stuff

        const dictNoSeverity = await getDictionary("No Severity")
        const dictLowSeverity = await getDictionary("Low Severity")
        const dictHighSeverity = await getDictionary("High Severity")

        let dicts = {
            dictNoSeverity: dictNoSeverity,
            dictLowSeverity: dictLowSeverity,
            dictHighSeverity: dictHighSeverity
        }

        dispatch({
            type: 'SET_DICTIONARY',
            payload: dicts
        })
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <button>Build Dictionary</button>
        </form>
    )
}

export default TweetDict
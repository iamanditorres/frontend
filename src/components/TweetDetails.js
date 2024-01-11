import { useTweetsContext } from "../hooks/useTweetsContext"

const TweetDetails = ({ tweet }) => {
    const { dispatch } = useTweetsContext()

    const handleClick = async() => {
        const response = await fetch('/api/tweets/' + tweet._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_TWEET', payload:json})
        }
    }

    return (
        <div className="tweet-details">
            <h4>{tweet.id}</h4>
            <p><strong>Text: </strong>{tweet.text}</p>
            {tweet.classification &&
                <p><strong>Classification: </strong>{tweet.classification}</p>
            }
            {tweet.prediction &&
                <p><strong>Prediction: </strong>{tweet.prediction}</p>
            }
            {tweet.location &&
                <p><strong>Location: </strong>{tweet.location}</p>
            }
            {/* <p>{tweet.createdAt}</p> */}
            <span onClick={handleClick}>delete</span>
        </div>
    )
}

export default TweetDetails
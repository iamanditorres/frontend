import { useTweetsContext } from '../hooks/useTweetsContext'

const TweetFetch = () => {
    const { dispatch } = useTweetsContext()

    const handleSubmit = async(e) => {
        e.preventDefault()

        const fetchTweets = async () => {
            // try to fetch all tweets
            // can return an error because of duplicate inserts
            const response = await fetch('/api/tweets/pullTweets', {
                method: 'GET'
            })

            // after trying to insert new tweets
            // try to fetch all tweets
            const fetchNew = await fetch('/api/tweets', {
                method: 'GET'
            })

            const json = await fetchNew.json()
            console.log(json)

            // update if fetch was successful
            if (fetchNew.ok) {
                // use the dispatch function to update the local state
                dispatch({type: 'SET_TWEETS', payload: json})
            }
        }

        fetchTweets()
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <button>Fetch Tweets</button>
        </form>
    )
}

export default TweetFetch
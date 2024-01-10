import { useEffect } from 'react'

// components
import Tabs from '../components/Tabs'
import GoogleMap from '../components/GoogleMap'
import DictionaryLog from '../components/DictionaryLog'
import { useTweetsContext } from '../hooks/useTweetsContext'
import TweetDetails from '../components/TweetDetails'
import TweetClassify from '../components/TweetClassify'
import TweetFetch from '../components/TweetFetch'

const Home = () => {
    // a global context, makes sure that the local side updates without fetching server data
    const {tweets, dispatch} = useTweetsContext()

    // fire this function once when rendered
    useEffect(() => {
        const fetchTweets = async () => {
            const response = await fetch('/api/tweets')
            const json = await response.json()
            
            if (response.ok) {
                // use the dispatch function to update the local state
                dispatch({type: 'SET_TWEETS', payload: json})
            }
        }

        fetchTweets()
    }, [])

    return (
        <div className="home">
            <Tabs>
                <div label="Google Maps">
                    <div style={{height:"100vh", width:"100%"}}>
                    <GoogleMap/>
                    </div>
                </div>
                <div label="Tweets" className="test">
                    <TweetFetch/>
                    <div className = "tweets">
                        {tweets && tweets.map((tweet) => (
                            <TweetDetails key={tweet._id} tweet={tweet}/>
                        ))}
                    </div>
                </div>
                <div label="Dictionaries" className="forms">
                    <DictionaryLog/>
                </div>
                <div label="Classify" className="text">
                    <TweetClassify/>
                </div>
                <div label="Statistics" className="text">
                </div>
            </Tabs>
            
        </div>
    )
}

export default Home
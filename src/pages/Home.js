import { useEffect, useState } from 'react'

// components
import TweetDetails from '../components/TweetDetails'
import TweetAdd from '../components/TweetAdd'
import TweetDict from '../components/TweetDict'
import WorkoutForm  from '../components/WorkoutForm'
import { useTweetsContext } from '../hooks/useTweetsContext'
import DictionaryLog from '../components/DictionaryLog'
import Tabs from '../components/Tabs'

// import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

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
                <div label="a" className="test">
                    <div className = "tweets">
                        {tweets && tweets.map((tweet) => (
                            <TweetDetails key={tweet._id} tweet={tweet}/>
                        ))}
                    </div>
                </div>
                <div label="b" className="text">
                    Hello
                </div>

                <div label="c" className="forms">
                    {/* <TweetAdd/> */}
                    <TweetDict/>
                    <br/>
                    <DictionaryLog/>
                </div>      
            </Tabs>
        </div>
    )
}

export default Home
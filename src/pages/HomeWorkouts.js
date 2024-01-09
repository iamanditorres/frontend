import { useEffect, useState } from 'react'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm  from '../components/WorkoutForm'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const Home = () => {
    // a global context, makes sure that the local side updates without fetching server data
    const {workouts, dispatch} = useWorkoutsContext()

    // fire this function once when rendered
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()
            
            if (response.ok) {
                // use the dispatch function to update the local state
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className = "workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home
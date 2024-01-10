import { useState } from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'
import Table from './Table'
import Grid from '@mui/material/Grid'; // Grid version 1

const DictionaryLog = () => {
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

        // get combination
        const dictNoSeverity_data = dictNoSeverity["data"]
        const dictLowSeverity_data = dictLowSeverity["data"]
        const dictHighSeverity_data = dictHighSeverity["data"]

        // let dictAll = Object.assign({}, dictNoSeverity_data, dictLowSeverity_data, dictHighSeverity_data)
    
        // console.log(dictAll)
        let dictAll = Object.assign({}, dictNoSeverity_data)

        for (let key of Object.keys(dictLowSeverity_data)){
            if (key in dictAll){
                dictAll[key] = dictAll[key] + dictLowSeverity_data[key]
            }else{
                dictAll[key] = dictLowSeverity_data[key]
            }
        }

        for (let key of Object.keys(dictHighSeverity_data)){
            if (key in dictAll){
                dictAll[key] = dictAll[key] + dictHighSeverity_data[key]
            }else{
                dictAll[key] = dictHighSeverity_data[key]
            }
        }

        let dictFinal = {data: dictAll}

        let dicts = {
            dictNoSeverity: dictNoSeverity,
            dictLowSeverity: dictLowSeverity,
            dictHighSeverity: dictHighSeverity,
            dictFinal: dictFinal
        }

        dispatch({
            type: 'SET_DICTIONARY',
            payload: dicts
        })
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            {tweets &&
                <button>Build Dictionaries</button>
            }
            {dict &&
                <Grid container>
                    <Grid xs={3} item={true}>
                        <Table dictionary={"dictNoSeverity"}/>  
                    </Grid>
                    <Grid xs={3} item={true}>
                        <Table dictionary={"dictLowSeverity"}/>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <Table dictionary={"dictHighSeverity"}/>
                    </Grid>
                    <Grid xs={3} item={true}>
                        <Table dictionary={"dictFinal"}/>
                    </Grid>
                </Grid>
            }
            
        </form>
    )
}

export default DictionaryLog
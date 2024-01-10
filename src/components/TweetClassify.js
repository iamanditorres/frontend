import { useTweetsContext } from '../hooks/useTweetsContext'


const TweetClassify = () => {
    const {tweets, dict, dispatch} = useTweetsContext()

    const computePriors = () => {
        let no_severity_count_train = dict["dictNoSeverity"]["ids"].length
        let low_severity_count_train = dict["dictLowSeverity"]["ids"].length
        let high_severity_count_train = dict["dictHighSeverity"]["ids"].length

        let total_count = no_severity_count_train + low_severity_count_train + high_severity_count_train
        
        let p_no_severity = no_severity_count_train / total_count
        let p_low_severity = low_severity_count_train / total_count
        let p_high_severity = high_severity_count_train / total_count

        return {p_no_severity: p_no_severity, p_low_severity:p_low_severity, p_high_severity:p_high_severity}
    }    

    const getWordCount = (w, d) => {
        if (w in d){
            return d[w]
        }
        return 0
    }

    const computeVocabularySize = (d) => {
        return Object.keys(d).length
    }

    const computeWordCount = (d) => {
        return Object.values(d).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    const computeConditionalProbability = (w, dictOther, dictAll) => {
        let numerator = getWordCount(w, dictOther) + 1 /* +1 smoothing */
        let denominator = computeWordCount(dictOther) + computeVocabularySize(dictAll)
        return numerator/denominator
    }

    const computeMax = (arr) => {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }

    const computeProbability = async () => {
        let result = Object.keys(tweets).map(key => (
            {_id: tweets[key]["_id"],
            id: tweets[key]["id"],
            classification: tweets[key]["classification"],
            createdAt: tweets[key]["createdAt"],
            text: tweets[key]["text"]
            }
        ))            

        let predictionArray = []

        let {p_no_severity, p_low_severity, p_high_severity} = computePriors()

        let predictCountNoSeverity = 0
        let predictCountLowSeverity = 0
        let predictCountHighSeverity = 0

        for (let tweet of result){
            let text = tweet["text"].split(" ")
            
            let p_class_no_severity = p_no_severity
            let p_class_low_severity = p_low_severity
            let p_class_high_severity = p_high_severity

            for (let word of text){
                p_class_no_severity = p_class_no_severity * computeConditionalProbability(word, dict["dictNoSeverity"]["data"], dict["dictFinal"]["data"])
                p_class_low_severity = p_class_low_severity * computeConditionalProbability(word, dict["dictLowSeverity"]["data"], dict["dictFinal"]["data"])
                p_class_high_severity = p_class_high_severity * computeConditionalProbability(word, dict["dictHighSeverity"]["data"], dict["dictFinal"]["data"]) 
            }

            let probabilities = [p_class_no_severity, p_class_low_severity, p_class_high_severity]

            let max = computeMax(probabilities)
            let prediction = ""

            switch (max){
                case 0: 
                    prediction = "No Severity"
                    predictCountNoSeverity = predictCountNoSeverity + 1
                    break
                case 1: 
                    prediction = "Low Severity"
                    predictCountLowSeverity = predictCountLowSeverity + 1
                    break
                case 2: 
                    prediction = "High Severity"
                    predictCountHighSeverity = predictCountHighSeverity + 1
                    break
                default: 
                    prediction = "Invalid"
            }

            predictionArray.push({prediction: prediction, id: tweet["id"]})
        }

        console.log(predictCountNoSeverity, predictCountLowSeverity, predictCountHighSeverity)
        return(predictionArray)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        let data = await computeProbability()

        if(data){
            const response = await fetch('/api/tweets/UpdateTweets', {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            const json = await response.json()

            if(json.message == "Success"){
                // after updating new tweets
                // try to fetch all tweets
                const fetchNew = await fetch('/api/tweets', {
                    method: 'GET'
                })

                console.log("trying to fetch")
                const newjson = await fetchNew.json()

                // update if fetch was successful
                if (fetchNew.ok) {
                    // use the dispatch function to update the local state
                    dispatch({type: 'SET_TWEETS', payload: newjson})
                    console.log("updated succesfully")
                }
            }
        }
    }
    
    return (
        <div>
            {dict &&
                <div className="create">
                    <button onClick={handleSubmit}>Classify Tweets</button>
                </div>
            }
        </div>
    )
}

export default TweetClassify

/**
 * As shown in:
 * https://www.youtube.com/watch?v=km2LoOpdB3A
 */
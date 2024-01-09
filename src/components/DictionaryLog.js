/* don't need this */

import { useState } from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'

const DictionaryLog = () => {
    const {dict} = useTweetsContext()

    const handleSubmit = async(e) => {
        e.preventDefault()
        // no need to edit the other stuff
        console.log(dict)
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <button>Dictionary Log</button>
        </form>
    )
}

export default DictionaryLog
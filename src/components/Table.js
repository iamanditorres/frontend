import React from 'react'
import { useTweetsContext } from '../hooks/useTweetsContext'

const Table = ({dictionary}) => {
    const { dict } = useTweetsContext()

    const renderTableData = (dictionary) => {
        let cur_dict = dict[dictionary]["data"] 
        let result = Object.keys(cur_dict).map(key => (
            {word: key, count: cur_dict[key]}
        ));
        result.sort((a, b)=>b.count - a.count);

        return result.map((entry) => {
            const { word, count } = entry //destructuring
            return (
                <tr key={word}>
                    <td>{word}</td>
                    <td>{count}</td>
                </tr>
            )
        })
    }

    const renderTableHeader = () => {
        let header = ["word", "key"]
        return header.map((e) => {
            return <th key={e}>{e.toUpperCase()}</th>
        })
    }

    return(
        <div>
            <h1 id='title'>{dictionary}</h1>
            <table id='dictionaries'>
                <tbody>
                <tr>{renderTableHeader()}</tr>
                    {renderTableData(dictionary)}
                </tbody>
            </table>
        </div>
    )
}

export default Table

/**
 * Code is derived from:
 * https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
 */
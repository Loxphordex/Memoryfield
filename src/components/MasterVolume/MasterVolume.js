import React from 'react'

export default function MasterVolume({ setOutput }) {

    function changeVolume(event) {
        event.preventDefault()
        setOutput(event.target.value)
    }
    return (
        <input onChange={event => changeVolume(event)}></input>
    )
}
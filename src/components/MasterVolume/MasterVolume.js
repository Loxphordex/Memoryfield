import React from 'react'

export default function MasterVolume({ setOutput }) {

    function changeVolume(event) {
        console.log(event.target.value)
        event.preventDefault()
        setOutput(event.target.value)
    }
    return (
        <input onChange={event => changeVolume(event)}></input>
    )
}
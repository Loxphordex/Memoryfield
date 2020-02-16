import { useState, useEffect } from 'react'

export const useKey = targetKey => {
    const [pressed, setPressed] = useState(false)
    const onKeyDown = ({ key }) => {
        if (targetKey === key) {
            setPressed(true)
        }
    }
    const onKeyUp = ({ key }) => {
        if (targetKey === key) {
            setPressed(false)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)

        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])
    return pressed
}
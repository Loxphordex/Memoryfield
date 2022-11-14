import React, { useState, useEffect, useRef } from 'react'

// Dan Abramov's hook
export function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
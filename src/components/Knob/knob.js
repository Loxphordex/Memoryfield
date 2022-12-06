import React, {useState, useEffect, createRef} from 'react'
import detectMobile from '../../helpers/detectMobile'
import { usePrevious } from '../../helpers/hooks'
import '../../styles/buttons/buttons.css'

export default function Knob({
  units,
  defaultValue,
  maxValue,
  valueCallback,
  usingDecimals
}) {
  const volumeKnob = createRef()
  const [knobValue, setKnobValue] = useState(defaultValue)
  const [rotationStyles, setRotationStyles] = useState({ transform: `rotate(0deg)` })

  let
    mouseX,
    mouseY,
    knobPositionX,
    knobPositionY,
    knobCenterX,
    knobCenterY,
    adjacentSide,
    oppositeSide,
    boundingRectangle,
    currentRadiansAngle,
    radiansInDegrees,
    finalAngleInDegrees

  useEffect(() => {
    main()
  }, [volumeKnob, defaultValue])

  const main = () => {
    if (!boundingRectangle) {
      boundingRectangle = volumeKnob.current.getBoundingClientRect()
      document.addEventListener(getMouseUp(), onMouseUp)
    }

    if (previousDefaultValue != defaultValue) {
      setInitialAngle()
    }
  }

  const previousDefaultValue = usePrevious(defaultValue)

  const getMouseUp = () => {
    return detectMobile() == 'desktop' ? 'mouseup' : 'touchend'
  }

  const getMouseMove = () => {
    return detectMobile() == 'desktop' ? 'mousemove' : 'touchmove'
  }

  const onMouseDown = () => {
    document.addEventListener(getMouseMove(), onMouseMove)
  }


  const onMouseUp = () => {
    document.removeEventListener(getMouseMove(), onMouseMove)
  }

  const onMouseMove = (event) => { 
    knobPositionX = boundingRectangle.left
    knobPositionY = boundingRectangle.top

    if (detectMobile() == 'desktop') {
      mouseX = event.pageX
      mouseY = event.pageY
    } 
    
    else {
      mouseX = event.touches[0].pageX
      mouseY = event.touches[0].pageY
    }

    knobCenterX = boundingRectangle.width / 2 + knobPositionX
    knobCenterY = boundingRectangle.height / 2 + knobPositionY

    adjacentSide = knobCenterX - mouseX
    oppositeSide = knobCenterY - mouseY

    currentRadiansAngle = Math.atan2(adjacentSide, oppositeSide)
    radiansInDegrees = currentRadiansAngle * 180 / Math.PI
    finalAngleInDegrees = -(radiansInDegrees - 135)

    if (finalAngleInDegrees >= 0 && finalAngleInDegrees <= 270) {
      let ang = Math.floor(finalAngleInDegrees / (270 / 100))
      let actualVal = (ang / 100) * maxValue
      if (actualVal === 0) actualVal = 0.1
      const displayedValue = convertToString(Math.round(actualVal * 100) / 100)
      valueCallback(actualVal)
      setKnobValue(displayedValue)
      setRotationStyles({ transform: `rotate(${finalAngleInDegrees}deg)`})
      // audio.volume = knobValue / 100
    }
  }

  const setInitialAngle = () => {
      const initialValuePercentage = defaultValue / maxValue
      const initialAngle = 270 * initialValuePercentage
      setRotationStyles({ transform: `rotate(${initialAngle}deg)`})
      usingDecimals ? setKnobValue(defaultValue + '.00') : setKnobValue(defaultValue)
  }

  const convertToString = (val) => {
    if (!usingDecimals) return val
    const str = val.toString()
    const arr = str.split('.')
    if (arr.length > 1) {
      const last = arr[arr.length - 1]
      if (last.length === 2) return str
      if (last.length === 1) {
        return arr.join('.') + '0'
      }
    }

    if (arr.length === 1) return arr[0] + '.00'
  }

  return (
    <div className='knob-surround'>
      <span className='knob-label no-select'><label htmlFor={`${units}-knob`}>{units}</label></span>
      <div 
        className='knob'
        id={`${units}-knob`}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        ref={volumeKnob}
        style={rotationStyles}
      />

      <span className='max no-select'>{`${knobValue}`}</span>
    </div>
  )
}
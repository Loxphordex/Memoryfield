import React, {useState, useEffect, createRef} from 'react'
import { act } from 'react-dom/test-utils'
import detectMobile from '../../helpers/detectMobile'
import '../../styles/buttons/buttons.css'

export default function Knob({
  defaultValue,
  maxValue,
  valueCallback
}) {
  const volumeKnob = createRef()
  const [knobValue, setKnobValue] = useState(defaultValue || 0)
  const [rotationStyles, setRotationStyles] = useState({ transform: `rotate(${defaultValue || 0}deg)` })

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
  }, [volumeKnob])

  const main = () => {
    if (!boundingRectangle) {
      boundingRectangle = volumeKnob.current.getBoundingClientRect()
      document.addEventListener(getMouseUp(), onMouseUp)
    }
  }

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
      valueCallback(actualVal)
      setKnobValue(Math.floor(actualVal))
      setRotationStyles({ transform: `rotate(${finalAngleInDegrees}deg)`})
      // audio.volume = knobValue / 100
    }
  }

  return (
    <div className='knob-surround'>
      <div 
        className='knob'
        id='knob'
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        ref={volumeKnob}
        style={rotationStyles}
      />

      {/* <span className='min'>Min</span> */}
      <span className='max'>{`${knobValue}`}</span>
    </div>
  )
}
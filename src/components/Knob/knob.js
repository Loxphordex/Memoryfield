import React, {useState, useEffect, createRef} from 'react'
import detectMobile from '../../helpers/detectMobile'
import '../../styles/buttons/buttons.css'

export default function Knob() {
  const volumeKnob = createRef()
  const [knobValue, setKnobValue] = useState(0)
  const [rotationStyles, setRotationStyles] = useState({ transform: 'rotate(0deg)' })

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
      setKnobValue(Math.floor(finalAngleInDegrees / (270 / 100)))
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
        style={rotationStyles}></div>

      {/* <span className='min'>Min</span> */}
      <span className='max'>{`${knobValue}%`}</span>
    </div>
  )
}
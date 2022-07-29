import React, {useState, useEffect, createRef} from 'react'
import detectMobile from '../../helpers/detectMobile'
import '../../styles/buttons/buttons.css'

export default function Knob() {
  const volumeKnob = createRef()

  // const [mouseX, setMouseX] = useState(null)
  // const [mouseY, setMouseY] = useState(null)
  // const [knobPositionX, setKnobPositionX] = useState(null)
  // const [knobPositionY, setKnobPositionY] = useState(null)
  // const [knobCenterX, setKnobCenterX] = useState(null)
  // const [knobCenterY, setKnobCenterY] = useState(null)
  // const [adjacentSide, setAdjacentSide] = useState(null)
  // const [oppositeSide, setOppositeSide] = useState(null)
  // const [boundingRectangle, setBoundingRectangle] = useState(null)
  // const [currentRadiansAngle, setCurrentRadiansAngle] = useState(null)
  // const [radiansInDegrees, setRadiansInDegrees] = useState(null)
  const [finalAngleInDegreesState, setFinalAngleInDegreesState] = useState(null)
  const [knobValue, setKnobValue] = useState(0)
  const [displayedKnobValue, setDisplayedKnobValue] = useState('0%')
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
  }, [boundingRectangle, volumeKnob, finalAngleInDegreesState, knobValue, displayedKnobValue, rotationStyles])

  const main = () => {
    if (!boundingRectangle) {
      boundingRectangle = volumeKnob.current.getBoundingClientRect()
      document.addEventListener(getMouseUp(), onMouseUp)
    }

    // if (boundingRectangle) {
      // volumeKnob.current.addEventListener(getMouseDown(), onMouseDown)
      //document.addEventListener(getMouseUp(), onMouseUp)
    // }
  }

  const getMouseDown = () => {
    return detectMobile() == 'desktop' ? 'mousedown' : 'touchstart'
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
    try {
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
    } catch (error) {
      console.log('bounding rec: ', boundingRectangle)
      console.log(error)
    }

    try {
      if (finalAngleInDegrees >= 0 && finalAngleInDegrees <= 270) {
        // volumeKnob.current.style.transform = `rotate(${finalAngleInDegrees} deg)`
        setFinalAngleInDegreesState(finalAngleInDegrees)
        setKnobValue(Math.floor(finalAngleInDegrees / (270 / 100)))
        setRotationStyles({ transform: `rotate(${finalAngleInDegrees}deg)`})
        // audio.volume = volumeSetting / 100
        setDisplayedKnobValue(`${Math.floor(finalAngleInDegrees / (270 / 100))}%`)
      }

    } catch(error) {
      console.log(volumeKnob)
      console.log(error)
    }
  }

  return (
    <div className='knob-surround'>
      {/* <label htmlFor='knob' className='knob-value-label'>{displayedKnobValue}</label> */}
      <div 
        className='knob'
        id='knob'
        onMouseDown={onMouseDown}
        ref={volumeKnob}
        style={rotationStyles}></div>

      {/* <span className='min'>Min</span> */}
      <span className='max'>{displayedKnobValue}</span>
    </div>
  )
}
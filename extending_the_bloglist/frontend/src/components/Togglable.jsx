import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggable = forwardRef((props, refs) => {

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggle = () => {
    setVisible((prevState) => !prevState)
  }
  useImperativeHandle(refs, () => {
    return {
      toggle
    }
  })

  return <div>
    <div>
      <div style={hideWhenVisible}>

        <button style={hideWhenVisible} onClick={toggle}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button style={showWhenVisible} onClick={toggle}>Cancel</button>
      </div>
    </div>
  </div>
})

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Toggable.displayName = 'Toggable'
export default Toggable
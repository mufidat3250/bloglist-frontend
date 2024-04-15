import  React, { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const Button = Styled.button`
  padding:1rem;
  background: gray;
  border-radius:8px;
  color:white;
  font-weight:bold;
  outline:none;
  border:none;
  cursor:pointer;
  margin-top:1rem;
`
const ChildrenWrapper = Styled.div`
margin-top:5rem;
margin-bottom: 2rem;
`


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <ChildrenWrapper style={showWhenVisible}>
        {props.children}
        <Button   onClick={toggleVisibility}>cancel </Button>
      </ChildrenWrapper>
    </div>
  )
}
)
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable

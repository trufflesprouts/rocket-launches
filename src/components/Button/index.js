import React, { PropTypes } from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <button onClick={props.onClick} className={`${props.size} ${props.color}`}>
      {props.children}
    </button>
  )
}

export default Button

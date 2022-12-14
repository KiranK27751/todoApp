import React from 'react'
import PropTypes from 'prop-types'
import './button.scss'

const Button = ({ buttonText, onClick, variant, className, disabled }) => {
  return (
    <button
      className={`button ${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >{buttonText}</button>
  )
}

Button.defaultProps = {
  onClick: () => { },
  disabled: false,
  buttonText: '',
  className: '',
  variant: 'primary'
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.string
}

export default Button
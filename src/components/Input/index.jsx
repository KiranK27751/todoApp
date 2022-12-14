import React from 'react'
import PropTypes from 'prop-types'
import './input.scss'

const Input = ({ type, placeholder, onChange, value, className , disabled, errorMessage}) => {
  return (
    <div className='input-wrapper'>
      <input
        type={type}
        placeholder={placeholder}
        className={`input ${className}`}
        disabled={disabled}
        onChange={onChange}
        value={value}
      />
      {errorMessage && (<label className='error-message'>{errorMessage}</label>)}
    </div>
  )
}

Input.defaultProps = {
  type: '',
  placeholder: '',
  className: 'primary',
  disabled: false,
  onChange: () => { },
  value: ''
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default Input
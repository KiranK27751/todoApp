import React from 'react'
import './todoCard.scss'

const ToDoCard = ({title, checked, onClickCheckBox, key}) => {
  return (
    <div className='todoItem'>
      <input className='todoCompleted' type="checkbox" onChange={onClickCheckBox} key={key} checked={checked}/>
      <label className='todoTitle'>{title}</label>
    </div>
  )
}

export default ToDoCard
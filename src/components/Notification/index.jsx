import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  if(notification === null) return ''
  else  if(notification.includes('error')){
    return <div className='error'>{notification.substr(5)}</div>
  }else {
    return (
      <div className='success'>
        {notification}
      </div>
    )
  }

}

export default Notification

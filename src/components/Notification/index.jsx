import React from 'react'
import './style.css' 

const Notification = ({message}) => {
    if(message === null) return ''
   else  if(message.includes('error')){
    return <div className='error'>{message.substr(5)}</div>
}else {
  return (
    <div className='success'>
        {message}
    </div>
  )
}
 
}

export default Notification

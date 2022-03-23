import React from 'react'
import '../css/Header.css'

const Header = (props) => {
  return (
    <div className='headerContainer'>
        <div className='MainText'>Edvora</div>
        
        <div className='personName'>{props.name} 
        <div className='demoPic'>
         {props.imgLink?<img src={props.imgLink} className='profileImg' />:<></>}
        </div>
        </div>
        
        
    </div>
  )
}

export default Header
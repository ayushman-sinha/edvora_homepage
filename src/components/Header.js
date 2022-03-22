import React from 'react'
import '../css/Header.css'

const Header = () => {
  return (
    <div className='headerContainer'>
        <div className='MainText'>Edvora</div>
        
        <div className='personName'>Dhruv Jain 
        <div className='demoPic'>
            <img src='https://picsum.photos/300' className='profileImg' />
        </div>
        </div>
        
        
    </div>
  )
}

export default Header
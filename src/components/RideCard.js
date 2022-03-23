import React from 'react'
import '../css/Card.css'
const RideCard = (props) => {
  return (
    <div className='cardContainer'>
        <div className='imgContainer'>
            <img src={props.nearVal.imgLink} className='imgEdit' alt='Map_url'/>
        </div>
        <div className='textBoxRight'>
          <ul className='listEdit'>
            <li>Ride Id : <span className='textSmallEdit'> {props.nearVal.id}</span></li>
            <li>Origin Station :<span className='textSmallEdit'> {props.nearVal.origin_staton}</span></li>
            <li>station_path :<span className='textSmallEdit'> {props.nearVal.station_path}</span></li>
            <li>Date :<span className='textSmallEdit'> {props.nearVal.date}</span></li>
            <li>Distance :<span className='textSmallEdit'> {props.nearVal.distance}</span></li>
          </ul>
        </div>
        <div className='rightContainer'>
          <div className='textSmall'>{props.nearVal.city}</div>
          <div className='textSmall'>{props.nearVal.state}</div>
        </div>
    </div>
  )
}

export default RideCard
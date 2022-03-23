import {useState} from 'react'

import axios from 'axios'
import './css/styles.css'
import RideCard from './components/RideCard'
import Header from './components/Header'
const App = () => {
  const [data,setData]=useState();
 const [nearest,setNearest]=useState();
  const [past,setPast]=useState();
 const [upcoming,setUpcoming]=useState();
 const  [navRender,setNavRender]=useState();
  
  const user={
    station_code:40,
    name:"Dhruv Singh",
    profile_key:"url",
  }
  let myStation=40;
  const handleNav=(selectVal)=>{
  console.log(selectVal);
  if(selectVal==1)
  setNavRender(nearest);
  else if(selectVal==2)
  setNavRender(upcoming);
  else if(selectVal==3)
  setNavRender(past)
  else
  setNavRender(<></>)
  }
  const handleChange=async()=>{
   let response=await axios.get('https://assessment.api.vweb.app/rides');
   let ar=response.data;
  
  //  ar.sort((a,b)=>{
  //    let miniA,miniB,dif=99999;
  //    for(let i=0;i<a.station_path.length;i++){
  //      if(Math.abs(a.station_path[i]-myStation)<dif){
  //        dif=Math.abs(a.station_path[i]-myStation);
  //        miniA=(a.station_path[i]);
  //      }
  //    }
  //     dif=99999;
  //    for(let i=0;i<b.station_path.length;i++){
  //     if(Math.abs(b.station_path[i]-myStation)<dif){
  //       dif=Math.abs(b.station_path[i]-myStation);
  //       miniB=b.station_path[i];
  //     }
  //   }
  //     return miniA-miniB;
  //   });
    let dist=[];
    for(let i=0;i<ar.length;i++){
      let dif=99999,mini;
      for(let j=0;j<ar[i].station_path.length;j++){
        if(Math.abs(ar[i].station_path[j]-myStation)<dif){
          dif=Math.abs(ar[i].station_path[j]-myStation);
          mini=ar[i].station_path[j];
        }       
      }
      let tmp=[];
      tmp.push(Math.abs(mini-myStation));
      tmp.push(ar[i]);
      dist.push(tmp);
      
    }
    dist.sort((a,b)=>parseInt(a[0])-parseInt(b[0]));
  //   let date1=Date.parse(dist[0][1].date);
  //   let dateNow=new Date();
  //   dateNow=Date.parse(dateNow);
  //  console.log(date1,dateNow);
    nearestCard(dist);
    upcomingCard(dist);
    PastCard(dist);
   
   
  }
  function getTheDate(dateF){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
    let date1=(dateF);
    let day=date1.getDate();
    //console.log(dateF);
    let month=monthNames[date1.getMonth()];
    let year=date1.getFullYear();
    let hours=date1.getHours();
    let minutes=date1.getMinutes();
    if(hours<10)
    hours='0'+hours;
    if(minutes<10)
    minutes='0'+minutes;
  
    if(day===1||day===21||day===31)
    day+='st';
    else if(day===2)
    day+='nd'
    else if(day===3)
    day+='rd'
    else
    day+='th';
    return day+' '+month+' '+year+' '+hours+':'+minutes;
  }
  function nearestCard(dist){
    let nearArray=[];
    for(let i=0;i<dist.length;i++){     
      let nearObj={
        id:dist[i][1].id,
        origin_staton:dist[i][1].origin_station_code,
        station_path:JSON.stringify(dist[i][1].station_path),
        date:getTheDate(new Date(dist[i][1].date)),
        distance:dist[i][0],
        imgLink:dist[i][1].map_url,
        city:dist[i][1].city,
        state: (dist[i][1].state)
      }
    
      nearArray.push(<RideCard key={i} nearVal={nearObj}></RideCard>)
    }
    setNearest(nearArray);
    
  }
  function upcomingCard(dist){
    let dateNow=new Date();    
    console.log(dateNow)
    let upcomingArray=[];
    for(let i=0;i<dist.length;i++){  
      let date1=new Date(dist[i][1].date);
     
      if(date1>=dateNow){
     // console.log(date1,date1.getDate());   
      let nearObj={
        id:dist[i][1].id,
        origin_staton:dist[i][1].origin_station_code,
        station_path:JSON.stringify(dist[i][1].station_path),
        date:getTheDate(date1),
        distance:dist[i][0],
        imgLink:dist[i][1].map_url,
        city:dist[i][1].city,
        state: (dist[i][1].state)
      }            
      upcomingArray.push(<RideCard key={i} nearVal={nearObj}></RideCard>)
    }
    }
     setUpcoming(upcomingArray);
  }
  function PastCard(dist){
    let dateNow=new Date();

    let pastArray=[];
    for(let i=0;i<dist.length;i++){  
      let date1=new Date(dist[i][1].date);
      if(date1<dateNow){
      let nearObj={
        id:dist[i][1].id,
        origin_staton:dist[i][1].origin_station_code,
        station_path:JSON.stringify(dist[i][1].station_path),
        date:getTheDate(date1),
        distance:dist[i][0],
        imgLink:dist[i][1].map_url,
        city:dist[i][1].city,
        state: (dist[i][1].state)
      }   
         
      pastArray.push(<RideCard key={i} nearVal={nearObj}></RideCard>)
    }
    }
     setPast(pastArray);
  }
  return (
    <div className='container'>
      <Header></Header>
      <div className='upperNav'>
        <button type='button'  onClick={(e)=>handleNav(1)}>Nearest Rides</button>
        <button type='button'  onClick={(e)=>handleNav(2)}>Upcoming Rides</button>
        <button type='button' onClick={(e)=>handleNav(3)}>Past Rides</button>
      </div>
      <div className='nearestC'>
     {navRender}
     </div>
      <button type='button' onClick={(e)=>handleChange()}>Click</button>
    </div>
  )
}

export default App
/*
<div className='header'>
        <div className='leftDash'>Edvora</div>
        <div className='rightDashName'>Dhruv Jain</div>
        <div className='rigtDashPic'></div>
        </div>
        
 */
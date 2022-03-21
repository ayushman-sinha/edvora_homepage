import {useState} from 'react'
import axios from 'axios'
import './css/styles.css'
import RideCard from './components/RideCard'
const App = () => {
  const [data,setData]=useState();
  const user={
    station_code:40,
    name:"Dhruv Singh",
    profile_key:"url",
  }
  let myStation=40;
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
    console.log(dist);
  }
  return (
    <div className='container'>
      <RideCard></RideCard>
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
import {useState} from 'react'
import { Icon } from '@iconify/react';
import axios from 'axios'
import './css/styles.css'
import RideCard from './components/RideCard'
import Header from './components/Header'
const App = () => {
  const [data,setData]=useState({first:'',second:''});
 const [nearest,setNearest]=useState();
  const [past,setPast]=useState();
 const [upcoming,setUpcoming]=useState();
 const  [navRender,setNavRender]=useState();
  const [nameProfile,setNameProfile]=useState();
  const [imgProfile,setImgProfile]=useState();
  const [search,setSearch]=useState(true);
  const [filterToggle,setFilterToggle]=useState(false);
  const [city,setCity]=useState();
  const [stateN,setStateN]=useState();
 const [errorDetect,setErrorDetect]=useState(false);
 const [dup1,setDup1]=useState();
 const [dup2,setDup2]=useState();
 const [dup3,setDup3]=useState();


const filterOn=(e)=>{
  setFilterToggle(!filterToggle);
}
  const handleData=(e,k)=>{
    if(k===1)
  setData({...data,first:e.target.value});
  else
  setData({...data,second:e.target.value});
  }
  const handleNav=(selectVal)=>{
  //console.log(selectVal);
  if(selectVal==1)
  setNavRender(nearest);
  else if(selectVal==2)
  setNavRender(upcoming);
  else if(selectVal==3)
  setNavRender(past);
 
 
  }
  const handleChange=async()=>{
   let response=await axios.get('https://assessment.api.vweb.app/rides');
   let ar=response.data;
    
   let myStation=data.second;
   setNameProfile(data.first);
   setImgProfile('https://picsum.photos/300');
   if(data.second&&data.first){
   setSearch(false);
   setErrorDetect(false)
  }
  else
   setErrorDetect(true)
   let dist=[];
    
    let cityList=[];let stateList=[];
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
      cityList.push(<option value={ar[i].city} className='optionEdit'>{ar[i].city}</option>);
      stateList.push(<option value={ar[i].state} className='optionEdit'>{ar[i].state}</option>);
    }
    dist.sort((a,b)=>parseInt(a[0])-parseInt(b[0])); 
    
    nearestCard(dist);
    upcomingCard(dist);
    PastCard(dist);
    setCity(cityList);
    setStateN(stateList);
   
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
    else if(day===2||day===22)
    day+='nd'
    else if(day===3)
    day+='rd'
    else
    day+='th';
    return day+' '+month+' '+year+' '+hours+':'+minutes;
  }
  function nearestCard(dist){
    let nearArray=[];
    console.log(dist[0][1].city)
    
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
    setDup1(nearArray);
    setNavRender(nearArray);
  }
  function upcomingCard(dist){
    let dateNow=new Date();      
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
     setDup2(upcomingArray)
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
     setDup3(pastArray)
  }
  const filterResults=(k,e)=>{   
    setNearest(dup1);
    setUpcoming(dup2);
    setPast(dup3);
    let tmp1=[],tmp2=[],tmp3=[];
    for(let i=0;i<dup1.length;i++)
    {      
      if(e.target.value===dup1[i].props.nearVal.city||e.target.value===dup1[i].props.nearVal.state)
      tmp1.push(dup1[i])
    }
    for(let i=0;i<dup2.length;i++)
    {      
      if(e.target.value===dup2[i].props.nearVal.city||e.target.value===dup2[i].props.nearVal.state)
      tmp2.push(dup2[i])
    }
    for(let i=0;i<dup3.length;i++)
    {      
      if(e.target.value===dup3[i].props.nearVal.city||e.target.value===dup3[i].props.nearVal.state)
      tmp3.push(dup3[i])
    }
    
     setNearest(tmp1);
     setUpcoming(tmp2);
     setPast(tmp3);
  
  }
  return (
    <div className='container'>
      <Header name={nameProfile} imgLink={imgProfile}></Header>
      <div className='upperNav'>
        <div className='navLeft'>
        <button type='button' className='customButton'  onClick={(e)=>handleNav(1)}>Nearest Rides</button>
        <button type='button' className='customButton' onClick={(e)=>handleNav(2)}>Upcoming Rides ({!upcoming?0:upcoming.length})</button>
        <button type='button' className='customButton' onClick={(e)=>handleNav(3)}>Past Rides ({!past? 0:past.length})</button>
      </div>
      <div className='filterButton'>
        <button type='button' className='customFilter' onClick={(e)=>filterOn()}><Icon icon="bi:filter-left"  width="30" height="30" /> Filters</button>
         {filterToggle? <div className='filterMenu'>
           <h2>Filters</h2>
           <div className='selectContainer'>
           
             <select className='selectMenu' onChange={(e)=>filterResults(1,e)} >
             <option value="0" className='optionEdit'>Select City:</option>
             {city}
             </select>
          
           
           <select className='selectMenu' onChange={(e)=>filterResults(2,e)}>
             <option value="0" className='optionEdit'>Select State:</option>
             {stateN}
             </select>
                    
           </div>
         </div>:<></>}
      </div>
      </div>
      <div className='nearestC'>
        {search?(<div className='inputBox'>
          <div className='inputContainer'>
  <input type='text' placeholder='Name..' className='inputEdit' onChange={(e)=>handleData(e,1)}></input>
  <input type='number' placeholder='Station Code..'  className='inputEdit'  onChange={(e)=>handleData(e,2)}></input>
  <button type='button' className='searchButton' onClick={(e)=>handleChange()}><Icon icon="bi:search" width="30" height="30" /></button>
   </div>
  {errorDetect?<p>Please enter the correct Name and Station Code.</p>:<></>}
</div>):navRender}
     
     </div>
      
    </div>
  )
}

export default App;

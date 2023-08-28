import React, {useState, useEffect} from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import checkProfile from "../utilities/checkProfile";
import IssuesListPage from './IssuesListPage';
import { useNavigate, Navigate } from "react-router-dom";

import './styles/HomePage.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewProfileForm from "../components/NewProfileForm";

const HomePage = () => {
let [profile, setProfile] = useState(true);
let [filter, setFilter] = useState('active');
const { user, isAuthenticated, isLoading } = useAuth0();
const navigate = useNavigate();

useEffect(() => {
  checkProf();
   
  }, [isAuthenticated,isLoading]);

let checkProf = async () => {
  if (isAuthenticated && !isLoading){ 

    let abc = await checkProfile(user.sub);
    setProfile(abc);
   }
  else {console.log(`not auth`)}
}

if (!profile){
    return (<> <Navigate to='/newprofile'/></>
    // <button onClick={() => {navigate(`/newprofile`)}}>complete your profile</button>

    )
}
else{return( <div className='HomePage'>
<div className='TopBar'>
<div className='FilterContainer'>
<div className={`FilterButton ${(filter=='active')? 'Active':''}`} onClick={()=>{setFilter('active')}}  >All Active Issues</div>
{/* <div className={`FilterButton ${(filter=='sorted')? 'Active':''}`} onClick={()=>{setFilter('sorted')}}>Top Issues</div> */}
<div className={`FilterButton ${(filter=='resolved')? 'Active':''}`} onClick={()=>{setFilter('resolved')}}>Resolved Issues</div>
</div>
{/* <div className='Filler'></div>
<Link to='/post' className='PostButton'><FontAwesomeIcon icon={faPlus} /><span>New Post</span></Link> */}
</div>

{/* {filter} */}
<br />
<IssuesListPage filter={filter}/> </div>
)


}
    

  
}

export default HomePage

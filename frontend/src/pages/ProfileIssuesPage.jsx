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

const ProfileIssuesPage = () => {
let [profile, setProfile] = useState('');
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


return( <div className='HomePage'>
  <h2>My Reported Issues:</h2>

{profile? <IssuesListPage profileId={profile.id}/> : <></>}

 </div>
)



    

  
}

export default ProfileIssuesPage

import React, { useState, useEffect } from "react";
import IssueCard from "../components/IssueCard";
import './IssuesListPage.scss'
import checkProfile from "../utilities/checkProfile";
import { useAuth0 } from "@auth0/auth0-react";
import { async } from "@firebase/util";

const IssuesListPage = ({filter, profileId}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let [issues, setIssues] = useState([]);
  // let [profile, setProfile] = useState(true)

  useEffect(() => {
    getIssues();
  // checkProf();
   
  }, [isAuthenticated,isLoading,filter]);

// let checkProf = async () => {
//   if (isAuthenticated && !isLoading){ 

//     let abc = await checkProfile(user.sub);
//     setProfile(abc);
//    }
//   else {console.log(`not auth`)}
// }

  let getIssues = async () => {
    if (filter){
      let response = await fetch(`/api/getissues/${filter}`);
      console.log('filterissues')
      let data = await response.json();
      // console.log(data)
      setIssues(data);
    }else if(profileId){
      console.log('myissues')
      let response = await fetch(`/api/profile/${profileId}/issues`);

      let data = await response.json();
      // console.log(data)
      setIssues(data);
    }
 
    // let response = await fetch('/api/issues');
 
  };

  return (
    <div className="ListContainer">

      
 {/* {!profile?  <>complete your profile</> : <>not</>} */}

      <div className="IssuesList">
       

       
        {issues.map((issue, index) => (
          <IssueCard issue={issue} key={index}></IssueCard>
        ))}
      </div>
    </div>
  );
};

export default IssuesListPage;

import React, { useEffect, useState } from "react";

import { useAuth0} from "@auth0/auth0-react";
import checkProfile from "../utilities/checkProfile";
export const LoginChecker = ({children, cname}) => {
  const { isAuthenticated, isLoading } = useAuth0();
 if( isAuthenticated && !isLoading ){
return (
  <div className={cname? cname:`LoginChecker`} >{children} </div>
)}

else{
  return (<></>)
}
}


export const AuthorityChecker =  ({children}) => {
  const { user,isAuthenticated, isLoading } = useAuth0();
  const [isAuthority, setAuthority] = useState(false);

  useEffect(() => {
    checkProf();
     
    }, [isAuthenticated,isLoading]);
  
  let checkProf = async () => {
    if (isAuthenticated && !isLoading){ 
  
      let abc = await checkProfile(user.sub);
      console.log(abc);
      setAuthority(abc.isAuthority);
     }
    else {console.log(`not auth`)}
  }



 if( isAuthenticated && !isLoading && isAuthority){
return (

  <div className="AuthorityChecker">  {console.log(isAuthority)}{children} </div>
)}

else{
  return (<></>)
}
}




const UserChecker = ({children,id}) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
   if(user?.sub == id && isAuthenticated && !isLoading ){
  return (
    <div className='UserChecker'>{children} </div>
  )}

  else{
    return (<></>)
  }
}

export default UserChecker;

import React from 'react'
import NewProfileForm from '../components/NewProfileForm'

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import  Loading  from '../components/loading';


const ProfileFormPage = () => {


  return (
    <NewProfileForm />
      
    
  )
}

export default withAuthenticationRequired(ProfileFormPage, {
    onRedirecting: () => <Loading />,
  });

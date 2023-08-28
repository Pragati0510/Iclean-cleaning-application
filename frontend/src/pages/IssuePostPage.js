import React from 'react'
import IssueForm from '../components/IssueForm'
import { useParams } from 'react-router-dom'; 
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../components/loading';
const IssuePostPage = ({update}) => {


  return (
    <div>
      < IssueForm />
    </div>
  )
}

export default withAuthenticationRequired(IssuePostPage, {
  onRedirecting: () => <Loading />,
});

// export default IssuePostPage;

// pass in ID from issuepage

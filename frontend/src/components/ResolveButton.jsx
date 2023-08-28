import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { LoginChecker } from "./UserChecker";
import './styles/UpVoteButton.scss'
import { useNavigate } from "react-router-dom";

 function ResolveButton  ({issueId, upvotes}) {
  const navigate = useNavigate();
    const Resolve = async () =>{
        let response = await fetch(`/api/issues/${issueId}/resolve`);
        let data = await response.json();
          alert("RESOLVED", data);
          navigate(`/issue/${issueId}`)

      
    }
    // var votes =10;
    return (
    <div className='ResolveButton' onClick={() =>{Resolve()}}>
       Mark Resolved
    </div>
  )
}

export default ResolveButton;

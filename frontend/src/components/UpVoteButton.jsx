import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { LoginChecker } from "./UserChecker";
import './styles/UpVoteButton.scss'

 function UpVoteButton  ({issueId, upvotes}) {
    const [votes, setVotes] = useState(upvotes);
    const UpVote = async () =>{
        let response = await fetch(`/api/issues/${issueId}/upvote`);
    
          let data = await response.json();
          alert("upvoted succesfully");
          setVotes(data);
      
    }
    // var votes =10;
    return (
    <div className='UpvoteContainer'>
        <LoginChecker>
    <div className='UpVoteButton' title='upvote' onClick={() => {UpVote()}}>
        {/* <FontAwesomeIcon icon={solid('arrow-up')} /> */}
        <FontAwesomeIcon icon={faArrowUp} />
    </div>
    </LoginChecker>
    <div className='Number'>{votes} {votes>1? 'upvotes':'upvote'}</div>
    
    </div>
  )
}

export default UpVoteButton;

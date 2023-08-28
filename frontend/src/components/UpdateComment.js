import React, { useState }from 'react'
import { useParams } from 'react-router-dom'; 
import { useNavigate } from "react-router-dom";



const UpdateComment = ({content,id}) => {
  // let {id} = useParams();
  
  const [desc, setDesc] = useState(content);

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const navigate = useNavigate();

  const postIssue = async ({  desc }) => {
    console.log('putting')

    let response = await fetch(`/api/comments/${id}/update`, {
      method: "PUT",
      body: JSON.stringify({
        CommentText: desc,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let data = await response.json();
    console.log(`comment udpated ${data}`);
    alert("updated succesfully");
    navigate(0);
  
  };


  const handleSubmit = (e) => {
    postIssue({  desc});
    e.preventDefault();

  };


  return (
    <div>
     
      <form
      className='CommentForm'
        
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/*when user submit the form , handleSubmit()
		function will be called .*/}

         
          {/*when user write in name input box , handleChange()
			function will be called. */}
         
    
          <input
            type="text"
            className="AddComment"
            value={desc}
            required
            onChange={(e) => {
              handleDescChange(e);
            }}
          />

<input type="submit" value="Update" />
        </form>
          <br />


    </div>
  )
}

export default UpdateComment

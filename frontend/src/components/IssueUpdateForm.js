//  "Issue_id": 1,
    // "Upvotes": 10,
    // "Description": "Kachra Uthao",
    // "Title": "Mere ghar ke bahar kachra hai",a
    // "ImgUrl": "https://imgur.com/rWxRN22",
    // "IssueCreatedTime": "2022-10-13",
    // "Issue_posted_by": 1,
    // "Issue_Loc": 453331

     // let response = await fetch("api/issues/1/update", {
    //   method: "PUT",
    //   body: JSON.stringify({
    //     'Title': title,
    //     'Description': desc,
    //     'Issue_posted_by': 1,
    //     'Issue_Loc': 453331,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
      
    //   },
    // });
    // let data = await response.json();

//  "Issue_id": 1,
// "Upvotes": 10,
// "Description": "Kachra Uthao",
// "Title": "Mere ghar ke bahar kachra hai",a
// "ImgUrl": "https://imgur.com/rWxRN22",
// "IssueCreatedTime": "2022-10-13",
// "Issue_posted_by": 1,
// "Issue_Loc": 453331

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'; 
import './IssueForm.scss';
function IssueUpdateForm() {
  let {id} = useParams();
 
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [area, setArea] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getIssue();
  }, []);

  let getIssue = async () => {
    let response = await fetch(`/api/issues/${id}`);
    let data = await response.json();
    console.log(data)
    setTitle(data.Title);
    setDesc(data.Description);
  };


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
  };

  const postIssue = async ({ title, desc, area }) => {
    console.log(area);

    let response = await fetch(`/api/issues/${id}/update`, {
        method: "PUT",
        body: JSON.stringify({
          'Title': title,
          'Description': desc,
          // 'Issue_posted_by': 1,
          'Issue_Loc': 453331,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        
        },
      });
     
    let data = await response.json();
    console.log(`navigating to issue ${data}`);
    alert("updated succesfully");
    navigate(`/issue/${data}`);
  };

  const handleSubmit = (e) => {
    postIssue({ title, desc, area });
    e.preventDefault();
  };

  return (
    <div className="FormContainer">
      <header className="App-header">
        <form 
        className="MainForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          {/*when user submit the form , handleSubmit()
		function will be called .*/}
        
        <div className="FormTitle"> Post Update Form </div>
          <div className="Filler"></div>
     
          <label className="TitleLabel">Title</label>
          <br />
          <input
            type="text"
            value={title}
            required
            onChange={(e) => {
              handleTitleChange(e);
            }}
          />
          <br />
          {/*when user write in name input box , handleChange()
			function will be called. */}
          <label>Description</label>
          <br />
          <input
            type="text"
            value={desc}
            required
            onChange={(e) => {
              handleDescChange(e);
            }}
          />
          <br />
          {/*when user write in age input box , handleAgeChange()
			function will be called. */}
          <label>Area</label>
          <br />
          <select
            id="area"
            name="area"
            required
            onChange={(e) => {
              handleAreaChange(e);
            }}
          >
            <option value={453331}>453331</option>
           
          </select>

          <input type="submit" className="SubmitButton" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default IssueUpdateForm;

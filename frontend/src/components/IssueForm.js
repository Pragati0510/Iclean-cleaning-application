//  "Issue_id": 1,
// "Upvotes": 10,
// "Description": "Kachra Uthao",
// "Title": "Mere ghar ke bahar kachra hai",a
// "ImgUrl": "https://imgur.com/rWxRN22",
// "IssueCreatedTime": "2022-10-13",
// "Issue_posted_by": 1,
// "Issue_Loc": 453331

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./IssueForm.scss";
import checkProfile from "../utilities/checkProfile";
import { useAuth0 } from "@auth0/auth0-react";

function IssueForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [area, setArea] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [ImgUrl, setImgUrl] = useState("");
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!");
    } else {
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            setImgUrl(url);
          });
        }
      );
    }
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

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
    console.log('isAuthenticated',isAuthenticated);
    let a = await checkProfile(user.sub);
    let profileId = await a.id;
    console.log('i am user',profileId);


    console.log(ImgUrl);
    if (percent != 100) {
      alert("click upload file");
    } else {
      let response = await fetch("/api/issues/new", {
        method: "POST",
        body: JSON.stringify({
          Title: title,
          Description: desc,
          // Issue_posted_by: "auth0|635a89eb649425b8ed0ebedc",
          Issue_posted_by: profileId,
          Issue_Loc: 453331,
          ImgUrl: ImgUrl,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let data = await response.json();
      console.log(`navigating to issue ${data}`);
      alert("submitted succesfully");
      navigate(`/issue/${data}`);
    }
  };

  const handleSubmit = async (e) => {
    console.log(ImgUrl);
   
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
          <div className="FormTitle"> Post Issue Form </div>
          <div className="Filler"></div>
     
          <label className="TitleLabel">Title</label>

          <input
            type="text"
            className="TitleInput"
            value={title}
            required
            onChange={(e) => {
              handleTitleChange(e);
            }}
          />

   
          {/*when user write in name input box , handleChange()
			function will be called. */}
          <label className="DescriptionLabel">Description</label>

          <input
            type="text"
            className="DescriptionInput"
            value={desc}
            required
            onChange={(e) => {
              handleDescChange(e);
            }}
          />


          <label className="FileLabel">Insert Picture</label>
          <div className="FileStuff">
            <input
              className="FileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />

            <div className="UploadButton" onClick={handleUpload}>
              Upload
            </div>
          </div>
          <p className="Percent">{percent} "% done"</p>
        
          {/*when user write in age input box , handleAgeChange()
			function will be called. */}
          <label className="AreaLabel">Area</label>
         
          <select
            className="AreaInput"
            id="area"
            name="area"
            required
            onChange={(e) => {
              handleAreaChange(e);
            }}
          >
            <option value={453331}>453331</option>
            <option value={452001}>452001</option>
            {/* <option value={452001}>452001</option> */}
          </select>

          <input className="SubmitButton" type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default IssueForm;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storage from "../FirebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./IssueForm.scss";
import { useAuth0 } from "@auth0/auth0-react";
import checkProfile from "../utilities/checkProfile";

function ProfileUpdateForm() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [desc, setDesc] = useState("");
  const [area, setArea] = useState(453331);
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [ImgUrl, setImgUrl] = useState("");

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    getProfile();
  }, []);

  let getProfile = async () => {
    let data = await checkProfile();
    console.log(data);
    // setFirstName(data.first_name);
    // setLastName(data.last_name);
    // setAge(data.age);
    // setArea(data.area);
  };


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

  const handleFNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    console.log(area);
  };

  const postProfile = async ({ first_name,last_name,age,desc, area }) => {


    console.log(ImgUrl);
    if (percent != 100) {
      alert("click upload file");

    }  if (!isAuthenticated) {
      alert('login first');
    } 
    else if (percent == 100 && !isLoading && isAuthenticated) {
    
      let response = await fetch("/api/profile/new", {
        method: "POST",

        // "auth0_id": "",
        // "First_name": "Shaily",
        // "Last_name": "Udiya",
        // "email": "shaily@hajela.com",
        // "Description": "Hi, I'm shaily",
        // "Age": 20,
        // "Lives_in": 453331,
        // "ProfileImgUrl": ""
        body: JSON.stringify({
          auth0_id:user.sub,
          First_name: first_name,
          Last_name: last_name,
          email: user.email,
          Description: desc,
          Age: age,
          Lives_in: area,
          ProfileImgUrl: ImgUrl
          
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      let data = await response.json();
      console.log(`navigating to issue ${data}`);
      alert("submitted succesfully");
      navigate(`/`);
    }
  };

  const handleSubmit = (e) => {
    console.log(ImgUrl);
    postProfile({ first_name,last_name,age,desc, area });
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
          <div className="FormTitle"> Let's know more about you</div>
          <div className="FormDescription"> You need to complete your profile before moving forward </div>
          <div className="Filler"></div>
     
          <label className="TitleLabel">First Name</label>

          <input
            type="text"
            className="TitleInput"
            value={first_name}
            required
            onChange={(e) => {
              handleFNameChange(e);
            }}
          />

<label className="TitleLabel">Last Name</label>

          <input
            type="text"
            className="TitleInput"
            value={last_name}
            required
            onChange={(e) => {
              handleLNameChange(e);
            }}
          />

<label className="TitleLabel">Age</label>

<input
  type="number"
  className="TitleInput"
  value={age}
  required
  onChange={(e) => {
    handleAgeChange(e);
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
         <label className="TitleLabel">Area</label>

<input
  type="number"
  className="TitleInput"
  value={area}
  required
  onChange={(e) => {
    handleAreaChange(e);
  }}
/>

          <input className="SubmitButton" type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default ProfileUpdateForm ;

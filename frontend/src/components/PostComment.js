//  "id": 1,
// "CreatedTime": "2022-10-13",
// "CommentText": "This is very big issue, please solve immediately",
// "Posted_By": 1,
// "IssueId": 1

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import checkProfile from "../utilities/checkProfile";
import { useAuth0 } from "@auth0/auth0-react";

const PostComment = () => {
  let { id } = useParams();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [desc, setDesc] = useState("");

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };
  const navigate = useNavigate();

  const postIssue = async ({ desc }) => {
    let a = await checkProfile(user.sub);
    let profileId = await a.id;
    console.log("i am user", profileId);

    let response = await fetch(`/api/issues/${id}/addComment`, {
      method: "POST",
      body: JSON.stringify({
        IssueId: id,
        CommentText: desc,
        Posted_By: profileId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    let data = await response.json();
    console.log(`comment posted ${data}`);
    alert("commented succesfully");
    navigate(0);
  };

  const handleSubmit = (e) => {
    postIssue({ desc });
    e.preventDefault();
  };

  return (
    <div>
      <form className="CommentForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
  

        <br />
        <input
          className="AddComment"
          type="text"
          placeholder="Write your views"
          value={desc}
          required
          onChange={(e) => {
            handleDescChange(e);
          }}
        />

        <input className="SubmitComment" type="submit" value="Comment" />
      </form>
      <br />
    </div>
  );
};

export default PostComment;

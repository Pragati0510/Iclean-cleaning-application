import React, { useEffect, useState } from "react";
import "./IssuePage.scss";
import { Link, useNavigate } from "react-router-dom";
import PostComment from "../components/PostComment";
import UpdateComment from "../components/UpdateComment";
import { useParams } from "react-router-dom";
import IssueCard from "../components/IssueCard";
import { useAuth0 } from "@auth0/auth0-react";
import UserChecker, { LoginChecker } from "../components/UserChecker";
import { AuthorityChecker } from "../components/UserChecker";
import ResolveButton from "../components/ResolveButton";

// {() =>{
//   if (isAuthenticated && !isLoading){
//     if(issue?.Issue_Posted_by){
//       var a = issue?.Issue_Posted_by
//       if (a = user.sub){
//         return(<>hello</>)
//       }
//     }
//   }
// }}

const IssuePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let { id } = useParams();
  let [issue, setIssue] = useState(null);
  let [comments, setComments] = useState(null);
  let [open, setOpen] = useState(false);
  let [editId, setEditID] = useState(0);
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const deleteIssue = async () =>{
    let response = await fetch(`/api/issues/${issue.Issue_id}/delete`, {
      method: "DELETE",
    });

    let data = await response.json();
    console.log(`navigating to issue ${data}`);
    alert("deleted succesfully");
    navigate(`/`);
  }


  const deleteComment = async () =>{
    let response = await fetch(`/api/comments/${editId}/delete`, {
      method: "DELETE",
    });

    let data = await response.json();
    // console.log(`navigating to issue ${data}`);
    alert("comment deleted succesfully");
    // getComments();
    navigate(0);

  }

  useEffect(() => {
    getComments();
    getIssue();
  }, [id,isAuthenticated]);

  let getComments = async () => {
    let response = await fetch(`/api/issues/${id}/comments`);
    let data = await response.json();
    console.log(data);
    setComments(data);
  };

  let getIssue = async () => {
    let response = await fetch(`/api/issues/${id}`);
    let data = await response.json();
    setIssue(data);
  };

  return (
    <div className="main-container">
      <div className="IssueBlock">
        <div className="TitleBlock">
          <div className="Title">
            {" "}
            {issue?.isResolved ? <span>Resolved: </span> : <></>}
            {issue?.Title}
          </div>
          <div className="SubTitle">
            <span className="Location">
              {issue?.Issue_Loc.Area}, {issue?.Issue_Loc.City}
            </span>
            <span> | </span>
            <span className="PostedBy">
              Reported by: {issue?.Issue_posted_by.First_name}{" "}
              {issue?.Issue_posted_by.Last_name}
            </span>
            <span> | </span>
            <span className="Upvotes">
              {issue?.Upvotes} {issue?.Upvotes > 1 ? "upvotes" : "upvote"}
            </span>

            <Link className="UpdatePostButton" to="update">
              <UserChecker id={issue?.Issue_posted_by.auth0_id}>
                <span> | Edit Post</span>
              </UserChecker>
            </Link>
            
            <a className="UpdatePostButton" onClick={()=>{deleteIssue()}}>
              <UserChecker id={issue?.Issue_posted_by.auth0_id}>
                <span> | Delete </span>
              </UserChecker>
            </a>
          </div>

          <div className="Description">{issue?.Description}</div>
        </div>
        <div className="ImgContainer">
          <img src={issue?.ImgUrl} />
        </div>
        <AuthorityChecker>
          <div className="MessageBox">
            <div className="ResolvePrompt">
              {issue?.isResolved ? (
                <></>
              ) : (
                <>
                  <span className="MessageText">
                    Has this issue been resolved?
                  </span>{" "}
                  <ResolveButton issueId={issue?.Issue_id} />
                </>
              )}
            </div>
          </div>
        </AuthorityChecker>
      </div>
      <hr className="Line" />
      <div className="Comments">
        <h2>Comments</h2>
        <LoginChecker>
          <PostComment />
        </LoginChecker>

        {!isAuthenticated && !isLoading ? (
          <div className="MessageBox Login" onClick={() => loginWithRedirect()}>
            Login to comment
          </div>
        ) : (
          <></>
        )}

        <div className="CommentList">
          {comments?.map((comment, index) => (
            <div key={index} className="CommentContainer">
              
              <div className="Top">
                <div className="ProfilePic" title={`Posted by: ${comment.Posted_By.First_name}`}>
                  <img src={comment.Posted_By.ProfileImgUrl} alt="ProfileImage"></img>
                </div>
                <div className="TextContainer">
                  <div className="IssueTitle">{comment.Posted_By.First_name}</div>
                  <div className="IssueLoc">{comment.CreatedTime}
                  <UserChecker id={comment.Posted_By.auth0_id}>|  <a
                      onClick={() => {
                        setEditID(comment.id);
                        setOpen(true);

                      }}
                    >
                      Edit Comment
                    </a> </UserChecker>
                    {/* <UserChecker id={comment.Posted_By.auth0_id}>|  <a
                      onClick={() => {
                        setEditID(comment.id);
                        deleteComment();
                        
                      }}
                    >
                      Delete Comment
                    </a> </UserChecker> */}
                  </div>
                  
                </div>
              </div>

              {open === true && editId == +comment.id ? (
                  <></>
                ) : (
                  <>
                   
                   <div className="CommentText">{comment.CommentText} </div>
              
                  </>
                )}

              

              <UserChecker id={comment.Posted_By.auth0_id}>
                {open === true && editId == +comment.id ? (
                  <UpdateComment
                    content={comment.CommentText}
                    id={comment.id}
                  />
                ) : (
                  <>
                    {" "}
                    
              
                  </>
                )}
              </UserChecker>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IssuePage;

import React from "react";
import { Link } from "react-router-dom";
import "./ListItem.scss";
import UpVoteButton from "./UpVoteButton";
{
  /* <div className="expander"></div> */
}
{
  /* <div className='Upvotes'>{Upvotes} {Upvotes>1? 'upvotes':'upvote'}</div> */
}

const IssueCard = ({
  issue,
  issue: {
    Title,
    Description,
    ImgUrl,
    Issue_id,
    Upvotes,
    Issue_Loc,
    Issue_posted_by,
  },
}) => {
  const { ProfileImgUrl, First_name, Last_name } = Issue_posted_by;
  const { City, Area } = Issue_Loc;
  const Full_Name = First_name + " " + Last_name;
  return (
    <div className="ListItem-Container">
      
      <div className="Top">
        <div className="ProfilePic" title={`Posted by: ${Full_Name}`}>
          <img src={ProfileImgUrl} alt="ProfileImage"></img>
        </div>
        <div className="TextContainer">
          <div className="IssueTitle">{Title}</div>
          <div className="IssueLoc">{`${Area}, ${City}`}</div>
        </div>
      </div>
      <div className="ImgContainer">
        <img className="Image" src={ImgUrl} />
      </div>
      <div className="Details">
        <div className="Description">
          <span className="Name">{Full_Name}:</span>
          <span className="DescriptionText"> {Description} </span>

          <Link to={`/issue/${Issue_id}`} className="ReadMore">
            know more
          </Link>
        </div>
        <div className="expander"></div>
        <UpVoteButton upvotes={Upvotes} issueId={Issue_id} />
      </div>
    </div>
  );
};

export default IssueCard;

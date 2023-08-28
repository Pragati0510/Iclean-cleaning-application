import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./loginbutton";
import LogoutButton from "./logoutbutton";
import "./styles/Sidebar.scss";
import { LoginChecker } from "./UserChecker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const { user } = useAuth0();
  return (
    <div className="SideBarContainer">
      <div className="SidebarItem Logo">
        i<span>Clean</span>
      </div>

      <Link to="/" className="SidebarItem">
        Home
      </Link>

      <Link to="" className="SidebarItem">
        About
      </Link>
      <Link to="" className="SidebarItem">
        Contact
      </Link>
      <LoginChecker cname="SidebarItem">
  
        <Link to="/myissues">Reported Issues</Link>
      </LoginChecker>
      <Link to="/post" className="SidebarItem">
        Report Issue
      </Link>

      <div className="SidebarItem">
        <AuthenticationButton />
      </div>

      <LoginChecker>
        {" "}
        <hr className="Line" />
        <div className="SidebarItem LoggedIn">
          Logged in: {user?.nickname}{" "}
        </div>{" "}
  
        <hr className="Line" />{" "}
        {/* <br />
        <Link to="/updateprofile" className="SidebarItem">
        Report Issue
      </Link> */}
      </LoginChecker>
      {/* <Link className="SidebarItem">Home2</Link> */}
    </div>
  );
};

export const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="AuthButton">
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default Sidebar;

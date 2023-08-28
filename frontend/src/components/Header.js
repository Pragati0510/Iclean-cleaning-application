import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import LoginButton from "./loginbutton";
import LogoutButton from "./logoutbutton";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="HeaderContainer">
      <div className="internal">
        <Link to="/" className="Logo">
          <div>iClean</div>
        </Link>

        <div className="Filler" />
        <div className="Menu">
          <Link>
            {isAuthenticated ? (
              <div className="MenuItem">
                <LogoutButton />
              </div>
            ) : (
              <div className="MenuItem">
                <LoginButton />
              </div>
            )}
          </Link>

          <Link to="/post">
            <div className="MenuItem CTA">Post Issue</div>
          </Link>
          
          {/* <Link to="/newprofile">
            <div className="MenuItem">New Profile</div>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;

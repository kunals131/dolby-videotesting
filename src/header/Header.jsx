import React from "react";
import "./Header.scss";





const Header = (props)=>{
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__content__user">
          <p className={`header__content__user-name`}><i className="user icon"></i> {" "}{props.user}</p>
        </div>
        <div className="header__content__leave">
        <i className="sign out alternate icon"/>Leave Class
        </div>
      </div>

     
    </header>
  );
      }
;

export default Header;

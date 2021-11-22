import React, { useState } from "react";

import { connect } from "react-redux";
import "./Controller.scss";
import { setConference, setMic, setVideo } from "../actions";
import {
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  leaveConference,
} from "../utils/VoxeetUtils";

const Sidebar = ({ changeBackground, type, participants }) => {
  if (type === "theme") {
    return (
      <div className="Sidebar">
        <div className="Sidebar__container">
          <div className="Sidebar__heading">Themes</div>
          <div className="Sidebar__list">
            <div
              className="Sidebar__list-item"
              onClick={() => changeBackground("nature,mountains")}
            >
              <i className="fas fa-tree"></i>
              {" Forest"}
            </div>
            <div
              className="Sidebar__list-item"
              onClick={() => changeBackground("Ocean,water")}
            >
              <i className="fas fa-water"></i> Ocean
            </div>
            <div
              className="Sidebar__list-item"
              onClick={() => changeBackground("building,city")}
            >
              <i className="far fa-building"></i> City
            </div>
            <div
              className="Sidebar__list-item"
              onClick={() => changeBackground("default")}
            >
              <i className="fas fa-asterisk"></i> Default
            </div>
          </div>
        </div>
      </div>
    );
  } else if (type === "participants") {
    return (
    <div className="Sidebar">
      <div className="Sidebar__container">
        <div className="Sidebar__heading">Participants</div>
        <div className="Sidebar__list">
          {participants.map((participant) => (
            <div key={participants.id} className="Sidebar__list-item">
              <i class="fas fa-user"></i> {participant.name}
            </div>
          ))}
        </div>
      </div>
    </div>
    );
  }
};

const Controller = ({
  controls,
  changeBackground,
  setVideo,
  setMic,
  setConference,
  participants
}) => {
  const [showMenu, setShowMenu] = useState("");
  const Sidebarstyle = {
    transform: showMenu ? "rotate(90deg)" : "rotate(0deg)",
  };
  const handleLeave = () => {
    leaveConference();
    setConference("");
  };

  const controlVideo = async (state) => {
    setVideo(state);
    if (state === false) {
      const res = await stopVideo();
      console.log(res);
    } else {
      const res = await startVideo();
      console.log(res);
    }
  };

  const controlMic = async (state) => {
    setMic(state);
    if (state === false) {
      const res = await stopAudio();
      console.log(res);
    } else {
      const res = await startAudio();
      console.log(res);
    }
  };

  return (
    <div className="controller">
      <div className="controller-container">
        <div className="controller__left">
          <div className="controller__left-item">
            <i className="copy icon"></i> Invite Link
          </div>
        </div>
        <div className="controller__center">
          <div
            className="controller__center-item"
            onClick={() => controlVideo(!controls.video)}
          >
            <i
              className={controls.video ? "fas fa-video-slash" : "fas fa-video"}
            ></i>
          </div>
          <div
            className="controller__center-item"
            onClick={() => controlMic(!controls.mic)}
          >
            <i
              className={
                controls.mic ? "fas fa-microphone-slash" : "fas fa-microphone"
              }
            ></i>
          </div>

          <div className="controller__center-item">
            <i
              className={
                controls.screenShare
                  ? "fas fa-window-maximize"
                  : "fas fa-window-close"
              }
            ></i>
          </div>
          <div className="controller__center-item__end" onClick={handleLeave}>
            End Chat <i className="fas fa-phone-slash"></i>
          </div>
        </div>
        <div className="controller__right">
          <div
            className="controller__center-item"
            style={Sidebarstyle}
            onClick={() => {
              if (showMenu === "theme") setShowMenu("");
              else if (showMenu === "") setShowMenu("theme");
              else if (showMenu==='participants') setShowMenu("theme");
            }}
          >
            <i className="fab fa-ethereum"></i>
          </div>
          <div
            className="controller__center-item"
            onClick={() => {
              if (showMenu === "participants") setShowMenu("");
              else if (showMenu === "") setShowMenu("participants");
              else if (showMenu==='theme') setShowMenu("participants");

            }}
          >
            <i className="fas fa-users"></i>
          </div>
        </div>
      </div>
      {showMenu && (
        <Sidebar changeBackground={changeBackground} type={showMenu} participants={participants} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    controls: state.controls,
  };
};

export default connect(mapStateToProps, {
  setVideo,
  setMic,
  setConference,
})(Controller);

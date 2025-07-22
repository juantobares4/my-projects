import React from "react";
import { Link } from "react-router-dom";

import DragonBallLogo from '../assets/Dragon_Ball_Z_logo.svg';
import BannerDragonBall from '../assets/goku-en-nube-kinto-dragon-ball_3840x2304_xtrafondos.com.jpg';
import '../styles/NavBar.css';

export const NavBar = () => {
  return (
    <header>
      <div className="container-main-img position-relative">
        <Link to={'/'}>
          <img className="img-fluid shadow main-banner" src={BannerDragonBall} alt="" />
        </Link>
        <div className="d-flex justify-content-center align-items-center position-absolute top-0 start-50 translate-middle-x" style={{ height: '170px' }}>
          <img src={DragonBallLogo} className="dragon-ball-logo" />
        </div>
      </div>
    </header>

  );

};

import React from "react";
import "../style/css/Footer.scss";
import twitter from "../style/images/twitter.png";
import insta from "../style/images/insta.png";

function Footer() {
return (
<div className='social-container'>
<img
      onClick={(e) => {
        window.open("https://twitter.com/andrea__zero", "_blank");
      }}
      style={{transform: "scale(0.3"}} alt={"twitter"} src={twitter}/>
            <p class="copyright">dev. by AndreaZero.eth</p>
            <img
      onClick={(e) => {
        window.open("https://instagram.com/cryptohelp_ita", "_blank");
      }}
      style={{transform: "scale(0.3"}} alt={"insta"} src={insta}/>
      </div>
)
    }
export default Footer;
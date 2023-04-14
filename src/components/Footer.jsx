import React from "react";

import twitter from "../style/images/twitter.png";

function Footer() {
return (
<center>
<div className='social-container'>
<img
      onClick={(e) => {
        window.open("https://twitter.com/andrea__zero", "_blank");
      }}
      style={{transform: "scale(0.3"}} alt={"logo"} src={twitter}/>
      </div>
      <p class="copyright">dev. by AndreaZero.eth</p>
      </center>
)
    }
export default Footer;
import React from "react";
import facebookLogo from "../assets/images/facebook-logo.png";
import instaLogo from "../assets/images/instagram-logo.png";
import linkedinLogo from "../assets/images/linkedin-logo.png";
import githubLogo from "../assets/images/github-logo.png";

function Footer() {

    return (
        <div className="footer">
            <p>
                Created by 
                <a className="email" href="mailto:jaewond03@berkeley.edu"> Jaewon Dong </a>
            </p>
           <div className="contact">
                <p>Contact me on </p>
                <ul className="contact_social-links">
                    <li className="contact_social-link-item">
                        <a href="https://www.linkedin.com/in/jaewondong/" target="_blank" rel="noreferrer" title="Link to Linkedin Profile">
                            <img src={linkedinLogo} className="contact_social-logo" alt="Linkedin" />
                        </a>
                    </li>
                    <li className="contact_social-link-item">
                        <a href="https://www.instagram.com/jaewondong/" target="_blank" rel="noreferrer" title="Link to Instagram Profile">
                            <img src={instaLogo} className="contact_social-logo" alt="Instagram" />
                        </a>
                    </li>
                    <li className="contact_social-link-item">
                        <a href="https://github.com/jaewondong" target="_blank" rel="noreferrer" title="Link to Github Profile">
                            <img src={githubLogo} className="contact_social-logo" alt="Github" />
                        </a>
                    </li>
                    <li className="contact_social-link-item">
                        <a href="https://www.facebook.com/jaewon.dong.9/" target="_blank" rel="noreferrer" title="Link to Facebook Profile">
                            <img src={facebookLogo} className="contact_social-logo" alt="Facebook" />
                        </a>
                    </li>
                </ul>
           </div>
        </div>
    )
}

export default Footer;
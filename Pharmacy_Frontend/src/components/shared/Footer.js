import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        <ul className="footer-links">
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
          <li>
            <a href="/terms">Terms and Conditions</a>
          </li>
          <li>
            <a href="/privacy">Privacy Policy</a>
          </li>
        </ul>
        <ul className="social-media-links">
          <li>
            <a href="https://www.facebook.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/yourcompany" target="_blank" rel="noopener noreferrer">
              <i className="fa fa-instagram" />
            </a>
          </li>
        </ul>
      </div>
        </footer>
  );
};

export default Footer;

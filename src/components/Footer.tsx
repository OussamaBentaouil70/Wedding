import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="Marrakech Weddings Logo" className="footer-logo" />
          <h2>Marrakech Weddings</h2>
          <p>Crafting luxurious and unforgettable experiences in the heart of Morocco.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/wedding">Weddings</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>123 Luxury Avenue, Medina</p>
          <p>Marrakech, Morocco</p>
          <p>Email: contact@marrakechweddings.com</p>
          <p>Phone: +212 5XX-XXXXXX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Marrakech Weddings. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

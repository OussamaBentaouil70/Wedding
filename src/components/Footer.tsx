import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/images/logo2.png';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="Wedding Planner Morocco Logo" className="footer-logo-img" />
          <p>{t('footer.desc')}</p>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/weddingsplannermorocco/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61576790920930" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a 
              href="https://www.linkedin.com/company/wedding-planner-morocco/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn"
              className="social-icon"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <h3>{t('footer.links_title')}</h3>
          <ul>
            <li><Link to="/">{t('nav.home')}</Link></li>
            <li><Link to="/wedding">{t('nav.wedding')}</Link></li>
            <li><Link to="/events">{t('nav.events')}</Link></li>
            <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>{t('footer.contact_title')}</h3>
          <p className="footer-contact-item">
            <FontAwesomeIcon icon={faPhone} className="footer-contact-icon" aria-hidden="true" />
            <a href="tel:+212699728058">+212699728058</a>
          </p>
          <p className="footer-contact-item">
            <FontAwesomeIcon icon={faLocationDot} className="footer-contact-icon" aria-hidden="true" />
            <span>55 Derb Ben Zina, LaKasbah, Marrakech 40040, Morocco</span>
          </p>
          <p className="footer-contact-item">
            <FontAwesomeIcon icon={faEnvelope} className="footer-contact-icon" aria-hidden="true" />
            <a href="mailto:contact@weddingsplannermorocco.com">contact@weddingsplannermorocco.com</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="Twitter">TW</a>
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
          <p>123 Luxury Avenue, Medina</p>
          <p>Marrakech, Morocco</p>
          <p>Email: contact@marrakechweddings.com</p>
          <p>Phone: +212 5XX-XXXXXX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;

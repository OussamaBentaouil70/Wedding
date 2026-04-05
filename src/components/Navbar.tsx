import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo2.png';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [location.pathname]);

  const currentLang = i18n.resolvedLanguage?.startsWith('fr') ? 'fr' : 'en';

  const onLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const navLinks = [
    { name: t('nav.home'),    path: '/' },
    { name: t('nav.wedding'), path: '/wedding' },
    { name: t('nav.events'),  path: '/events' },
    { name: t('nav.gallery'), path: '/gallery' },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <img
              src={logo}
              alt="Marrakech Weddings"
              className={`navbar-logo-img ${isScrolled ? '' : 'navbar-logo-inverted'}`}
            />
          </Link>

          <div className="navbar-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="navbar-right">
            <div className="navbar-lang-menu">
              <button
                className="navbar-lang-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-label={t('nav.language_label')}
              >
                <Globe size={16} />
              </button>
              {isLangMenuOpen && (
                <div className="navbar-lang-dropdown">
                  <button
                    className={`lang-option ${currentLang === 'en' ? 'active' : ''}`}
                    onClick={() => {
                      onLanguageChange('en');
                      setIsLangMenuOpen(false);
                    }}
                  >
                    {t('nav.lang_en')}
                  </button>
                  <button
                    className={`lang-option ${currentLang === 'fr' ? 'active' : ''}`}
                    onClick={() => {
                      onLanguageChange('fr');
                      setIsLangMenuOpen(false);
                    }}
                  >
                    {t('nav.lang_fr')}
                  </button>
                </div>
              )}
            </div>
            <Link to="/contact" className="navbar-cta navbar-cta-desktop btn-primary">
              {t('nav.contact')}
            </Link>
            <button
              className="navbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu fade-in">
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary mobile-nav-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <div className="mobile-nav-lang-menu">
              <button
                className="mobile-nav-lang-btn"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-label={t('nav.language_label')}
              >
                <Globe size={20} />
              </button>
              {isLangMenuOpen && (
                <div className="mobile-nav-lang-dropdown">
                  <button
                    className={`lang-option ${currentLang === 'en' ? 'active' : ''}`}
                    onClick={() => {
                      onLanguageChange('en');
                      setIsLangMenuOpen(false);
                    }}
                  >
                    {t('nav.lang_en')}
                  </button>
                  <button
                    className={`lang-option ${currentLang === 'fr' ? 'active' : ''}`}
                    onClick={() => {
                      onLanguageChange('fr');
                      setIsLangMenuOpen(false);
                    }}
                  >
                    {t('nav.lang_fr')}
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;

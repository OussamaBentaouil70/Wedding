import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo-portugal.png';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { GB, FR, ES, DE, IT, NL } from 'country-flag-icons/react/3x2';

// Flag shown next to each language in the switcher
const LANGUAGE_FLAGS: Record<string, typeof GB> = {
  en: GB,
  fr: FR,
  es: ES,
  de: DE,
  it: IT,
  nl: NL,
};

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

  const currentLang =
    (SUPPORTED_LANGUAGES as readonly string[]).find((lang) => i18n.resolvedLanguage?.startsWith(lang)) ?? 'en';

  const onLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const showLanguageSwitch = true;

  const renderLanguageOptions = () =>
    SUPPORTED_LANGUAGES.map((lang) => {
      const Flag = LANGUAGE_FLAGS[lang];
      return (
        <button
          key={lang}
          className={`lang-option ${currentLang === lang ? 'active' : ''}`}
          onClick={() => {
            onLanguageChange(lang);
            setIsLangMenuOpen(false);
          }}
        >
          {Flag ? <Flag className="lang-flag" aria-hidden="true" /> : null}
          <span>{t(`nav.lang_${lang}`)}</span>
        </button>
      );
    });

  const isActive = (path: string) =>
    path.startsWith('/wedding') ? location.pathname.startsWith('/wedding') : location.pathname === path;

  const navLinks = [
    { name: t('nav.home'),    path: '/' },
    { name: t('nav.wedding'), path: '/wedding/algarve' },
    { name: t('nav.proposals'), path: '/proposals' },
    { name: t('nav.venues'),  path: '/venues' },
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
              alt="Weddings Planner Portugal"
              className={`navbar-logo-img ${isScrolled ? '' : 'navbar-logo-inverted'}`}
            />
          </Link>

          <div className="navbar-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="navbar-right">
            {showLanguageSwitch && (
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
                  {renderLanguageOptions()}
                </div>
              )}
            </div>
            )}
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
                className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
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
            {showLanguageSwitch && (
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
                  {renderLanguageOptions()}
                </div>
              )}
            </div>
            )}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import thankYouImage from '../assets/images/Weddings/24.jpg';

const ThankYou: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="page-thank-you section-padding">
      <section className="container thank-you-shell reveal">
        <div className="thank-you-card">
          <div className="thank-you-image-wrap">
            <img src={thankYouImage} alt={t('thank_you_page.image_alt')} className="thank-you-image" />
            <div className="thank-you-image-overlay" />
          </div>

          <div className="thank-you-content">
            <span className="section-label">{t('thank_you_page.label')}</span>
            <span className="gold-line gold-line-left" />

            <h1>{t('thank_you_page.title')}</h1>
            <p className="thank-you-lead">{t('thank_you_page.subtitle')}</p>
            <p className="thank-you-note">{t('thank_you_page.note')}</p>

            <Link to="/" className="btn-primary thank-you-cta">
              {t('thank_you_page.back_home')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankYou;

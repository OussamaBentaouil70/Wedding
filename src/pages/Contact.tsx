import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Form Integration
import { submitForm } from '../utils/formHandler';

const HERO_VIDEO = 'https://videos.pexels.com/video-files/4954871/4954871-uhd_2560_1440_30fps.mp4';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    service_type: '',
    preferred_date: '',
    number_of_guests: '',
    preferred_location: '',
    estimated_budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitForm(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        service_type: '',
        preferred_date: '',
        number_of_guests: '',
        preferred_location: '',
        estimated_budget: '',
        message: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else {
      setSubmitStatus('error');
    }
  };
  return (
    <div className="page-contact">
      <section id="contact-hero" className="home-hero home-hero--video contact-hero">
        <video
          className="home-hero-video"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="home-hero-overlay" />

        <div className="home-hero-content container fade-in">
          <span className="section-label">{t('contact_page.hero.label')}</span>
          <h1 className="home-hero-title">
            {t('contact_page.hero.title')}
          </h1>
          <p className="home-hero-subtitle">
            {t('contact_page.hero.subtitle')}
          </p>
        </div>
      </section>
      <section id="contact-form-section" className="section-padding container contact-section">
        <div className="contact-page-grid">
          <div className="contact-form-container">
            <span className="section-label">{t('contact_page.form.label')}</span>
            <span className="gold-line gold-line-left" />
            <h2>{t('contact_page.form.title')}</h2>
            <p className="contact-intro">
              {t('contact_page.form.intro')}
            </p>

            {submitStatus === 'success' ? (
              <div className="form-success-message">
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>{t('contact_page.form.success_title')}</h3>
                <p>{t('contact_page.form.success_text')}</p>
              </div>
            ) : (
              <form className="contact-form contact-form--grid" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact_name">{t('contact_page.form.full_name')}</label>
                    <input
                      id="contact_name"
                      type="text"
                      name="contact_name"
                      placeholder={t('contact_page.form.full_name')}
                      required
                      value={formData.contact_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact_email">{t('contact_page.form.email')}</label>
                    <input
                      id="contact_email"
                      type="email"
                      name="contact_email"
                      placeholder={t('contact_page.form.email_placeholder')}
                      required
                      value={formData.contact_email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact_phone">{t('contact_page.form.phone')}</label>
                    <input
                      id="contact_phone"
                      type="tel"
                      name="contact_phone"
                      placeholder={t('contact_page.form.phone')}
                      value={formData.contact_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service_type">{t('contact_page.form.event_type')}</label>
                    <select
                      id="service_type"
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>{t('contact_page.form.select_event_type')}</option>
                      <option value="Wedding">{t('contact_page.form.option_wedding')}</option>
                      <option value="Engagement Party">{t('contact_page.form.option_engagement')}</option>
                      <option value="Welcome Dinner">{t('contact_page.form.option_welcome_dinner')}</option>
                      <option value="Anniversary / Private Celebration">{t('contact_page.form.option_anniversary')}</option>
                      <option value="Luxury Birthday">{t('contact_page.form.option_luxury_birthday')}</option>
                      <option value="Brand Experience">{t('contact_page.form.option_brand')}</option>
                      <option value="Corporate Gathering">{t('contact_page.form.option_corporate')}</option>
                      <option value="Other">{t('contact_page.form.option_other')}</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferred_date">{t('contact_page.form.estimated_date')}</label>
                    <input
                      id="preferred_date"
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number_of_guests">{t('contact_page.form.guests')}</label>
                    <input
                      id="number_of_guests"
                      type="text"
                      name="number_of_guests"
                      placeholder={t('contact_page.form.guests_placeholder')}
                      value={formData.number_of_guests}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferred_location">{t('contact_page.form.location')}</label>
                    <input
                      id="preferred_location"
                      type="text"
                      name="preferred_location"
                      placeholder={t('contact_page.form.location_placeholder')}
                      value={formData.preferred_location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="estimated_budget">{t('contact_page.form.budget')}</label>
                    <input
                      id="estimated_budget"
                      type="text"
                      name="estimated_budget"
                      placeholder={t('contact_page.form.budget_placeholder')}
                      value={formData.estimated_budget}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact_page.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder={t('contact_page.form.message_placeholder')}
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                {submitStatus === 'error' && (
                  <p style={{ color: 'red', fontSize: '0.9rem' }}>{t('contact_page.form.error')}</p>
                )}

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? t('contact_page.form.sending') : t('contact_page.form.send')}
                </button>
              </form>
            )}
          </div>

          <aside className="contact-side">
            <div className="contact-details-card">
              <span className="section-label">{t('contact_page.details.label')}</span>
              <span className="gold-line gold-line-left" />
              <div className="contact-details-list">
                <div>
                  <strong>{t('contact_page.details.email')}</strong>
                  <a href="mailto:contact@weddingplannermorocco.org">contact@weddingplannermorocco.org</a>
                </div>
                <div>
                  <strong>{t('contact_page.details.tel')}</strong>
                  <a href="tel:+212699728058">+212699728058</a>
                </div>
                <div>
                  <strong>{t('contact_page.details.office')}</strong>
                  <span>{t('contact_page.details.office_value')}</span>
                </div>
              </div>
            </div>

            {import.meta.env.VITE_SCHEDULER_URL ? (
              <div className="contact-scheduler-card">
                <span className="section-label">{t('contact_page.scheduler.label')}</span>
                <span className="gold-line gold-line-left" />
                <h3>{t('contact_page.scheduler.title')}</h3>
                <p>{t('contact_page.scheduler.subtitle')}</p>
                <div className="contact-scheduler-embed">
                  <iframe
                    src={import.meta.env.VITE_SCHEDULER_URL}
                    title={t('contact_page.scheduler.iframe_title')}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ) : null}

            <div className="contact-reassurance">
              <p>{t('contact_page.form.intro')}</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;

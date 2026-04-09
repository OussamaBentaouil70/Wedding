import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Flatpickr from 'react-flatpickr';
import * as Flags from 'country-flag-icons/react/3x2';
import weddingVideo from '../assets/video/Wedding.mp4';
import weddingImage from '../assets/images/Weddings/8.jpg';

// Form Integration
import { submitForm } from '../utils/formHandler';

const HERO_VIDEO = weddingVideo;

// iso must be the 2-letter ISO 3166-1 alpha-2 code used by country-flag-icons
const COUNTRY_CODES = [
  { code: '+1',   country: 'US', iso: 'US', label: 'United States' },
  { code: '+44',  country: 'GB', iso: 'GB', label: 'United Kingdom' },
  { code: '+33',  country: 'FR', iso: 'FR', label: 'France' },
  { code: '+34',  country: 'ES', iso: 'ES', label: 'Spain' },
  { code: '+39',  country: 'IT', iso: 'IT', label: 'Italy' },
  { code: '+49',  country: 'DE', iso: 'DE', label: 'Germany' },
  { code: '+212', country: 'MA', iso: 'MA', label: 'Morocco' },
  { code: '+966', country: 'SA', iso: 'SA', label: 'Saudi Arabia' },
  { code: '+971', country: 'AE', iso: 'AE', label: 'UAE' },
  { code: '+91',  country: 'IN', iso: 'IN', label: 'India' },
  { code: '+86',  country: 'CN', iso: 'CN', label: 'China' },
  { code: '+81',  country: 'JP', iso: 'JP', label: 'Japan' },
  { code: '+61',  country: 'AU', iso: 'AU', label: 'Australia' },
  { code: '+1',   country: 'CA', iso: 'CA', label: 'Canada' },
  { code: '+55',  country: 'BR', iso: 'BR', label: 'Brazil' },
];

// Renders an SVG flag by ISO code from country-flag-icons
const FlagIcon = ({ iso, size = 22 }: { iso: string; size?: number }) => {
  const Flag = (Flags as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[iso];
  if (!Flag) return <span style={{ fontSize: '0.75rem', color: 'white' }}>{iso}</span>;
  return (
    <Flag
      style={{
        width: size,
        height: 'auto',
        display: 'block',
        borderRadius: '2px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }}
    />
  );
};

const formatDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    country_code: '+212',
    country_key: 'MA',
    service_type: '',
    arrival_date: '',
    departure_date: '',
    number_of_guests: '',
    destinations_in_mind: '',
    estimated_budget: '',
    currency: 'USD',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [dateRange, setDateRange] = useState<Date[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      MAD: 'د.م.',
    };
    return symbols[currency] || currency;
  };

  // Find currently selected country by unique country key
  const selectedCountry =
    COUNTRY_CODES.find(c => c.country === formData.country_key) ?? COUNTRY_CODES[6];

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
        country_code: '+212',
        country_key: 'MA',
        service_type: '',
        arrival_date: '',
        departure_date: '',
        number_of_guests: '',
        destinations_in_mind: '',
        estimated_budget: '',
        currency: 'USD',
        message: '',
      });
      setDateRange([]);
      navigate('/thank-you');
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="page-contact">
      {/* ── Hero ── */}
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
          <h1 className="home-hero-title">{t('contact_page.hero.title')}</h1>
          <p className="home-hero-subtitle">{t('contact_page.hero.subtitle')}</p>
        </div>
      </section>

      {/* ── Form Section ── */}
      <section id="contact-form-section" className="section-padding container contact-section">
        <div className="contact-page-grid">
          <div className="contact-form-container">
            <span className="section-label">{t('contact_page.form.label')}</span>
            <span className="gold-line gold-line-left" />
            <h2>{t('contact_page.form.title')}</h2>
            <p className="contact-intro">{t('contact_page.form.intro')}</p>

            {submitStatus === 'success' ? (
              <div className="form-success-message">
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>
                  {t('contact_page.form.success_title')}
                </h3>
                <p>{t('contact_page.form.success_text')}</p>
              </div>
            ) : (
              <form className="contact-form contact-form--grid" onSubmit={handleContactSubmit}>

                {/* Row 1: Name + Email */}
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

                {/* Row 2: Phone + Event Type */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact_phone">{t('contact_page.form.phone')}</label>

                    <div style={{ display: 'flex', position: 'relative' }} ref={dropdownRef}>

                      {/* ── Flag trigger button ── */}
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(prev => !prev)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '0 12px',
                          height: '44px',
                          backgroundColor: '#c9a880',
                          border: 'none',
                          borderRadius: '4px 0 0 4px',
                          cursor: 'pointer',
                          flexShrink: 0,
                          minWidth: '64px',
                        }}
                      >
                        <FlagIcon iso={selectedCountry.iso} size={24} />
                        <span style={{ fontSize: '0.65rem', color: 'white', lineHeight: 1 }}>▼</span>
                      </button>

                      {/* ── Dropdown list ── */}
                      {showCountryDropdown && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 999,
                            backgroundColor: '#1a1a1a',
                            border: '1px solid #c9a880',
                            borderRadius: '4px',
                            maxHeight: '260px',
                            overflowY: 'auto',
                            width: '230px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                            marginTop: '2px',
                          }}
                        >
                          {COUNTRY_CODES.map(item => {
                            const isSelected = formData.country_key === item.country;
                            return (
                              <div
                                key={item.country}
                                onClick={() => {
                                  setFormData(prev => ({
                                    ...prev,
                                    country_code: item.code,
                                    country_key: item.country,
                                  }));
                                  setShowCountryDropdown(false);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  padding: '9px 14px',
                                  cursor: 'pointer',
                                  color: isSelected ? '#c9a880' : 'white',
                                  backgroundColor: isSelected
                                    ? 'rgba(201,168,128,0.12)'
                                    : 'transparent',
                                  fontSize: '0.9rem',
                                  transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => {
                                  if (!isSelected)
                                    e.currentTarget.style.backgroundColor = 'rgba(201,168,128,0.08)';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.backgroundColor = isSelected
                                    ? 'rgba(201,168,128,0.12)'
                                    : 'transparent';
                                }}
                              >
                                <FlagIcon iso={item.iso} size={20} />
                                <span>{item.label}</span>
                                <span
                                  style={{
                                    marginLeft: 'auto',
                                    opacity: 0.55,
                                    fontSize: '0.82rem',
                                    fontVariantNumeric: 'tabular-nums',
                                  }}
                                >
                                  {item.code}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ── Phone number input ── */}
                      <input
                        id="contact_phone"
                        type="tel"
                        name="contact_phone"
                        placeholder={t('contact_page.form.phone')}
                        required
                        value={formData.contact_phone}
                        onChange={handleInputChange}
                        style={{
                          flex: 1,
                          height: '44px',
                          borderRadius: '0 4px 4px 0',
                          paddingLeft: '14px',
                        }}
                      />
                    </div>
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
                      <option value="" disabled>
                        {t('contact_page.form.select_event_type')}
                      </option>
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

                {/* Row 3: Date Range */}
                <div className="form-row">
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="event_dates">
                      {t('contact_page.form.arrival_date')} / {t('contact_page.form.departure_date')}
                    </label>
                    <Flatpickr
                      value={dateRange}
                      options={{ mode: 'range', dateFormat: 'Y-m-d' }}
                      onChange={(selectedDates: Date[]) => {
                        setDateRange(selectedDates);
                        setFormData(prev => ({
                          ...prev,
                          arrival_date: selectedDates[0] ? formatDateToYMD(selectedDates[0]) : '',
                          departure_date: selectedDates[1] ? formatDateToYMD(selectedDates[1]) : '',
                        }));
                      }}
                      className="date-range-input"
                      placeholder="Select arrival and departure dates"
                    />
                  </div>
                </div>

                {/* Row 4: Guests + Destinations */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="number_of_guests">{t('contact_page.form.guests')}</label>
                    <input
                      id="number_of_guests"
                      type="text"
                      name="number_of_guests"
                      placeholder={t('contact_page.form.guests_placeholder')}
                      required
                      value={formData.number_of_guests}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="destinations_in_mind">{t('contact_page.form.destinations')}</label>
                    <input
                      id="destinations_in_mind"
                      type="text"
                      name="destinations_in_mind"
                      placeholder={t('contact_page.form.destinations_placeholder')}
                      value={formData.destinations_in_mind}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Row 5: Budget */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="estimated_budget">{t('contact_page.form.budget')}</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1, position: 'relative' }}>
                        <span
                          style={{
                            position: 'absolute',
                            left: '12px',
                            fontSize: '1rem',
                            color: 'rgba(255,255,255,0.6)',
                            fontWeight: '500',
                            pointerEvents: 'none',
                          }}
                        >
                          {getCurrencySymbol(formData.currency)}
                        </span>
                        <input
                          id="estimated_budget"
                          type="text"
                          name="estimated_budget"
                          placeholder={t('contact_page.form.budget_placeholder')}
                          required
                          value={formData.estimated_budget}
                          onChange={handleInputChange}
                          style={{ flex: 1, paddingLeft: '35px', width: '100%' }}
                        />
                      </div>
                      <select
                        id="currency"
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        required
                        style={{ flex: '0 0 120px', height: '44px' }}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="MAD">MAD (د.م.)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message */}
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

          <aside className="contact-image-side">
            <img src={weddingImage} alt="Wedding Celebration" className="contact-image" />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;
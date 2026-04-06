import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Flatpickr from 'react-flatpickr';
import { submitForm } from '../utils/formHandler';

const formatDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface PageHeroProps {
  /** Array of image URLs that fade in sequence */
  images: string[];
  label?: string;
  title: string;
  subtitle: string;
  /** Layout variant (default keeps current behavior) */
  variant?: 'background' | 'split';
  /** Which service type to pre-select in the form */
  defaultService?: string;
}

const PageHero: React.FC<PageHeroProps> = ({
  images,
  label,
  title,
  subtitle,
  variant = 'background',
  defaultService = '',
}) => {
  const [bgIdx, setBgIdx] = useState(0);
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    service_type: defaultService,
    arrival_date: '',
    departure_date: '',
    number_of_guests: '',
    destinations_in_mind: '',
    estimated_budget: '',
    currency: 'USD',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dateRange, setDateRange] = useState<Date[]>([]);

  // Cycle background images every 5 seconds
  React.useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setBgIdx(i => (i + 1) % images.length), 5000);
    return () => clearInterval(t);
  }, [images.length]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitForm(formData);
    setIsSubmitting(false);
    if (result.success) setSubmitted(true);
  };

  return (
    <header className={`page-hero ${variant === 'split' ? 'page-hero--split' : ''}`}>
      {variant === 'background' ? (
        <>
          {/* Fading background images */}
          {images.map((src, i) => (
            <div
              key={i}
              className={`page-hero-bg ${i === bgIdx ? 'active' : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
          <div className="page-hero-overlay" />
          <div className="page-hero-fade-left" aria-hidden="true" />
        </>
      ) : (
        <>
          {/* Split hero: left media panel with fading images */}
          <div className="page-hero-media" aria-hidden="true">
            {images.map((src, i) => (
              <div
                key={i}
                className={`page-hero-media-img ${i === bgIdx ? 'active' : ''}`}
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
            <div className="page-hero-media-overlay" />
            <div className="page-hero-media-fade-left" />
            <div className="page-hero-media-fade-right" />
          </div>
          <div className="page-hero-split-bg" aria-hidden="true" />
        </>
      )}

      <div className="container page-hero-inner">
        <div className="page-hero-left fade-in">
          {label && (
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>
              {label}
            </span>
          )}
          <span
            className="gold-line gold-line-left"
            style={{ background: 'rgba(184,154,106,0.6)', marginTop: '6px' }}
          />
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-subtitle">{subtitle}</p>
        </div>

        <div className="page-hero-form-wrap fade-in" id="reservation-form">
          {submitted ? (
            <div className="page-hero-form-success">
              <Check size={34} />
              <h3>Request Received!</h3>
              <p>We'll be in touch within 24 hours to begin planning your event.</p>
            </div>
          ) : (
            <form className="page-hero-form" onSubmit={handleSubmit}>
              <h3>Start Planning</h3>
              <p>Tell us about your vision — we'll handle everything from here.</p>

              <div className="phf-group">
                <input
                  name="contact_name"
                  placeholder="Full Name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="phf-row">
                <div className="phf-group">
                  <input
                    name="contact_email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.contact_email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="phf-group">
                  <input
                    name="contact_phone"
                    type="tel"
                    placeholder="Phone / WhatsApp"
                    value={formData.contact_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="phf-row">
                <div className="phf-group">
                  <select
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Type of Event
                    </option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Private Celebration">Private Celebration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="phf-group">
                  <Flatpickr
                    value={dateRange}
                    options={{
                      mode: 'range',
                      dateFormat: 'Y-m-d',
                    }}
                    onChange={(selectedDates: Date[]) => {
                      setDateRange(selectedDates);
                      setFormData(prev => ({
                        ...prev,
                        arrival_date: selectedDates[0] ? formatDateToYMD(selectedDates[0]) : '',
                        departure_date: selectedDates[1] ? formatDateToYMD(selectedDates[1]) : '',
                      }));
                    }}
                    className="date-range-input"
                    placeholder="Arrival & Departure Dates"
                  />
                </div>
              </div>

              <div className="phf-row">
                <div className="phf-group">
                  <input
                    name="number_of_guests"
                    type="text"
                    placeholder="Number of Guests"
                    value={formData.number_of_guests}
                    onChange={handleChange}
                  />
                </div>
                <div className="phf-group">
                  <input
                    name="destinations_in_mind"
                    type="text"
                    placeholder="Destinations in Mind"
                    value={formData.destinations_in_mind}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="phf-row">
                <div className="phf-group">
                  <input
                    name="estimated_budget"
                    type="text"
                    placeholder="Estimated Budget"
                    value={formData.estimated_budget}
                    onChange={handleChange}
                  />
                </div>
                <div className="phf-group">
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="MAD">MAD (د.م.)</option>
                  </select>
                </div>
              </div>

              <div className="phf-group">
                <textarea
                  name="message"
                  placeholder="Tell us about your vision…"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <button type="submit" className="btn-primary phf-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Sending…'
                ) : (
                  <>
                    Send Inquiry <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHero;

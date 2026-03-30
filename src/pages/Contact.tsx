import React, { useState } from 'react';

// Form Integration
import { submitForm } from '../utils/formHandler';

const HERO_VIDEO = 'https://videos.pexels.com/video-files/4954871/4954871-uhd_2560_1440_30fps.mp4';

const Contact: React.FC = () => {
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
      <section className="home-hero home-hero--video contact-hero">
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
          <span className="section-label">Contact</span>
          <h1 className="home-hero-title">
            Begin Your Celebration
          </h1>
          <p className="home-hero-subtitle">
            Tell us about your vision, your date, and the experience you want to create.
          </p>
        </div>
      </section>
      <section className="section-padding container contact-section">
        <div className="contact-page-grid">
          <div className="contact-form-container">
            <span className="section-label">Inquiry</span>
            <span className="gold-line gold-line-left" />
            <h2>Tell us about your event</h2>
            <p className="contact-intro">
              We respond discreetly, personally, and with care.
            </p>

            {submitStatus === 'success' ? (
              <div className="form-success-message">
                <h3 style={{ color: 'var(--color-primary)', marginBottom: '10px' }}>Request received</h3>
                <p>Thank you. We’ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form contact-form--grid" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact_name">Full Name</label>
                    <input
                      id="contact_name"
                      type="text"
                      name="contact_name"
                      placeholder="Full Name"
                      required
                      value={formData.contact_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact_email">Email</label>
                    <input
                      id="contact_email"
                      type="email"
                      name="contact_email"
                      placeholder="Email Address"
                      required
                      value={formData.contact_email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact_phone">Phone / WhatsApp</label>
                    <input
                      id="contact_phone"
                      type="tel"
                      name="contact_phone"
                      placeholder="Phone / WhatsApp"
                      value={formData.contact_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service_type">Event Type</label>
                    <select
                      id="service_type"
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select an event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement Party">Engagement Party</option>
                      <option value="Welcome Dinner">Welcome Dinner</option>
                      <option value="Anniversary / Private Celebration">Anniversary / Private Celebration</option>
                      <option value="Luxury Birthday">Luxury Birthday</option>
                      <option value="Brand Experience">Brand Experience</option>
                      <option value="Corporate Gathering">Corporate Gathering</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferred_date">Estimated Date</label>
                    <input
                      id="preferred_date"
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="number_of_guests">Number of Guests</label>
                    <input
                      id="number_of_guests"
                      type="text"
                      name="number_of_guests"
                      placeholder="e.g. 60"
                      value={formData.number_of_guests}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="preferred_location">Preferred Location in Morocco</label>
                    <input
                      id="preferred_location"
                      type="text"
                      name="preferred_location"
                      placeholder="e.g. Marrakech, Agafay, Essaouira..."
                      value={formData.preferred_location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="estimated_budget">Estimated Budget</label>
                    <input
                      id="estimated_budget"
                      type="text"
                      name="estimated_budget"
                      placeholder="e.g. €25,000"
                      value={formData.estimated_budget}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your vision…"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>

                {submitStatus === 'error' && (
                  <p style={{ color: 'red', fontSize: '0.9rem' }}>Error sending message. Please try again.</p>
                )}

                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

          <aside className="contact-side">
            <div className="contact-details-card">
              <span className="section-label">Contact</span>
              <span className="gold-line gold-line-left" />
              <div className="contact-details-list">
                <div>
                  <strong>Email</strong>
                  <a href="mailto:contact@weddingplannermorocco.org">contact@weddingplannermorocco.org</a>
                </div>
                <div>
                  <strong>Tel</strong>
                  <a href="tel:+212699728058">+212699728058</a>
                </div>
                <div>
                  <strong>Office</strong>
                  <span>Marrakech office</span>
                </div>
              </div>
            </div>

            {import.meta.env.VITE_SCHEDULER_URL ? (
              <div className="contact-scheduler-card">
                <span className="section-label">Consultation</span>
                <span className="gold-line gold-line-left" />
                <h3>Book a consultation</h3>
                <p>Choose a time that works for you.</p>
                <div className="contact-scheduler-embed">
                  <iframe
                    src={import.meta.env.VITE_SCHEDULER_URL}
                    title="Consultation booking calendar"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ) : null}

            <div className="contact-reassurance">
              <p>We respond discreetly, personally, and with care.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Contact;

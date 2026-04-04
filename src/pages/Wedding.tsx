import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ArrowRight, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import weddingData from '../data/wedding.json';
import { weddingImages } from '../data/imageCollections';

const {
  hero,
  servicesSection,
  services,
  venuesSection,
  venues,
  editorial,
  themesSection,
  themes,
  includedSection,
  included,
  faqSection,
  faqs,
  ctaSection,
} = weddingData;

const heroImages = weddingImages.slice(0, 3);

const venuesWithImages = venues.map((venue, index) => ({
  ...venue,
  img: weddingImages[3 + index] ?? weddingImages[index] ?? '',
}));

const editorialImage = weddingImages[8] ?? weddingImages[0] ?? '';

const themesWithImages = themes.map((theme, index) => ({
  ...theme,
  img: weddingImages[9 + index] ?? weddingImages[index] ?? '',
}));

// ─────────────────────────────────────────────────────────
const Wedding: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeVenueIdx, setActiveVenueIdx] = useState<number | null>(null);
  const activeVenue = useMemo(() => (activeVenueIdx === null ? null : venuesWithImages[activeVenueIdx]), [activeVenueIdx]);

  useEffect(() => {
    if (activeVenueIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVenueIdx(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeVenueIdx]);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-form');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = el.querySelector('input, select, textarea, button') as HTMLElement | null;
    firstInput?.focus?.();
  };

  return (
    <div className="page-wedding">

      {/* ══════════ HERO ══════════ */}
      <PageHero
        images={heroImages}
        label={hero.label}
        title={hero.title}
        subtitle={hero.subtitle}
        defaultService={hero.defaultService}
      />

      {/* ══════════ SERVICE CATEGORIES ══════════ */}
      <section className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{servicesSection.label}</span>
          <span className="gold-line" />
          <h2>{servicesSection.title}</h2>
          <p>{servicesSection.subtitle}</p>
        </div>
        <div className="wedding-services-grid">
          {services.map((s, i) => (
            <div key={i} className="wedding-service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ VENUE EXPERIENCE ══════════ */}
      <section className="reveal">
        <div className="wedding-section-header container">
          <span className="section-label">{venuesSection.label}</span>
          <span className="gold-line" />
          <h2>{venuesSection.title}</h2>
          <p>{venuesSection.subtitle}</p>
        </div>
        <div className="venue-experience-grid">
          {venuesWithImages.map((v, i) => (
            <button
              key={v.title}
              type="button"
              className="venue-card venue-card--button"
              onClick={() => setActiveVenueIdx(i)}
              aria-haspopup="dialog"
              aria-expanded={activeVenueIdx === i}
            >
              <img src={v.img} alt={v.title} className="venue-card-img" />
              <div className="venue-card-overlay">
                <h3>{v.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════ VENUE MODAL ══════════ */}
      {activeVenue && (
        <div
          className="wedding-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVenue.title} details`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveVenueIdx(null);
          }}
        >
          <div className="wedding-modal">
            <button
              type="button"
              className="wedding-modal-close"
              onClick={() => setActiveVenueIdx(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="wedding-modal-grid">
              <div className="wedding-modal-img-wrap">
                <img src={activeVenue.img} alt={activeVenue.title} className="wedding-modal-img" />
                <div className="wedding-modal-img-overlay" />
                <div className="wedding-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Venue Experience</span>
                  <h3>{activeVenue.title}</h3>
                </div>
              </div>

              <div className="wedding-modal-body">
                <p className="wedding-modal-desc">{activeVenue.desc}</p>
                <ul className="wedding-modal-highlights">
                  {activeVenue.highlights.map((h) => (
                    <li key={h}>
                      <span className="wedding-modal-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="wedding-modal-cta">
                  <button type="button" className="btn-primary" onClick={() => { setActiveVenueIdx(null); scrollToReservation(); }}>
                    Start Planning <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveVenueIdx(null)}>
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ DESIGN PHILOSOPHY ══════════ */}
      <section className="section-padding container reveal">
        <div className="editorial-container">
          <div className="editorial-img-side">
              <img src={editorialImage} alt={editorial.imageAlt} className="editorial-img-main" />
          </div>
          <div className="editorial-text-side">
            <span className="section-label">{editorial.label}</span>
            <span className="gold-line gold-line-left" />
            <h2>{editorial.title}</h2>
            <p>{editorial.body}</p>
            <ul className="editorial-details-list">
              {editorial.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ WEDDING THEMES ══════════ */}
      <section className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{themesSection.label}</span>
          <span className="gold-line" />
          <h2>{themesSection.title}</h2>
          <p>{themesSection.subtitle}</p>
        </div>
        <div className="themes-inspiration-grid">
          {themesWithImages.map((t, i) => (
            <div key={i} className="theme-inspiration-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <img src={t.img} alt={t.title} className="theme-inspiration-img" />
              <div className="theme-inspiration-overlay">
                <h3>{t.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ WHAT'S INCLUDED ══════════ */}
      <section className="journey-dark-section reveal">
        <div className="container">
          <div className="wedding-section-header">
            <h2 style={{ color: '#fff' }}>{includedSection.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{includedSection.subtitle}</p>
          </div>
          <div className="included-grid">
            {included.map((item, idx) => (
              <div key={idx} className="included-card reveal" style={{ transitionDelay: `${idx * 60}ms` }}>
                <div className="included-card-icon">
                  <Check size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="section-padding container reveal">
        <div className="wedding-faq">
          <div className="wedding-section-header">
            <span className="section-label">{faqSection.label}</span>
            <span className="gold-line" />
            <h2>{faqSection.title}</h2>
          </div>
          {faqs.map((faq, idx) => (
            <div key={idx} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                <h3>{faq.q}</h3>
                <span className="faq-icon"><Plus size={22} /></span>
              </div>
              {activeFaq === idx && (
                <div className="faq-answer"><p>{faq.a}</p></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="wedding-cta-final">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{ctaSection.label}</span>
          <h2>{ctaSection.title}</h2>
          <p>{ctaSection.subtitle}</p>
          <Link to="/contact" className="btn-primary">
            Plan Your Wedding <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Wedding;

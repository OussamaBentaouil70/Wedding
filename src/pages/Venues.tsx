import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/PageHero';
import { resolveJsonImageSrc } from '../utils/imageResolver';

// ─────────────────────────────────────────────────────────
const Venues: React.FC = () => {
  const { t, i18n } = useTranslation();
  const venuesData: any = t('venues_page', { returnObjects: true });

  const heroImages: string[] = (venuesData.heroImages ?? []).map(resolveJsonImageSrc);
  const priorities: string[] = venuesData.priorities ?? [];
  const categories: any[] = (venuesData.categories ?? []).map((category: any) => ({
    ...category,
    img: resolveJsonImageSrc(category.img),
  }));
  const destinations: any[] = venuesData.destinations ?? [];
  const serviceItems: string[] = venuesData.serviceSection?.items ?? [];
  const considerations: any[] = venuesData.considerations ?? [];
  const reasons: any[] = venuesData.reasons ?? [];
  const faqs: any[] = venuesData.faqs ?? [];

  const safeHeroImages = heroImages.filter(Boolean);
  const safeCategories = categories.filter((category: any) => Boolean(category.img));

  const serviceOptions = useMemo(
    () => safeCategories.map((c: any) => ({ value: c.title, label: c.title })),
    [safeCategories]
  );

  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const activeCategory = useMemo(
    () => (activeCategoryIdx === null ? null : safeCategories[activeCategoryIdx]),
    [activeCategoryIdx, safeCategories]
  );

  useEffect(() => {
    setActiveCategoryIdx(null);
    setActiveFaq(null);
  }, [i18n.language]);

  useEffect(() => {
    if (activeCategoryIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCategoryIdx(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCategoryIdx]);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-form');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = el.querySelector('input, select, textarea, button') as HTMLElement | null;
    firstInput?.focus?.();
  };

  return (
    <div className="page-events">

      {/* ══════════ HERO ══════════ */}
      <PageHero
        images={safeHeroImages}
        label={venuesData.hero.label}
        title={venuesData.hero.title}
        subtitle={venuesData.hero.subtitle}
        defaultService={venuesData.hero.defaultService}
        serviceOptions={serviceOptions}
        servicePlaceholder="Select a venue type"
      />

      {/* ══════════ INTRO / PRIORITIES ══════════ */}
      <section id="venues-intro" className="section-padding container reveal">
        <div className="editorial-container">
          <div className="editorial-text-side">
            <span className="section-label">{venuesData.introSection.label}</span>
            <span className="gold-line gold-line-left" />
            <h2>{venuesData.introSection.title}</h2>
            <p>{venuesData.introSection.subtitle}</p>
            <ul className="editorial-details-list">
              {priorities.map((p: string) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="editorial-img-side">
            {safeHeroImages[0] ? (
              <img src={safeHeroImages[0]} alt={venuesData.introSection.title} className="editorial-img-main" />
            ) : null}
          </div>
        </div>
      </section>

      {/* ══════════ VENUE CATEGORIES ══════════ */}
      <section id="venues-categories" className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{venuesData.categoriesSection.label}</span>
          <span className="gold-line" />
          <h2>{venuesData.categoriesSection.title}</h2>
          <p>{venuesData.categoriesSection.subtitle}</p>
        </div>
        <div className="ev-categories-grid">
          {safeCategories.map((cat: any, i: number) => (
            <button
              key={cat.title}
              type="button"
              className="ev-category-card ev-card-button reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActiveCategoryIdx(i)}
              aria-haspopup="dialog"
              aria-expanded={activeCategoryIdx === i}
            >
              <div className="ev-category-img-wrap">
                {cat.img ? <img src={cat.img} alt={cat.title} /> : null}
              </div>
              <div className="ev-category-body">
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ══════════ CATEGORY MODAL ══════════ */}
      {activeCategory && (
        <div
          className="ev-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCategory.title} ${venuesData.ui.details}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveCategoryIdx(null);
          }}
        >
          <div className="ev-modal">
            <button
              type="button"
              className="ev-modal-close"
              onClick={() => setActiveCategoryIdx(null)}
              aria-label={venuesData.ui.close}
            >
              <X size={20} />
            </button>

            <div className="ev-modal-grid">
              <div className="ev-modal-img-wrap">
                {activeCategory.img ? (
                  <img src={activeCategory.img} alt={activeCategory.title} className="ev-modal-img" />
                ) : null}
                <div className="ev-modal-img-overlay" />
                <div className="ev-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>
                    {venuesData.ui.venue_category}
                  </span>
                  <h3>{activeCategory.title}</h3>
                </div>
              </div>

              <div className="ev-modal-body">
                <p className="ev-modal-desc">{activeCategory.detail}</p>
                <ul className="ev-modal-highlights">
                  {(activeCategory.highlights ?? []).map((h: string) => (
                    <li key={h}>
                      <span className="ev-modal-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {activeCategory.bestSuitedFor ? (
                  <p className="ev-modal-desc">
                    <strong>{venuesData.ui.best_suited_for}: </strong>
                    {activeCategory.bestSuitedFor}
                  </p>
                ) : null}

                <div className="ev-modal-cta">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setActiveCategoryIdx(null);
                      scrollToReservation();
                    }}
                  >
                    {activeCategory.cta || venuesData.ui.reserve} <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveCategoryIdx(null)}>
                    {venuesData.ui.continue}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ DESTINATIONS ACROSS MOROCCO ══════════ */}
      <section id="venues-destinations" className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{venuesData.destinationsSection.label}</span>
          <span className="gold-line" />
          <h2>{venuesData.destinationsSection.title}</h2>
          <p>{venuesData.destinationsSection.subtitle}</p>
        </div>
        <div className="wedding-services-grid">
          {destinations.map((d: any, i: number) => (
            <div key={d.title} className="wedding-service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ VENUE SELECTION SERVICE ══════════ */}
      <section id="venues-service" className="section-padding container reveal">
        <div className="editorial-container">
          <div className="editorial-text-side">
            <span className="section-label">{venuesData.serviceSection.label}</span>
            <span className="gold-line gold-line-left" />
            <h2>{venuesData.serviceSection.title}</h2>
            <p>{venuesData.serviceSection.body}</p>
          </div>
          <div className="editorial-text-side">
            <ul className="service-checklist">
              {serviceItems.map((item: string) => (
                <li key={item}>
                  <span className="service-checklist-icon"><Check size={14} /></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '30px' }}>
              <button type="button" className="btn-primary" onClick={scrollToReservation}>
                {venuesData.serviceSection.cta} <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHAT WE CONSIDER ══════════ */}
      <section id="venues-considerations" className="journey-dark-section reveal">
        <div className="container">
          <div className="wedding-section-header">
            <h2 style={{ color: '#fff' }}>{venuesData.considerationsSection.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{venuesData.considerationsSection.subtitle}</p>
          </div>
          <div className="included-grid">
            {considerations.map((item: any, idx: number) => (
              <div key={item.title} className="included-card reveal" style={{ transitionDelay: `${idx * 60}ms` }}>
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

      {/* ══════════ WHY PLAN WITH US ══════════ */}
      <section id="venues-why" className="ev-promise-section">
        <div className="ev-promise-bg" />
        <div className="container ev-promise-inner">
          <div className="wedding-section-header reveal">
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{venuesData.whySection.label}</span>
            <span className="gold-line" />
            <h2 style={{ color: '#fff' }}>{venuesData.whySection.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>{venuesData.whySection.subtitle}</p>
          </div>
          <div className="ev-promise-grid">
            {reasons.map((r: any, i: number) => (
              <div key={r.title} className={`ev-promise-card reveal delay-${(i + 1) * 100}`}>
                <span className="ev-promise-icon">{r.icon}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="venues-faq" className="section-padding container reveal">
        <div className="wedding-faq">
          <div className="wedding-section-header">
            <span className="section-label">{venuesData.faqSection.label}</span>
            <span className="gold-line" />
            <h2>{venuesData.faqSection.title}</h2>
          </div>
          {faqs.map((faq: any, idx: number) => (
            <div key={faq.q} className={`faq-item ${activeFaq === idx ? 'active' : ''}`}>
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
      <section id="venues-cta" className="wedding-cta-final">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{venuesData.ctaSection.label}</span>
          <h2>{venuesData.ctaSection.title}</h2>
          <p>{venuesData.ctaSection.subtitle}</p>
          <Link to="/contact" className="btn-primary">
            {venuesData.ui.plan_venue} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Venues;

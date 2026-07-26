import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/PageHero';
import { resolveJsonImageSrc } from '../utils/imageResolver';
import aboutMeImg from '../assets/images/Proposals/about-me.png';

// ─────────────────────────────────────────────────────────
const Proposals: React.FC = () => {
  const { t, i18n } = useTranslation();
  const proposalsData: any = t('proposals_page', { returnObjects: true });

  const heroImages: string[] = (proposalsData.heroImages ?? []).map(resolveJsonImageSrc);
  const stats: any[] = proposalsData.stats ?? [];
  const categories: any[] = (proposalsData.categories ?? []).map((category: any) => ({
    ...category,
    img: resolveJsonImageSrc(category.img),
  }));
  const featured: any[] = proposalsData.featured ?? [];
  const promises: any[] = proposalsData.promises ?? [];
  const processSteps: any[] = proposalsData.process ?? [];
  const testimonials: any[] = proposalsData.testimonials ?? [];

  const safeHeroImages = heroImages.filter(Boolean);
  const safeCategories = categories.filter((category: any) => Boolean(category.img));

  const serviceOptions = useMemo(
    () => safeCategories.map((c: any) => ({ value: c.title, label: c.title })),
    [safeCategories]
  );

  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number | null>(null);
  const [testiIdx, setTestiIdx] = useState(0);

  const activeCategory = useMemo(
    () => (activeCategoryIdx === null ? null : safeCategories[activeCategoryIdx]),
    [activeCategoryIdx, safeCategories]
  );

  useEffect(() => {
    setActiveCategoryIdx(null);
  }, [i18n.language]);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const timer = setInterval(() => setTestiIdx((i) => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

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
        label={proposalsData.hero.label}
        title={proposalsData.hero.title}
        subtitle={proposalsData.hero.subtitle}
        defaultService={proposalsData.hero.defaultService}
        serviceOptions={serviceOptions}
        servicePlaceholder="Select a proposal style"
      />

      {/* ══════════ STATS BAR ══════════ */}
      <section id="proposals-stats" className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            {stats.map((stat: any, i: number) => (
              <div key={stat.label} className="trust-stat reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="trust-value">{stat.value}</span>
                <span className="trust-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROPOSAL STYLES ══════════ */}
      <section id="proposals-categories" className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{proposalsData.categoriesSection.label}</span>
          <span className="gold-line" />
          <h2>{proposalsData.categoriesSection.title}</h2>
          <p>{proposalsData.categoriesSection.subtitle}</p>
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
          aria-label={`${activeCategory.title} ${proposalsData.ui.details}`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveCategoryIdx(null);
          }}
        >
          <div className="ev-modal">
            <button
              type="button"
              className="ev-modal-close"
              onClick={() => setActiveCategoryIdx(null)}
              aria-label={proposalsData.ui.close}
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
                    {proposalsData.ui.category_label}
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
                    <strong>{proposalsData.ui.best_suited_for}: </strong>
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
                    {activeCategory.cta || proposalsData.ui.reserve} <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveCategoryIdx(null)}>
                    {proposalsData.ui.continue}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ FEATURED WORK ══════════ */}
      <section id="proposals-featured" className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">{proposalsData.featuredSection.label}</span>
          <span className="gold-line" />
          <h2>{proposalsData.featuredSection.title}</h2>
          <p>{proposalsData.featuredSection.subtitle}</p>
        </div>
        <div className="wedding-services-grid">
          {featured.map((f: any, i: number) => (
            <div key={f.title} className="wedding-service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3>{f.title}</h3>
              <p style={{ fontStyle: 'italic', marginBottom: '14px' }}>{f.desc}</p>
              <p>{f.detail}</p>
              {f.path ? (
                <Link to={f.path} className="btn-outline" style={{ marginTop: '20px' }}>
                  {proposalsData.ui.discover} <ArrowRight size={14} />
                </Link>
              ) : (
                <a href={f.anchor} className="btn-outline" style={{ marginTop: '20px' }}>
                  {proposalsData.ui.discover} <ArrowRight size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ ABOUT / WHO DOES IT ══════════ */}
      <section id="proposals-about" className="section-padding container reveal">
        <div className="editorial-container">
          <div className="editorial-img-side">
            <img src={aboutMeImg} alt={proposalsData.aboutSection.imageAlt} className="editorial-img-main" />
          </div>
          <div className="editorial-text-side">
            <span className="section-label">{proposalsData.aboutSection.label}</span>
            <span className="gold-line gold-line-left" />
            <h2>{proposalsData.aboutSection.name}</h2>
            <p style={{ fontStyle: 'italic', marginTop: '-8px' }}>{proposalsData.aboutSection.role}</p>
            <p>{proposalsData.aboutSection.p1}</p>
            <p>{proposalsData.aboutSection.p2}</p>
            <p>{proposalsData.aboutSection.p3}</p>
            <div style={{ marginTop: '20px' }}>
              <Link to="/contact" className="btn-primary">
                {proposalsData.aboutSection.cta} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ THE MARRAKECH ROMANCE PROMISE ══════════ */}
      <section id="proposals-promise" className="ev-promise-section">
        <div className="ev-promise-bg" />
        <div className="container ev-promise-inner">
          <div className="wedding-section-header reveal">
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{proposalsData.promiseSection.label}</span>
            <span className="gold-line" />
            <h2 style={{ color: '#fff' }}>{proposalsData.promiseSection.title}</h2>
          </div>
          <div className="ev-promise-grid">
            {promises.map((p: any, i: number) => (
              <div key={p.title} className={`ev-promise-card reveal delay-${(i + 1) * 100}`}>
                <span className="ev-promise-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ THE PROCESS ══════════ */}
      <section id="proposals-process" className="home-process section-padding">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-label">{proposalsData.processSection.label}</span>
            <span className="gold-line" />
            <h2>{proposalsData.processSection.title}</h2>
          </div>
          <div className="process-steps-grid">
            {processSteps.map((step: any, i: number) => (
              <div key={step.num} className={`process-step reveal delay-${(i + 1) * 100}`}>
                <span className="process-step-num">{step.num}</span>
                <div className="process-step-line" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CLIENT STORIES ══════════ */}
      {testimonials.length > 0 ? (
        <section id="proposals-testimonials" className="home-testimonials">
          <div className="testimonials-bg" />
          <div className="container testimonials-inner">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span className="section-label" style={{ color: 'rgba(212,185,138,0.9)' }}>{proposalsData.testimonialsSection.label}</span>
              <span className="gold-line" style={{ background: 'rgba(184,154,106,0.5)' }} />
              <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{proposalsData.testimonialsSection.title}</h2>
            </div>

            <div className="testimonial-slider">
              <div className="testimonial-card reveal">
                <blockquote className="testimonial-quote">"{testimonials[testiIdx].quote}"</blockquote>
                <div className="testimonial-author">
                  <div>
                    <strong>{testimonials[testiIdx].author}</strong>
                    <span>{testimonials[testiIdx].category}</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-dots">
                {testimonials.map((_: any, i: number) => (
                  <button
                    key={i}
                    className={`testimonial-dot ${i === testiIdx ? 'active' : ''}`}
                    onClick={() => setTestiIdx(i)}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* ══════════ FINAL CTA ══════════ */}
      <section id="proposals-cta" className="wedding-cta-final">
        <div className="container">
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{proposalsData.ctaSection.label}</span>
          <h2>{proposalsData.ctaSection.title}</h2>
          <p>{proposalsData.ctaSection.subtitle}</p>
          <Link to="/contact" className="btn-primary">
            {proposalsData.ui.plan} <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Proposals;

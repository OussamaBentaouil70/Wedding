import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Check, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Form Integration
import { submitForm } from '../utils/formHandler';

// ── Assets ────────────────────────────────────────────────
import logo            from '../assets/images/logo2.png';
import weddingHero     from '../assets/images/Weddings/8.jpg';
import weddingModern   from '../assets/images/Weddings/11.jpg';
import weddingBohemian from '../assets/images/wedding/bohemian.jpg';
import weddingVideo    from '../assets/video/Wedding.mp4';

import privateEventsImg from '../assets/images/Corporate Events/13.jpg';
import privatePartiesImg from '../assets/images/EVJF - Bachelor Party/8.jpg';
import corporateEventsImg from '../assets/images/Corporate Events/50.jpg';

const HERO_VIDEO = weddingVideo;

// ── Data ──────────────────────────────────────────────────
// Data moved inside component for i18n support

const weddingPreviews = [
  {
    img: 'https://100lclive.s3.amazonaws.com/img/ideas/blog-full/211127.jpg',
    category: 'Signature Wedding',
    title: 'Marrakech Weddings',
    location: 'Riads, gardens, rooftops',
    detail:
      'From hidden riads to palace gardens, Marrakech weddings are cinematic, intimate, and rich in atmosphere — designed with editorial polish and flawless coordination.',
    highlights: ['Riad courtyards, rooftops, palaces', 'Design + styling direction', 'Guest journey + on-the-day orchestration'],
  },
  {
    img: 'https://erikatuestaphotography.com/wp-content/uploads/sites/19622/2024/08/morrocan-desert-wedding-marrakech-wedding-photographer-erika-tuesta-45.jpg',
    category: 'Signature Wedding',
    title: 'Desert Weddings',
    location: 'Agafay & the Sahara',
    detail:
      'A sunset ceremony, lantern-lit dining, and music under the stars — desert weddings are immersive destination experiences with effortless luxury.',
    highlights: ['Sunset ceremonies + stargazing dinners', 'Logistics + transport planning', 'Entertainment, lighting, and timing'],
  },
  {
    img: 'https://beyondweddings.com/wp-content/uploads/2025/09/AdelaideJeroen-686-1-1024x683.jpg.webp',
    category: 'Signature Wedding',
    title: 'Coastal & Estate Weddings',
    location: 'Essaouira & private estates',
    detail:
      'Coastal light, sea air, and relaxed sophistication — from seaside celebrations to private estates designed for multi-day hosting.',
    highlights: ['Coastal ceremonies + golden hour', 'Estate weekends + guest hosting', 'Vendor curation + hospitality'],
  },
] as const;

const eventPreviews = [
  {
    img: privateEventsImg,
    title: 'Welcome Dinners',
    tag: 'Private Events',
    detail:
      'The first gathering sets the tone — refined dining, warm hosting, and a beautifully paced evening for your guests.',
    highlights: ['Venue + chef/caterer curation', 'Tablescapes + lighting', 'Run-of-show + coordination'],
  },
  {
    img: weddingModern,
    title: 'Engagement Celebrations',
    tag: 'Pre-Wedding',
    detail:
      'An engagement celebration that feels like an editorial moment — intimate, intentional, and flawlessly managed.',
    highlights: ['Concept + styling', 'Vendor curation', 'Guest experience + timing'],
  },
  {
    img: privatePartiesImg,
    title: 'Private Parties',
    tag: 'Celebrations',
    detail:
      'Birthdays, anniversaries, private dinners — elevated celebrations that feel effortless and unforgettable.',
    highlights: ['Atmosphere + entertainment', 'Hospitality details', 'On-site team management'],
  },
  {
    img: corporateEventsImg,
    title: 'Corporate & Brand Events',
    tag: 'Business',
    detail:
      'Premium gatherings for brands and corporate teams — creative direction, logistics, and execution handled with precision.',
    highlights: ['Planning + production partners', 'AV, staging, and timelines', 'Discreet hosting + coordination'],
  },
] as const;

const testimonials = [
  { text: "Working with the team felt like having an artistic director and a best friend rolled into one. Our Marrakech wedding was beyond anything we could have imagined.", author: 'Charlotte & Rémi', origin: 'Paris, France', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80' },
  { text: "Every single detail — from the jasmine archway at sunset to the midnight gnawa musicians — was exactly us. I've never felt so seen by a planner.", author: 'Priya & Daniel', origin: 'London, UK', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { text: "Our corporate retreat in the Atlas Mountains pushed every boundary of what I thought an event could be. Clients are still talking about it six months on.", author: 'Marcus Webb', origin: 'New York, USA', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
];

interface InquiryForm { name: string; email: string; service: string; message: string; }

// ─────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [testiIdx, setTestiIdx]   = useState(0);
  const [form, setForm]           = useState<InquiryForm>({ name: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent]   = useState(false);
  const [activeWeddingPreviewIdx, setActiveWeddingPreviewIdx] = useState<number | null>(null);
  const [activeEventPreviewIdx, setActiveEventPreviewIdx] = useState<number | null>(null);

  const activeWeddingPreview = useMemo(
    () => (activeWeddingPreviewIdx === null ? null : weddingPreviews[activeWeddingPreviewIdx]),
    [activeWeddingPreviewIdx]
  );
  const activeEventPreview = useMemo(
    () => (activeEventPreviewIdx === null ? null : eventPreviews[activeEventPreviewIdx]),
    [activeEventPreviewIdx]
  );

  const trustStats = useMemo(() => [
    { value: '200+', label: t('home.trust.weddings') },
    { value: '18',   label: t('home.trust.years') },
    { value: '40+',  label: t('home.trust.countries') },
    { value: '100%', label: t('home.trust.satisfaction') },
  ], [t]);

  useEffect(() => {
    const t = setInterval(() => setTestiIdx(i => (i + 1) % testimonials.length), 5500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (activeWeddingPreviewIdx === null && activeEventPreviewIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveWeddingPreviewIdx(null);
        setActiveEventPreviewIdx(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeWeddingPreviewIdx, activeEventPreviewIdx]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsSubmitting(true);
    
    const result = await submitForm({
      contact_name: form.name,
      contact_email: form.email,
      service_type: form.service,
      message: form.message
    });

    setIsSubmitting(false);
    if (result.success) {
      setFormSent(true);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div className="page-home">

      {/* ══════════════════════════════════════
          1. HERO – full-bleed video
      ══════════════════════════════════════ */}
      <section id="home-hero" className="home-hero home-hero--video">
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
          <span className="section-label">{t('home.hero.tagline')}</span>
          <h1 className="home-hero-title">
            {t('home.hero.title_1')}<br />
            <em>{t('home.hero.title_2')}</em>
          </h1>
          <p className="home-hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="home-hero-actions">
            <button 
              className="btn-primary" 
              onClick={() => document.getElementById('reservation-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('home.hero.book')} <ArrowRight size={15} />
            </button>
            <button className="btn-ghost" onClick={() => navigate('/wedding')}>
              {t('home.hero.plan')}
            </button>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-text">{t('home.hero.scroll')}</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. TRUST BAR
      ══════════════════════════════════════ */}
      <section id="home-trust" className="trust-bar">
        <div className="container">
          <div className="trust-bar-inner">
            {trustStats.map((stat, i) => (
              <div key={i} className="trust-stat reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="trust-value">{stat.value}</span>
                <span className="trust-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. ABOUT
      ══════════════════════════════════════ */}
      <section id="home-about" className="home-about section-padding">
        <div className="container">
          <div className="home-about-grid">
            <div className="home-about-images reveal">
              <div className="about-img-main">
                <img src={weddingHero} alt="Luxury Moroccan wedding ceremony" />
              </div>
              <div className="about-img-secondary reveal delay-200">
                <img src={weddingModern} alt="Modern wedding styling" />
              </div>
              <div className="about-img-badge">
                <img src={logo} alt="Marrakech Weddings" className="about-badge-logo" />
                <span>Est. 2006</span>
              </div>
            </div>

            <div className="home-about-text reveal delay-100">
              <span className="section-label">{t('home.about.tagline')}</span>
              <span className="gold-line gold-line-left" />
              <h2 className="about-headline">
                {t('home.about.title_1')}<br />
                <em>{t('home.about.title_2')}</em><br />
                {t('home.about.title_3')}
              </h2>
              <p className="about-body">
                {t('home.about.p1')}
              </p>
              <p className="about-body">
                {t('home.about.p2')} <strong>{t('home.about.p2_strong')}</strong>.
              </p>
              <div className="about-actions">
                <Link to="/wedding" className="btn-primary">{t('home.about.weddings_btn')} <ArrowRight size={15} /></Link>
                <Link to="/events"  className="btn-outline">{t('home.about.events_btn')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. SIGNATURE PROMISES
      ══════════════════════════════════════ */}
      <section id="home-promises" className="home-promises">
        <div className="promises-bg" />
        <div className="container promises-inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.9)' }}>{t('home.promises.tagline')}</span>
            <span className="gold-line" style={{ background: 'rgba(184,154,106,0.5)' }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>{t('home.promises.title')}</h2>
          </div>
          <div className="promises-grid">
            {[
              { icon: '✦', title: t('home.promises.p1_title'), desc: t('home.promises.p1_desc') },
              { icon: '◈', title: t('home.promises.p2_title'), desc: t('home.promises.p2_desc') },
              { icon: '◎', title: t('home.promises.p3_title'), desc: t('home.promises.p3_desc') },
              { icon: '❋', title: t('home.promises.p4_title'), desc: t('home.promises.p4_desc') },
            ].map((p, i) => (
              <div key={i} className={`promise-card reveal delay-${(i + 1) * 100}`}>
                <span className="promise-icon">{p.icon}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. WEDDINGS PREVIEW
      ══════════════════════════════════════ */}
      <section id="home-weddings" className="section-padding home-weddings-preview">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <span className="section-label">{t('home.weddings.tagline')}</span>
              <span className="gold-line gold-line-left" />
              <h2>{t('home.weddings.title')}</h2>
            </div>
            <Link to="/wedding" className="btn-outline section-header-cta">{t('home.weddings.btn')} <ArrowRight size={15} /></Link>
          </div>

          <div className="home-preview-grid home-preview-grid--weddings">
            {weddingPreviews.map((w, i) => (
              <button
                key={w.title}
                type="button"
                className={`home-preview-card reveal delay-${(i + 1) * 100}`}
                onClick={() => {
                  setActiveEventPreviewIdx(null);
                  setActiveWeddingPreviewIdx(i);
                }}
                aria-haspopup="dialog"
                aria-expanded={activeWeddingPreviewIdx === i}
              >
                <div className="home-preview-img-wrap">
                  <img src={w.img} alt={w.title} />
                  <div className="home-preview-overlay">
                    <span className="home-preview-tag">{w.category}</span>
                    <div className="home-preview-info">
                      <h3>{w.title}</h3>
                      <p>{w.location}</p>
                    </div>
                    <span className="home-preview-hint">View details</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="section-cta-row reveal">
            <Link to="/wedding" className="btn-primary">{t('home.weddings.btn')} <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. EVENTS PREVIEW
      ══════════════════════════════════════ */}
      <section id="home-events" className="home-events-preview">
        <div className="events-preview-head container reveal">
          <span className="section-label">{t('home.events.tagline')}</span>
          <span className="gold-line gold-line-left" />
          <h2>{t('home.events.title')}</h2>
          <p className="events-preview-sub">
            {t('home.events.subtitle')}
          </p>
        </div>
        <div className="container">
          <div className="home-preview-grid home-preview-grid--events">
          {eventPreviews.map((ev, i) => (
            <button
              key={ev.title}
              type="button"
              className={`home-preview-card reveal delay-${(i % 3 + 1) * 100}`}
              onClick={() => {
                setActiveWeddingPreviewIdx(null);
                setActiveEventPreviewIdx(i);
              }}
              aria-haspopup="dialog"
              aria-expanded={activeEventPreviewIdx === i}
            >
              <div className="home-preview-img-wrap">
                <img src={ev.img} alt={ev.title} />
                <div className="home-preview-overlay">
                  <span className="home-preview-tag">{ev.tag}</span>
                  <div className="home-preview-info">
                    <h3>{ev.title}</h3>
                    <p>Across Morocco</p>
                  </div>
                  <span className="home-preview-hint">View details</span>
                </div>
              </div>
            </button>
          ))}
          </div>
        </div>
        <div className="container">
          <div className="section-cta-row reveal" style={{ paddingTop: '60px' }}>
            <Link to="/events" className="btn-primary">{t('home.events.btn')} <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOME PREVIEW MODAL (Weddings/Events)
      ══════════════════════════════════════ */}
      {activeWeddingPreview && (
        <div
          className="home-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeWeddingPreview.title} details`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveWeddingPreviewIdx(null);
          }}
        >
          <div className="home-modal">
            <button
              type="button"
              className="home-modal-close"
              onClick={() => setActiveWeddingPreviewIdx(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="home-modal-grid">
              <div className="home-modal-img-wrap">
                <img src={activeWeddingPreview.img} alt={activeWeddingPreview.title} className="home-modal-img" />
                <div className="home-modal-img-overlay" />
                <div className="home-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Featured Weddings</span>
                  <h3>{activeWeddingPreview.title}</h3>
                </div>
              </div>

              <div className="home-modal-body">
                <p className="home-modal-desc">{activeWeddingPreview.detail}</p>
                <ul className="home-modal-highlights">
                  {activeWeddingPreview.highlights.map((h) => (
                    <li key={h}>
                      <span className="home-modal-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="home-modal-cta">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setActiveWeddingPreviewIdx(null);
                      navigate('/wedding');
                    }}
                  >
                    Explore Weddings <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveWeddingPreviewIdx(null)}>
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeEventPreview && (
        <div
          className="home-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeEventPreview.title} details`}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveEventPreviewIdx(null);
          }}
        >
          <div className="home-modal">
            <button
              type="button"
              className="home-modal-close"
              onClick={() => setActiveEventPreviewIdx(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="home-modal-grid">
              <div className="home-modal-img-wrap">
                <img src={activeEventPreview.img} alt={activeEventPreview.title} className="home-modal-img" />
                <div className="home-modal-img-overlay" />
                <div className="home-modal-img-title">
                  <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Events Preview</span>
                  <h3>{activeEventPreview.title}</h3>
                </div>
              </div>

              <div className="home-modal-body">
                <p className="home-modal-desc">{activeEventPreview.detail}</p>
                <ul className="home-modal-highlights">
                  {activeEventPreview.highlights.map((h) => (
                    <li key={h}>
                      <span className="home-modal-bullet">✦</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="home-modal-cta">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      setActiveEventPreviewIdx(null);
                      navigate('/events');
                    }}
                  >
                    Explore Events <ArrowRight size={15} />
                  </button>
                  <button type="button" className="btn-outline" onClick={() => setActiveEventPreviewIdx(null)}>
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          7. PROCESS
      ══════════════════════════════════════ */}
      <section id="home-process" className="home-process section-padding">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-label">{t('home.process.tagline')}</span>
            <span className="gold-line" />
            <h2>{t('home.process.title_1')}<br /><em>{t('home.process.title_2')}</em></h2>
          </div>
          <div className="process-steps-grid">
            {[
              { num: '01', title: t('home.process.s1_title'), desc: t('home.process.s1_desc') },
              { num: '02', title: t('home.process.s2_title'), desc: t('home.process.s2_desc') },
              { num: '03', title: t('home.process.s3_title'), desc: t('home.process.s3_desc') },
              { num: '04', title: t('home.process.s4_title'), desc: t('home.process.s4_desc') },
            ].map((step, i) => (
              <div key={i} className={`process-step reveal delay-${(i + 1) * 100}`}>
                <span className="process-step-num">{step.num}</span>
                <div className="process-step-line" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="section-cta-row reveal delay-500">
            <Link to="/contact" className="btn-primary">{t('home.process.btn')} <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════ */}
      <section id="home-testimonials" className="home-testimonials">
        <div className="testimonials-bg" />
        <div className="container testimonials-inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.9)' }}>{t('home.testimonials.tagline')}</span>
            <span className="gold-line" style={{ background: 'rgba(184,154,106,0.5)' }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>{t('home.testimonials.title')}</h2>
          </div>

          <div className="testimonial-slider">
            <div className="testimonial-card reveal">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <blockquote className="testimonial-quote">"{testimonials[testiIdx].text}"</blockquote>
              <div className="testimonial-author">
                <img src={testimonials[testiIdx].img} alt={testimonials[testiIdx].author} className="testimonial-avatar" />
                <div>
                  <strong>{testimonials[testiIdx].author}</strong>
                  <span>{testimonials[testiIdx].origin}</span>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`testimonial-dot ${i === testiIdx ? 'active' : ''}`} onClick={() => setTestiIdx(i)} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          9. FINAL CTA
      ══════════════════════════════════════ */}
      <section className="home-final-cta" id="reservation-form">
        <div className="home-final-cta-bg" style={{ backgroundImage: `url(${weddingBohemian})` }} />
        <div className="home-final-cta-overlay" />
        <div className="container home-final-cta-content reveal">
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{t('home.cta.tagline')}</span>
          <span className="gold-line" style={{ background: 'rgba(184,154,106,0.6)' }} />
          <h2 style={{ color: '#fff', fontSize: 'clamp(2.4rem, 5vw, 4rem)', maxWidth: '700px', margin: '0 auto 24px' }}>
            {t('home.cta.title_1')}<br /><em>{t('home.cta.title_2')}</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem', marginBottom: '44px', maxWidth: '560px', margin: '0 auto 44px' }}>
            {t('home.cta.subtitle')}
          </p>
          <div className="home-final-cta-actions">
            <Link to="/contact" className="btn-primary">{t('home.cta.btn_plan')} <ArrowRight size={15} /></Link>
            <a href="https://api.whatsapp.com/send/?phone=212699728058&text=Hello%2C+I%27d+like+to+inquire+about+your+services.&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessageCircle size={16} /> {t('home.cta.btn_wa')}
            </a>
          </div>

          <div className="home-cta-form reveal delay-200">
            {formSent ? (
              <div className="cta-form-success">
                <Check size={28} />
                <p>{t('home.cta.form_success')}</p>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleSubmit}>
                <h3>{t('home.cta.form_title')}</h3>
                <div className="cta-form-row">
                  <input name="name" placeholder={t('home.cta.form_name')} value={form.name} onChange={handleForm} required />
                  <input name="email" type="email" placeholder={t('home.cta.form_email')} value={form.email} onChange={handleForm} required />
                  <select name="service" value={form.service} onChange={handleForm} required>
                    <option value="" disabled>{t('home.cta.form_service')}</option>
                    <option value="wedding">{t('home.cta.form_service_wedding')}</option>
                    <option value="corporate">{t('home.cta.form_service_corporate')}</option>
                    <option value="celebration">{t('home.cta.form_service_celebration')}</option>
                    <option value="other">{t('home.cta.form_service_other')}</option>
                  </select>
                </div>
                <textarea name="message" placeholder={t('home.cta.form_msg')} value={form.message} onChange={handleForm} rows={3} />
                <button type="submit" className="btn-primary cta-form-submit" disabled={isSubmitting}>
                  {isSubmitting ? t('home.cta.form_sending') : (<>{t('home.cta.form_send')} <ArrowRight size={15} /></>)}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

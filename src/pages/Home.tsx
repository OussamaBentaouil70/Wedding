import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Check, MessageCircle } from 'lucide-react';

// ── Assets ────────────────────────────────────────────────
import logo            from '../assets/images/logo2.png';
import weddingHero     from '../assets/images/wedding/traditional.jpg';
import weddingModern   from '../assets/images/wedding/modern.jpg';
import weddingBohemian from '../assets/images/wedding/bohemian.jpg';
import sahara          from '../assets/images/gallery/sahara.jpg';
import imperialCity    from '../assets/images/gallery/imperial-city.jpg';
import gastronomy      from '../assets/images/gallery/gastronomy.jpg';
import artDesign       from '../assets/images/gallery/art-design.jpg';

const HERO_VIDEO = 'https://videos.pexels.com/video-files/4954871/4954871-uhd_2560_1440_30fps.mp4';

// ── Data ──────────────────────────────────────────────────
const trustStats = [
  { value: '200+', label: 'Weddings Curated' },
  { value: '18',   label: 'Years of Expertise' },
  { value: '40+',  label: 'Destination Countries' },
  { value: '100%', label: 'Client Satisfaction' },
];

const promises = [
  { icon: '✦', title: 'Undivided Attention',   desc: 'Every couple receives a dedicated planner — your single point of contact, always available.' },
  { icon: '◈', title: 'Local Mastery',         desc: "Two decades of relationships with Morocco's finest vendors, venues, and artisans." },
  { icon: '◎', title: 'Transparent Investment',desc: 'Clear, honest pricing. No surprises. Every dirham accounted for.' },
  { icon: '❋', title: 'Cultural Fluency',      desc: 'Seamlessly blending traditions from around the world with Moroccan soul.' },
];

const weddingPreviews = [
  {
    img: 'https://images.unsplash.com/photo-1519225495810-753b551f3c8c?auto=format&fit=crop&w=900&q=80',
    category: 'Signature Wedding',
    title: 'Marrakech Weddings',
    location: 'Riads, gardens, rooftops',
    detail:
      'From hidden riads to palace gardens, Marrakech weddings are cinematic, intimate, and rich in atmosphere — designed with editorial polish and flawless coordination.',
    highlights: ['Riad courtyards, rooftops, palaces', 'Design + styling direction', 'Guest journey + on-the-day orchestration'],
  },
  {
    img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80',
    category: 'Signature Wedding',
    title: 'Desert Weddings',
    location: 'Agafay & the Sahara',
    detail:
      'A sunset ceremony, lantern-lit dining, and music under the stars — desert weddings are immersive destination experiences with effortless luxury.',
    highlights: ['Sunset ceremonies + stargazing dinners', 'Logistics + transport planning', 'Entertainment, lighting, and timing'],
  },
  {
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
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
    img: imperialCity,
    title: 'Welcome Dinners',
    tag: 'Private Events',
    detail:
      'The first gathering sets the tone — refined dining, warm hosting, and a beautifully paced evening for your guests.',
    highlights: ['Venue + chef/caterer curation', 'Tablescapes + lighting', 'Run-of-show + coordination'],
  },
  {
    img: gastronomy,
    title: 'Engagement Celebrations',
    tag: 'Pre-Wedding',
    detail:
      'An engagement celebration that feels like an editorial moment — intimate, intentional, and flawlessly managed.',
    highlights: ['Concept + styling', 'Vendor curation', 'Guest experience + timing'],
  },
  {
    img: artDesign,
    title: 'Private Parties',
    tag: 'Celebrations',
    detail:
      'Birthdays, anniversaries, private dinners — elevated celebrations that feel effortless and unforgettable.',
    highlights: ['Atmosphere + entertainment', 'Hospitality details', 'On-site team management'],
  },
  {
    img: sahara,
    title: 'Corporate & Brand Events',
    tag: 'Business',
    detail:
      'Premium gatherings for brands and corporate teams — creative direction, logistics, and execution handled with precision.',
    highlights: ['Planning + production partners', 'AV, staging, and timelines', 'Discreet hosting + coordination'],
  },
] as const;

const processSteps = [
  { num: '01', title: 'Discovery Call',      desc: 'We begin by understanding your vision, values, and dreams for your celebration.' },
  { num: '02', title: 'Bespoke Proposal',    desc: 'A tailored concept, venue shortlist, and investment framework presented to you.' },
  { num: '03', title: 'Design & Curation',  desc: 'Moodboards, vendor selection, floral direction, and full visual storytelling.' },
  { num: '04', title: 'Flawless Execution', desc: 'On-the-day orchestration so you experience every moment, fully present.' },
];

const testimonials = [
  { text: "Working with the team felt like having an artistic director and a best friend rolled into one. Our Marrakech wedding was beyond anything we could have imagined.", author: 'Charlotte & Rémi', origin: 'Paris, France', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=80' },
  { text: "Every single detail — from the jasmine archway at sunset to the midnight gnawa musicians — was exactly us. I've never felt so seen by a planner.", author: 'Priya & Daniel', origin: 'London, UK', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
  { text: "Our corporate retreat in the Atlas Mountains pushed every boundary of what I thought an event could be. Clients are still talking about it six months on.", author: 'Marcus Webb', origin: 'New York, USA', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
];

interface InquiryForm { name: string; email: string; service: string; message: string; }

// ─────────────────────────────────────────────────────────
const Home: React.FC = () => {
  const navigate = useNavigate();
  const [testiIdx, setTestiIdx]   = useState(0);
  const [form, setForm]           = useState<InquiryForm>({ name: '', email: '', service: '', message: '' });
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

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setFormSent(true); };

  return (
    <div className="page-home">

      {/* ══════════════════════════════════════
          1. HERO – full-bleed video
      ══════════════════════════════════════ */}
      <section className="home-hero home-hero--video">
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
          <span className="section-label">Destination Wedding Planning</span>
          <h1 className="home-hero-title">
            Bespoke Celebrations<br />
            <em>In the Heart of Morocco</em>
          </h1>
          <p className="home-hero-subtitle">
            Where love stories unfold against Morocco's most extraordinary backdrops — 
            designed with intention, executed with precision.
          </p>
          <div className="home-hero-actions">
            <button className="btn-primary" onClick={() => navigate('/contact')}>
              Begin Your Journey <ArrowRight size={15} />
            </button>
            <button className="btn-ghost" onClick={() => navigate('/wedding')}>
              View Our Work
            </button>
          </div>
        </div>

        <div className="hero-scroll-hint">
          <span className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. TRUST BAR
      ══════════════════════════════════════ */}
      <section className="trust-bar">
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
      <section className="home-about section-padding">
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
              <span className="section-label">Who We Are</span>
              <span className="gold-line gold-line-left" />
              <h2 className="about-headline">
                Morocco's Premier<br />
                <em>Luxury Wedding</em><br />
                & Event Studio
              </h2>
              <p className="about-body">
                We are a boutique planning studio rooted in Marrakech, crafting celebrations that
                feel effortlessly beautiful and deeply personal. With nearly two decades of local
                expertise and a portfolio spanning 40+ countries, we bring international precision
                to Morocco's most extraordinary settings.
              </p>
              <p className="about-body">
                Every event we create is guided by one principle: <strong>your story deserves
                to be told with intention</strong>.
              </p>
              <div className="about-actions">
                <Link to="/wedding" className="btn-primary">Our Weddings <ArrowRight size={15} /></Link>
                <Link to="/events"  className="btn-outline">Our Events</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. SIGNATURE PROMISES
      ══════════════════════════════════════ */}
      <section className="home-promises">
        <div className="promises-bg" />
        <div className="container promises-inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '70px' }}>
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.9)' }}>Our Commitment</span>
            <span className="gold-line" style={{ background: 'rgba(184,154,106,0.5)' }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>The Marrakech Weddings Promise</h2>
          </div>
          <div className="promises-grid">
            {promises.map((p, i) => (
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
      <section className="section-padding home-weddings-preview">
        <div className="container">
          <div className="section-header reveal">
            <div>
              <span className="section-label">Featured Work</span>
              <span className="gold-line gold-line-left" />
              <h2>Signature weddings across Morocco</h2>
            </div>
            <Link to="/wedding" className="btn-outline section-header-cta">Explore Weddings <ArrowRight size={15} /></Link>
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
            <Link to="/wedding" className="btn-primary">Explore Weddings <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          6. EVENTS PREVIEW
      ══════════════════════════════════════ */}
      <section className="home-events-preview">
        <div className="events-preview-head container reveal">
          <span className="section-label">Beyond Weddings</span>
          <span className="gold-line gold-line-left" />
          <h2>Elegant events beyond the wedding day</h2>
          <p className="events-preview-sub">
            Corporate retreats, milestone celebrations, brand activations and private dinners —
            each one an experience worth remembering.
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
            <Link to="/events" className="btn-primary">Explore Events <ArrowRight size={15} /></Link>
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
      <section className="home-process section-padding">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="section-label">How It Works</span>
            <span className="gold-line" />
            <h2>A Seamless Journey<br /><em>From Vision to Reality</em></h2>
          </div>
          <div className="process-steps-grid">
            {processSteps.map((step, i) => (
              <div key={i} className={`process-step reveal delay-${(i + 1) * 100}`}>
                <span className="process-step-num">{step.num}</span>
                <div className="process-step-line" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="section-cta-row reveal delay-500">
            <Link to="/contact" className="btn-primary">Start Planning <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          8. TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="home-testimonials">
        <div className="testimonials-bg" />
        <div className="container testimonials-inner">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-label" style={{ color: 'rgba(212,185,138,0.9)' }}>Client Stories</span>
            <span className="gold-line" style={{ background: 'rgba(184,154,106,0.5)' }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Words from Our Couples</h2>
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
      <section className="home-final-cta">
        <div className="home-final-cta-bg" style={{ backgroundImage: `url(${weddingBohemian})` }} />
        <div className="home-final-cta-overlay" />
        <div className="container home-final-cta-content reveal">
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Ready to Begin?</span>
          <span className="gold-line" style={{ background: 'rgba(184,154,106,0.6)' }} />
          <h2 style={{ color: '#fff', fontSize: 'clamp(2.4rem, 5vw, 4rem)', maxWidth: '700px', margin: '0 auto 24px' }}>
            Let's Create Something<br /><em>Unforgettable Together</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem', marginBottom: '44px', maxWidth: '560px', margin: '0 auto 44px' }}>
            Tell us about your vision. We'll take care of everything else.
          </p>
          <div className="home-final-cta-actions">
            <Link to="/contact" className="btn-primary">Plan Your Event <ArrowRight size={15} /></Link>
            <a href="https://wa.me/212600000000?text=Hello%2C%20I%27d%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>

          <div className="home-cta-form reveal delay-200">
            {formSent ? (
              <div className="cta-form-success">
                <Check size={28} />
                <p>Thank you! We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form className="cta-form" onSubmit={handleSubmit}>
                <h3>Quick Inquiry</h3>
                <div className="cta-form-row">
                  <input name="name" placeholder="Your Name" value={form.name} onChange={handleForm} required />
                  <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleForm} required />
                  <select name="service" value={form.service} onChange={handleForm} required>
                    <option value="" disabled>Type of Event</option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="celebration">Private Celebration</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <textarea name="message" placeholder="Tell us about your vision…" value={form.message} onChange={handleForm} rows={3} />
                <button type="submit" className="btn-primary cta-form-submit">
                  Send Inquiry <ArrowRight size={15} />
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

import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import PageHero from '../components/PageHero';

// Local event images
import corporateImg  from '../assets/images/events/corporate.jpg';
import birthdayImg   from '../assets/images/events/birthday.jpg';
import bachelorImg   from '../assets/images/events/bachelor.jpg';
import editorialImg  from '../assets/images/events/editorial.jpg';
import festivalsImg  from '../assets/images/events/festivals.jpg';
import retreatsImg   from '../assets/images/events/retreats.jpg';
import sahara        from '../assets/images/gallery/sahara.jpg';
import imperialCity  from '../assets/images/gallery/imperial-city.jpg';
// import atlanticCoast from '../assets/images/gallery/atlantic-coast.jpg';

// Hero background images (fading)
const heroImages = [corporateImg, festivalsImg, birthdayImg, retreatsImg];

// ── Data ──────────────────────────────────────────────────
const categories = [
  {
    title: 'Engagement Parties',
    desc: 'Celebrating your first steps into forever with intimate candlelit settings and bespoke Moroccan charm.',
    img: bachelorImg,
    detail:
      'A beautifully hosted engagement celebration that sets the tone for everything to come — designed like an editorial moment, managed like a production.',
    highlights: ['Concept + moodboard direction', 'Venue + vendor curation', 'Guest flow, timing, and on-site coordination'],
  },
  {
    title: 'Bridal Showers & Welcome Dinners',
    desc: 'Elegant pre-wedding gatherings that set the tone for an unforgettable celebration ahead.',
    img: editorialImg,
    detail:
      'From refined bridal showers to welcome dinners in the Medina, we create warm, elevated moments that feel effortless for you and unforgettable for your guests.',
    highlights: ['Tablescapes, florals, lighting', 'Menus, music, entertainment', 'Hospitality details and styling'],
  },
  {
    title: 'Anniversaries & Private Celebrations',
    desc: 'Meaningful milestones marked with personalised design, exclusive venues, and heartfelt details.',
    img: retreatsImg,
    detail:
      'Anniversaries, proposals, private dinners, and milestone moments — crafted with intimacy, beauty, and seamless execution across Morocco.',
    highlights: ['Private venues and intimate set-ups', 'Story-led design details', 'Discreet, high-touch coordination'],
  },
  {
    title: 'Luxury Birthdays',
    desc: 'From lavish rooftop parties to intimate desert dinners — milestones deserve a statement.',
    img: birthdayImg,
    detail:
      'A luxury birthday should feel like a world of its own — whether it’s a rooftop soirée, a villa party, or a desert celebration under the stars.',
    highlights: ['Immersive entertainment curation', 'Signature cocktail + dining moments', 'Timeline + vendor management'],
  },
  {
    title: 'Brand Experiences',
    desc: "Immersive brand activations and editorial productions set against Morocco's most stunning backdrops.",
    img: editorialImg,
    detail:
      'Premium brand activations, launches, dinners, and editorial productions — delivered with creative direction, technical precision, and impeccable guest experience.',
    highlights: ['Creative direction + production', 'Venue scouting and permitting support', 'Run-of-show + on-site team'],
  },
  {
    title: 'Corporate Gatherings',
    desc: 'Prestigious corporate events, executive retreats, and galas delivered with precision and sophistication.',
    img: corporateImg,
    detail:
      'Corporate gatherings across Morocco — executive dinners, retreats, incentive experiences, and galas — planned with discretion, clarity, and polish.',
    highlights: ['Budget + logistics planning', 'AV, staging, and production partners', 'Guest experience and on-site coordination'],
  },
] as const;

const promises = [
  {
    icon: '◈',
    title: 'Strategic Planning',
    desc: 'From concept and budgeting to logistics and timeline — every detail is mapped out with precision before a single vendor is booked.',
  },
  {
    icon: '✦',
    title: 'Elevated Design',
    desc: 'Editorial-quality styling, bespoke florals, atmospheric lighting, and curated entertainment that transforms any space.',
  },
  {
    icon: '◎',
    title: 'Seamless Guest Experience',
    desc: 'Arrival management, hospitality programming, and on-the-day coordination so your guests experience nothing but joy.',
  },
] as const;

const formats = [
  {
    title: 'Rooftop Dinners in Marrakech',
    img: imperialCity,
    tag: 'Featured Format',
    detail: 'Golden hour, lantern light, and a skyline dinner — elevated hospitality with an editorial Moroccan atmosphere.',
    highlights: ['Curated menu + beverage program', 'Lighting + ambiance styling', 'Music + timing for sunset'],
  },
  {
    title: 'Garden Soirées',
    img: retreatsImg,
    tag: 'Featured Format',
    detail: 'Lush greenery, layered florals, and refined dining — perfect for celebrations that feel romantic and timeless.',
    highlights: ['Floral-forward design direction', 'Flexible layouts for guest flow', 'Entertainment + lighting moments'],
  },
  {
    title: 'Desert Experiences',
    img: sahara,
    tag: 'Featured Format',
    detail: 'A destination experience that becomes the story — sunset arrivals, luxury dining, and music under the stars.',
    highlights: ['Transport + logistics coordination', 'Luxury camp styling + dining', 'Immersive entertainment'],
  },
  {
    title: 'Intimate Private Receptions',
    img: bachelorImg,
    tag: 'Featured Format',
    detail: 'A private celebration, perfectly choreographed — for smaller guest counts with exceptional design detail.',
    highlights: ['Fine detail tablescapes', 'Personalised guest touchpoints', 'Seamless run-of-show'],
  },
  {
    title: 'Brand or Executive Dinners',
    img: corporateImg,
    tag: 'Featured Format',
    detail: 'High-level dinners for brands and executives — discreet, premium, and built around impeccable hospitality.',
    highlights: ['Venue + chef/caterer curation', 'AV + production-ready timing', 'Guest arrival + hosting'],
  },
] as const;

// ─────────────────────────────────────────────────────────
const Events: React.FC = () => {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number | null>(null);
  const [activeFormatIdx, setActiveFormatIdx] = useState<number | null>(null);

  const activeCategory = useMemo(
    () => (activeCategoryIdx === null ? null : categories[activeCategoryIdx]),
    [activeCategoryIdx]
  );
  const activeFormat = useMemo(() => (activeFormatIdx === null ? null : formats[activeFormatIdx]), [activeFormatIdx]);

  useEffect(() => {
    if (activeCategoryIdx === null && activeFormatIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategoryIdx(null);
        setActiveFormatIdx(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCategoryIdx, activeFormatIdx]);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-form');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = el.querySelector('input, select, textarea, button') as HTMLElement | null;
    firstInput?.focus?.();
  };

  const closeAllModals = () => {
    setActiveCategoryIdx(null);
    setActiveFormatIdx(null);
  };

  return (
    <div className="page-events">

    {/* ══════════ HERO ══════════ */}
    <PageHero
      images={heroImages}
      label="Events in Morocco"
      title="Refined Events, Beautifully Managed"
      subtitle="We design elegant private and corporate events across Morocco with the same precision, style, and hospitality that define our weddings."
      defaultService="Corporate Event"
    />

    {/* ══════════ EVENT CATEGORIES ══════════ */}
    <section className="section-padding container reveal">
      <div className="wedding-section-header">
        <span className="section-label">What We Offer</span>
        <span className="gold-line" />
        <h2>Event Categories</h2>
        <p>Positioned beyond weddings — crafted with the same precision, artistry, and hospitality.</p>
      </div>
      <div className="ev-categories-grid">
        {categories.map((cat, i) => (
          <button
            key={cat.title}
            type="button"
            className="ev-category-card ev-card-button reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
            onClick={() => {
              setActiveFormatIdx(null);
              setActiveCategoryIdx(i);
            }}
            aria-haspopup="dialog"
            aria-expanded={activeCategoryIdx === i}
          >
            <div className="ev-category-img-wrap">
              <img src={cat.img} alt={cat.title} />
            </div>
            <div className="ev-category-body">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </section>

    {/* ══════════ EVENT PROMISE ══════════ */}
    <section className="ev-promise-section">
      <div className="ev-promise-bg" />
      <div className="container ev-promise-inner">
        <div className="wedding-section-header reveal">
          <h2 style={{ color: '#fff' }}>Our Event Promise</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>
            Three pillars that underpin every event we create in Morocco.
          </p>
        </div>
        <div className="ev-promise-grid">
          {promises.map((p, i) => (
            <div key={i} className={`ev-promise-card reveal delay-${(i + 1) * 100}`}>
              <span className="ev-promise-icon">{p.icon}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ══════════ FEATURED FORMATS ══════════ */}
    <section className="section-padding container reveal">
      <div className="wedding-section-header">
        <span className="section-label">Featured Formats</span>
        <span className="gold-line" />
        <h2>Featured Event Formats</h2>
        <p>Our most-requested event settings — each one a world unto itself.</p>
      </div>
      <div className="ev-formats-grid">
        {formats.map((fmt, i) => (
          <button
            key={fmt.title}
            type="button"
            className="ev-format-card ev-card-button reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
            onClick={() => {
              setActiveCategoryIdx(null);
              setActiveFormatIdx(i);
            }}
            aria-haspopup="dialog"
            aria-expanded={activeFormatIdx === i}
          >
            <div className="ev-format-img-wrap">
              <img src={fmt.img} alt={fmt.title} />
              <div className="ev-format-overlay">
                <span className="ev-format-tag">{fmt.tag}</span>
                <h3>{fmt.title}</h3>
              </div>
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
        aria-label={`${activeCategory.title} details`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeAllModals();
        }}
      >
        <div className="ev-modal">
          <button type="button" className="ev-modal-close" onClick={closeAllModals} aria-label="Close">
            <X size={20} />
          </button>

          <div className="ev-modal-grid">
            <div className="ev-modal-img-wrap">
              <img src={activeCategory.img} alt={activeCategory.title} className="ev-modal-img" />
              <div className="ev-modal-img-overlay" />
              <div className="ev-modal-img-title">
                <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Event Category</span>
                <h3>{activeCategory.title}</h3>
              </div>
            </div>

            <div className="ev-modal-body">
              <p className="ev-modal-desc">{activeCategory.detail}</p>
              <ul className="ev-modal-highlights">
                {activeCategory.highlights.map((h) => (
                  <li key={h}>
                    <span className="ev-modal-bullet">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="ev-modal-cta">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    closeAllModals();
                    scrollToReservation();
                  }}
                >
                  Reserve / Inquire <ArrowRight size={15} />
                </button>
                <button type="button" className="btn-outline" onClick={closeAllModals}>
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ══════════ FORMAT MODAL ══════════ */}
    {activeFormat && (
      <div
        className="ev-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`${activeFormat.title} details`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeAllModals();
        }}
      >
        <div className="ev-modal">
          <button type="button" className="ev-modal-close" onClick={closeAllModals} aria-label="Close">
            <X size={20} />
          </button>

          <div className="ev-modal-grid">
            <div className="ev-modal-img-wrap">
              <img src={activeFormat.img} alt={activeFormat.title} className="ev-modal-img" />
              <div className="ev-modal-img-overlay" />
              <div className="ev-modal-img-title">
                <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Featured Format</span>
                <h3>{activeFormat.title}</h3>
              </div>
            </div>

            <div className="ev-modal-body">
              <p className="ev-modal-desc">{activeFormat.detail}</p>
              <ul className="ev-modal-highlights">
                {activeFormat.highlights.map((h) => (
                  <li key={h}>
                    <span className="ev-modal-bullet">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="ev-modal-cta">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    closeAllModals();
                    scrollToReservation();
                  }}
                >
                  Reserve / Inquire <ArrowRight size={15} />
                </button>
                <button type="button" className="btn-outline" onClick={closeAllModals}>
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ══════════ CTA ══════════ */}
    <section className="wedding-cta-final">
      <div className="container">
        <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Let's Create</span>
        <h2>Plan Your Event</h2>
        <p>Tell us about your occasion — we'll take care of everything else.</p>
        <Link to="/contact" className="btn-primary">
          Plan Your Event <ArrowRight size={15} />
        </Link>
      </div>
    </section>

    </div>
  );
};

export default Events;

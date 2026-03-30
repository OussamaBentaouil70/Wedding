import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
import atlanticCoast from '../assets/images/gallery/atlantic-coast.jpg';

// Hero background images (fading)
const heroImages = [corporateImg, festivalsImg, birthdayImg, retreatsImg];

// ── Data ──────────────────────────────────────────────────
const categories = [
  { title: 'Engagement Parties',              desc: 'Celebrating your first steps into forever with intimate candlelit settings and bespoke Moroccan charm.', img: bachelorImg },
  { title: 'Bridal Showers & Welcome Dinners',desc: 'Elegant pre-wedding gatherings that set the tone for an unforgettable celebration ahead.', img: editorialImg },
  { title: 'Anniversaries & Private Celebrations', desc: 'Meaningful milestones marked with personalised design, exclusive venues, and heartfelt details.', img: retreatsImg },
  { title: 'Luxury Birthdays',                desc: 'From lavish rooftop parties to intimate desert dinners — milestones deserve a statement.', img: birthdayImg },
  { title: 'Brand Experiences',               desc: 'Immersive brand activations and editorial productions set against Morocco\'s most stunning backdrops.', img: editorialImg },
  { title: 'Corporate Gatherings',            desc: 'Prestigious corporate events, executive retreats, and galas delivered with precision and sophistication.', img: corporateImg },
];

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
];

const formats = [
  { title: 'Rooftop Dinners in Marrakech', img: imperialCity,  tag: 'Signature Format' },
  { title: 'Garden Soirées',              img: retreatsImg,    tag: 'Signature Format' },
  { title: 'Desert Experiences',          img: sahara,         tag: 'Signature Format' },
  { title: 'Intimate Private Receptions', img: bachelorImg,    tag: 'Signature Format' },
  { title: 'Brand & Executive Dinners',   img: corporateImg,   tag: 'Signature Format' },
  { title: 'Coastal Celebrations',        img: atlanticCoast,  tag: 'Signature Format' },
];

// ─────────────────────────────────────────────────────────
const Events: React.FC = () => (
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
        <h2>Every Occasion, Elevated</h2>
        <p>A full spectrum of luxury events — each one curated with intention and executed with excellence.</p>
      </div>
      <div className="ev-categories-grid">
        {categories.map((cat, i) => (
          <div key={i} className="ev-category-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="ev-category-img-wrap">
              <img src={cat.img} alt={cat.title} />
            </div>
            <div className="ev-category-body">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          </div>
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
        <span className="section-label">Signature Experiences</span>
        <span className="gold-line" />
        <h2>Featured Event Formats</h2>
        <p>Our most-requested event settings — each one a world unto itself.</p>
      </div>
      <div className="ev-formats-grid">
        {formats.map((fmt, i) => (
          <div key={i} className="ev-format-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="ev-format-img-wrap">
              <img src={fmt.img} alt={fmt.title} />
              <div className="ev-format-overlay">
                <span className="ev-format-tag">{fmt.tag}</span>
                <h3>{fmt.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

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

export default Events;

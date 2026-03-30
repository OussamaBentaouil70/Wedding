import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';

// Hero background images (fading)
const heroImages = [
  'https://images.unsplash.com/photo-1519225495810-753b551f3c8c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80',
];

// ── Data ──────────────────────────────────────────────────
const services = [
  { title: 'Full Wedding Planning',           desc: 'Comprehensive management from concept to the final dance, ensuring every detail is perfectly realized.' },
  { title: 'Wedding Design & Styling',        desc: 'Creating a cohesive visual narrative through floral design, lighting, and bespoke decor.' },
  { title: 'Destination Wedding Coordination',desc: 'Expert logistics for couples traveling to Morocco, managing travel, venues, and local vendors.' },
  { title: 'Elopements & Intimate Weddings',  desc: 'Curating deeply personal and breathtaking ceremonies for smaller, more private celebrations.' },
  { title: 'Multi-Day Wedding Weekends',      desc: 'Designing a full journey for your guests, from welcome dinners to farewell brunches.' },
  { title: 'Cultural & Fusion Weddings',      desc: 'Respectfully blending traditions and cultures into a unique and harmonious celebration.' },
];

const venues = [
  { title: 'Luxury Riads',          img: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80' },
  { title: 'Private Villas & Estates', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' },
  { title: 'Palaces & Gardens',     img: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80' },
  { title: 'Desert Camps',          img: 'https://images.unsplash.com/photo-1516544975463-bf7b9a527af3?auto=format&fit=crop&w=800&q=80' },
  { title: 'Beachfront Venues',     img: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=800&q=80' },
];

const themes = [
  { title: 'Moroccan Royal Elegance',    img: 'https://images.unsplash.com/photo-1519225495810-753b551f3c8c?auto=format&fit=crop&w=800&q=80' },
  { title: 'Modern Minimal Romance',     img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
  { title: 'Desert Sunset Celebration',  img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Garden Wedding in Bloom',    img: 'https://images.unsplash.com/photo-1465495910483-0d6745778503?auto=format&fit=crop&w=800&q=80' },
  { title: 'White & Gold Sophistication',img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { title: 'Beldi Chic Reimagined',      img: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80' },
];

const included = [
  { title: 'Concept development',           desc: 'Developing a unique visual and experiential concept that tells your story.' },
  { title: 'Venue sourcing',                desc: "Curating a list of Morocco's most extraordinary settings for your celebration." },
  { title: 'Budget guidance',               desc: 'Strategic planning and transparent management of your wedding investment.' },
  { title: 'Vendor selection and management',desc: 'Connecting you with the most talented local and international creative partners.' },
  { title: 'Design direction and moodboards',desc: 'Creation of detailed moodboards focusing on every visual element of your day.' },
  { title: 'Guest logistics and hospitality',desc: 'Managing hospitality, transport, and experiences for your traveling guests.' },
  { title: 'Ceremony and reception flow',   desc: 'Designing the seamless choreography of your ceremony and reception.' },
  { title: 'On-the-day coordination',       desc: 'Absolute peace of mind while we oversee every second of your celebration.' },
];

const faqs = [
  { q: 'How far in advance should we start?',                   a: 'For destination weddings in Morocco, we recommend starting 10–12 months in advance to secure your preferred venue and top-tier vendors.' },
  { q: 'Do you work with international couples?',               a: 'Yes, the majority of our clients are international couples. We are experts in handling remote planning and guest logistics.' },
  { q: 'Can you plan multicultural or symbolic ceremonies?',    a: 'Absolutely. We specialise in fusion weddings and can assist with finding celebrants for symbolic, secular, or religious ceremonies.' },
  { q: 'Do you assist with guest experiences and accommodation?',a: 'Yes, we provide full hospitality management including accommodation booking, local tours, and transport for your guests.' },
];

// ─────────────────────────────────────────────────────────
const Wedding: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="page-wedding">

      {/* ══════════ HERO ══════════ */}
      <PageHero
        images={heroImages}
        label="Weddings in Morocco"
        title="Bespoke Weddings in Morocco"
        subtitle="From intimate ceremonies to multi-day celebrations, we design weddings that balance beauty, emotion, and flawless coordination."
        defaultService="Wedding"
      />

      {/* ══════════ SERVICE CATEGORIES ══════════ */}
      <section className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">What We Offer</span>
          <span className="gold-line" />
          <h2>Our Wedding Services</h2>
          <p>Tailored excellence for every step of your journey.</p>
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
          <span className="section-label">Where We Celebrate</span>
          <span className="gold-line" />
          <h2>Celebrate in Morocco's Most Extraordinary Settings</h2>
          <p>From the hidden riads of the Medina to the majestic expanse of the Sahara.</p>
        </div>
        <div className="venue-experience-grid">
          {venues.map((v, i) => (
            <div key={i} className="venue-card">
              <img src={v.img} alt={v.title} className="venue-card-img" />
              <div className="venue-card-overlay">
                <h3>{v.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ DESIGN PHILOSOPHY ══════════ */}
      <section className="section-padding container reveal">
        <div className="editorial-container">
          <div className="editorial-img-side">
            <img
              src="https://images.unsplash.com/photo-1541250848049-b4f71413cc30?auto=format&fit=crop&w=1200&q=80"
              alt="Wedding design philosophy"
              className="editorial-img-main"
            />
          </div>
          <div className="editorial-text-side">
            <span className="section-label">Our Philosophy</span>
            <span className="gold-line gold-line-left" />
            <h2>Artistry In Every Detail</h2>
            <p>
              We believe a wedding should be a sensory experience. Our editorial approach to design
              ensures that every element — from the scent of the flowers to the transition of the
              lighting — contributes to a cohesive and breathtaking narrative. We curate the entire
              guest journey with a focus on high-end entertainment and immersive tablescapes.
            </p>
            <ul className="editorial-details-list">
              <li>Custom Flowers</li>
              <li>Atmospheric Lighting</li>
              <li>Bespoke Tablescapes</li>
              <li>Curated Entertainment</li>
              <li>Guest Journey Management</li>
              <li>Ceremony Styling</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══════════ WEDDING THEMES ══════════ */}
      <section className="section-padding container reveal">
        <div className="wedding-section-header">
          <span className="section-label">Inspiration</span>
          <span className="gold-line" />
          <h2>Wedding Themes & Inspiration</h2>
          <p>Discover themes that resonate with Morocco's soul and your personal style.</p>
        </div>
        <div className="themes-inspiration-grid">
          {themes.map((t, i) => (
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
            <h2 style={{ color: '#fff' }}>The Full Planning Scope</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>A comprehensive approach to your celebration.</p>
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
            <span className="section-label">FAQ</span>
            <span className="gold-line" />
            <h2>Frequently Asked Questions</h2>
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
          <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>Ready?</span>
          <h2>Plan Your Wedding</h2>
          <p>Let's start crafting your extraordinary celebration in Morocco today.</p>
          <Link to="/contact" className="btn-primary">
            Plan Your Wedding <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Wedding;

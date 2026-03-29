import React, { useState, useEffect } from 'react';
import HeaderVideo from '../components/HeaderVideo';
import { X } from 'lucide-react';

// Form Integration
import { submitForm } from '../utils/formHandler';

// Imports
import eventsHero from '../assets/video/wedding-hero.mp4';
import corporateImg from '../assets/images/events/corporate.jpg';
import festivalsImg from '../assets/images/events/festivals.jpg';
import birthdayImg from '../assets/images/events/birthday.jpg';
import bachelorImg from '../assets/images/events/bachelor.jpg';
import editorialImg from '../assets/images/events/editorial.jpg';
import retreatsImg from '../assets/images/events/retreats.jpg';

// ─── Data ───────────────────────────────────────────────────────────────────

interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  description: string;
  highlights: string[];
}

const eventsData: EventItem[] = [
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Prestigious Gatherings & Galas',
    img: corporateImg,
    description:
      'Elevate your brand with meticulously planned corporate events in the heart of Marrakech. From high-profile product launches and executive retreats to team-building galas and award ceremonies, we secure the most prestigious venues and deliver flawless execution that leaves a lasting impression on your guests and stakeholders.',
    highlights: ['Luxury venue sourcing', 'AV & technical support', 'Catering & fine dining', 'Team-building experiences'],
  },
  {
    id: 'festivals',
    title: 'Festivals',
    subtitle: 'Large-Scale Cultural Celebrations',
    img: festivalsImg,
    description:
      'Bring a vision to life at scale. Whether it is a cultural festival, a music gathering, or a brand-activation event, we handle everything from stage design and artist coordination to crowd management and on-site logistics — creating an unforgettable atmosphere for hundreds or thousands of guests.',
    highlights: ['Stage & production design', 'Artist & performer booking', 'Security & crowd management', 'Full logistical coordination'],
  },
  {
    id: 'birthday',
    title: 'Birthday & Private Events',
    subtitle: 'Intimate Celebrations Done Right',
    img: birthdayImg,
    description:
      'Your milestone deserves a celebration as unique as you are. Whether you are marking a milestone birthday or hosting an intimate private gathering, we craft personalised themes, curate exclusive entertainment, and create an atmosphere of refined elegance — all tailored to your personality and vision.',
    highlights: ['Bespoke theming & décor', 'Custom entertainment', 'Personalised menus', 'Hidden venue access'],
  },
  {
    id: 'bachelor',
    title: 'Bachelor Party',
    subtitle: 'The Ultimate Pre-Wedding Experience',
    img: bachelorImg,
    description:
      'Send off the groom (or bride) in style. Marrakech offers a thrilling playground for the ultimate bachelor or bachelorette experience. From exclusive rooftop parties and desert adventures to private hammam rituals and VIP nightlife, we design an unforgettable final chapter before the big day.',
    highlights: ['VIP nightlife access', 'Desert adventures', 'Private hammam rituals', 'Exclusive rooftop parties'],
  },
  {
    id: 'editorial',
    title: 'Editorial & Influencers',
    subtitle: 'Content-Ready Luxury Experiences',
    img: editorialImg,
    description:
      'Partner with us to create visually stunning, content-rich experiences that tell your story. From luxury influencer retreats and editorial photo shoots to brand campaigns set against the breathtaking backdrop of Marrakech, we provide production support, exclusive locations, and on-ground logistics so your content is nothing short of spectacular.',
    highlights: ['Exclusive location scouting', 'Production support', 'Brand partnerships', 'Influencer retreats'],
  },
  {
    id: 'retreats',
    title: 'Retreats',
    subtitle: 'Restorative & Transformative Escapes',
    img: retreatsImg,
    description:
      'Reconnect, recharge, and rediscover. Our wellness and leadership retreats combine the mystical energy of Morocco with world-class amenities. From sunrise yoga in a private riad to guided meditation in the Atlas Mountains, each retreat is thoughtfully curated to foster personal growth, team cohesion, and deep relaxation.',
    highlights: ['Wellness & yoga programmes', 'Leadership workshops', 'Atlas Mountain excursions', 'Private riad settings'],
  },
];

const eventSubOptions: Record<string, string[]> = {
  Wedding: ['Traditional Ceremony', 'Destination Wedding', 'Intimate Wedding', 'Grand Celebration'],
  Events: [
    'Corporate Events',
    'Festivals',
    'Birthday & Private Events',
    'Bachelor Party',
    'Editorial & Influencers',
    'Retreats',
  ],
};

// ─── Reservation Modal ───────────────────────────────────────────────────────

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedEvent: string;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, preselectedEvent }) => {
  const [category, setCategory] = useState<'Wedding' | 'Events'>('Events');
  const [subOption, setSubOption] = useState(preselectedEvent);
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    preferred_date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setCategory('Events');
      setSubOption(preselectedEvent);
      setSubmitStatus('idle');
      setFormData({ contact_name: '', contact_email: '', contact_phone: '', preferred_date: '', message: '' });
    }
  }, [isOpen, preselectedEvent]);

  if (!isOpen) return null;

  const handleCategoryChange = (val: 'Wedding' | 'Events') => {
    setCategory(val);
    setSubOption(eventSubOptions[val][0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const submissionData = {
      ...formData,
      service_type: `${category}: ${subOption}`
    };
    
    const result = await submitForm(submissionData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 3000);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="events-modal-overlay" onClick={onClose}>
      <div className="events-reservation-modal" onClick={e => e.stopPropagation()}>
        <button className="events-modal-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        {submitStatus === 'success' ? (
          <div className="events-success-state">
            <div className="events-success-icon">✓</div>
            <h3>Request Received!</h3>
            <p>Thank you, Oussama. Our team will contact you within 24 hours to confirm your {category.toLowerCase()} details.</p>
            <button className="events-btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="events-res-header">
              <span className="events-res-pill">Book Your Event</span>
              <h2>Make a Reservation</h2>
              <p>Fill in your details and we'll get back to you shortly.</p>
            </div>

            <form className="events-res-form" onSubmit={handleSubmit}>
              <div className="events-form-row">
                <div className="events-form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="contact_name"
                    placeholder="Your Name" 
                    required 
                    value={formData.contact_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="events-form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="contact_email"
                    placeholder="email@example.com" 
                    required 
                    value={formData.contact_email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="events-form-row">
                <div className="events-form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="contact_phone"
                    placeholder="+1 (555) 000-0000" 
                    required 
                    value={formData.contact_phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="events-form-group">
                  <label>Preferred Date</label>
                  <input 
                    type="date" 
                    name="preferred_date"
                    required
                    value={formData.preferred_date}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="events-form-group">
                <label>Service Type</label>
                <select
                  value={category}
                  onChange={e => handleCategoryChange(e.target.value as 'Wedding' | 'Events')}
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Events">Events</option>
                </select>
              </div>

              <div className="events-form-group">
                <label>{category === 'Wedding' ? 'Wedding Type' : 'Event Type'}</label>
                <select value={subOption} onChange={e => setSubOption(e.target.value)}>
                  {eventSubOptions[category].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="events-form-group">
                <label>Additional Notes</label>
                <textarea 
                  name="message"
                  placeholder="Tell us more about your event vision..." 
                  rows={3} 
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              {submitStatus === 'error' && <p style={{color: 'red', fontSize: '0.8rem', marginBottom: '10px'}}>Error sending request. Please try again.</p>}
              
              <button 
                type="submit" 
                className="events-btn-primary events-btn-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending Request...' : 'Send Reservation Request'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Event Detail Modal ──────────────────────────────────────────────────────

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onReserve: (eventTitle: string) => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose, onReserve }) => {
  if (!event) return null;

  return (
    <div className="events-modal-overlay" onClick={onClose}>
      <div className="events-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="events-modal-close" onClick={onClose} aria-label="Close">
          <X size={22} />
        </button>

        <div className="events-detail-img-wrap">
          <img src={event.img} alt={event.title} className="events-detail-img" />
          <div className="events-detail-img-overlay">
            <span className="events-res-pill">{event.subtitle}</span>
            <h2>{event.title}</h2>
          </div>
        </div>

        <div className="events-detail-body">
          <p className="events-detail-desc">{event.description}</p>

          <div className="events-highlights">
            <h4>What's Included</h4>
            <ul className="events-highlights-list">
              {event.highlights.map(h => (
                <li key={h}>
                  <span className="events-check">✦</span> {h}
                </li>
              ))}
            </ul>
          </div>

          <button
            className="events-btn-primary events-btn-full"
            onClick={() => onReserve(event.title)}
          >
            Reserve This Event
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Events Page ────────────────────────────────────────────────────────

const Events: React.FC = () => {
  const [detailEvent, setDetailEvent] = useState<EventItem | null>(null);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [preselectedEvent, setPreselectedEvent] = useState('Corporate Events');

  const handleReserve = (eventTitle: string) => {
    setDetailEvent(null);
    setPreselectedEvent(eventTitle);
    setReservationOpen(true);
  };

  return (
    <div className="page-events">
      <HeaderVideo
        videoUrl={eventsHero}
        title="Our Events"
        subtitle="Crafting Extraordinary Experiences Across Every Occasion"
      />

      {/* Intro */}
      <section className="events-intro section-padding">
        <div className="container">
          <span className="events-section-pill">What We Offer</span>
          <h2 className="events-intro-title">Six Pillars of Excellence</h2>
          <p className="events-intro-sub">
            From intimate private gatherings to large-scale festivals, our team brings an unmatched
            level of creativity, precision, and luxury to every event we curate in Marrakech and beyond.
          </p>
        </div>
      </section>

      {/* Event Sections */}
      <section className="events-sections-wrapper">
        {eventsData.map((evt, idx) => (
          <div
            key={evt.id}
            className={`events-section-row ${idx % 2 !== 0 ? 'events-section-row--reverse' : ''}`}
            onClick={() => setDetailEvent(evt)}
          >
            {/* Image Side */}
            <div className="events-section-img-side">
              <div className="events-section-img-wrap">
                <img src={evt.img} alt={evt.title} className="events-section-img" />
                <div className="events-section-img-overlay" />
                <span className="events-section-number">0{idx + 1}</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="events-section-content-side">
              <div className="events-section-content">
                <span className="events-section-tag">{evt.subtitle}</span>
                <h3 className="events-section-title">{evt.title}</h3>
                <p className="events-section-desc">{evt.description.slice(0, 180)}…</p>
                <ul className="events-section-highlights">
                  {evt.highlights.map(h => (
                    <li key={h}><span className="events-check">✦</span> {h}</li>
                  ))}
                </ul>
                <button
                  className="events-btn-outline"
                  onClick={e => { e.stopPropagation(); setDetailEvent(evt); }}
                >
                  Discover More
                  <span className="events-btn-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Banner */}
      <section className="events-cta-banner">
        <div className="events-cta-content">
          <h2>Ready to Create Something Extraordinary?</h2>
          <p>Let's bring your vision to life. Contact our team today.</p>
          <button className="events-btn-primary" onClick={() => { setPreselectedEvent('Corporate Events'); setReservationOpen(true); }}>
            Book a Consultation
          </button>
        </div>
      </section>

      {/* Modals */}
      <EventDetailModal
        event={detailEvent}
        onClose={() => setDetailEvent(null)}
        onReserve={handleReserve}
      />
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        preselectedEvent={preselectedEvent}
      />
    </div>
  );
};

export default Events;

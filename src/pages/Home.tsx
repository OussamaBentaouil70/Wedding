import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderVideo from '../components/HeaderVideo';
import Modal from '../components/Modal';

// Form Integration
import { submitForm } from '../utils/formHandler';

// Imports
import homeHero from '../assets/video/wedding-hero.mp4';
import slider1 from '../assets/images/wedding/traditional.jpg';
import slider2 from '../assets/images/wedding/modern.jpg';
import slider3 from '../assets/images/wedding/bohemian.jpg';
import desertImg from '../assets/images/gallery/sahara.jpg';
import cityImg from '../assets/images/gallery/imperial-city.jpg';
import coastImg from '../assets/images/gallery/atlantic-coast.jpg';
import gastronomyImg from '../assets/images/gallery/gastronomy.jpg';
import wellnessImg from '../assets/images/gallery/wellness.jpg';
import artImg from '../assets/images/gallery/art-design.jpg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', text: ''});

  // Contact Form State
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    service_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const sliderImages = [
    slider1,
    slider2,
    slider3
  ];

  const menuItems = [
    { title: 'Exquisite Planning', text: 'We coordinate every element, from florists to entertainment.' },
    { title: 'Venue Scouting', text: 'Access to exclusive palaces, deserts, and riads.' },
    { title: 'Guest Management', text: 'Seamless logistics for all your distinguished guests from arrival to departure.' }
  ];

  const destinations = [
    { title: 'Sahara Desert', subtitle: 'Signature Journey', path: '/details/desert', img: desertImg },
    { title: 'Imperial Cities', subtitle: 'Cultural Escape', path: '/details/city', img: cityImg },
    { title: 'Atlantic Coast', subtitle: 'Slow Travel', path: '/details/coast', img: coastImg },
    { title: 'Gastronomy', subtitle: 'Culinary Experience', path: '/details/gastronomy', img: gastronomyImg },
    { title: 'Wellness', subtitle: 'Rejuvenation', path: '/details/wellness', img: wellnessImg },
    { title: 'Art & Design', subtitle: 'Creative Journey', path: '/details/art', img: artImg }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImgIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (item: any) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      setFormData({ contact_name: '', contact_email: '', contact_phone: '', service_type: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="page-home">
      <HeaderVideo 
        videoUrl={homeHero} 
        title="Marrakech Weddings" 
        subtitle="A Seamless Journey, From Vision to Reality" 
      />
      
      {/* About Company Section - Custom Style */}
      <section className="about-section">
        <div className="about-content reveal container">
          
          <div className="about-left-col">
            <div className="about-pill">• Who We Are</div>
            <h2>25+<br/>Years</h2>
            <p>Designing Bespoke Journeys</p>
          </div>

          <div className="about-right-col">
            <div className="about-main-text">
              Marrakech Weddings is a luxury design agency specializing in immersive, high-end celebrations across Morocco and beyond. We combine local expertise with international standards to create meaningful, unforgettable experiences.
            </div>
            <div className="about-sub-content">
              <div className="about-sub-title">• Travel Beyond the Ordinary</div>
              <div className="about-sub-desc">
                From private desert camps and exclusive riads to cultural encounters and off-the-map adventures, we craft weddings and events that reveal the soul of each destination — with elegance, comfort, and intention.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Seamless Journey Section */}
      <section className="journey-dark-section">
        <div className="container">
          <div className="journey-header reveal">
            <div className="journey-header-left">
              <button className="process-pill">• Our Process</button>
            </div>
            <div className="journey-header-right">
              <h2>A Seamless Journey,<br/>From Vision to Reality</h2>
            </div>
          </div>
        
          <div className="journey-dark-grid">
            <div className="journey-dark-card reveal delay-100">
              <span className="step-number">01</span>
              <h3>Discover</h3>
              <p>We begin with a personal consultation to understand your travel style, expectations, and aspirations.</p>
            </div>
            <div className="journey-dark-card reveal delay-200">
              <span className="step-number">02</span>
              <h3>Design</h3>
              <p>Our experts craft a bespoke itinerary, selecting exceptional locations, experiences, and accommodations.</p>
            </div>
            <div className="journey-dark-card reveal delay-300">
              <span className="step-number">03</span>
              <h3>Experience</h3>
              <p>Enjoy a perfectly orchestrated journey with discreet support and attention to every detail.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Split Feature: Image Slider & Menu Modal */}
      <section className="feature-split">
        <div className="feature-slider">
          {sliderImages.map((src, idx) => (
            <img 
              key={idx} 
              src={src} 
              className={`feature-slider-img ${idx === activeImgIndex ? 'active' : ''}`} 
              alt={`Slider ${idx}`} 
            />
          ))}
        </div>
        <div className="feature-menu">
          {menuItems.map((item, idx) => (
            <div key={idx} className="feature-menu-item" onClick={() => openModal(item)}>
              {item.title}
            </div>
          ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        <p style={{fontSize: '1.2rem', color: 'var(--color-text-light)'}}>{modalContent.text}</p>
        <button className="btn-primary" style={{marginTop: '30px'}} onClick={() => navigate('/contact')}>Plan with Us</button>
      </Modal>

      {/* Experience Banner */}
      <section className="experience-banner" style={{backgroundImage: `url(${slider1})`}}>
        <div className="experience-content reveal">
          <h2>An Unforgettable Experience</h2>
          <p style={{fontSize: '1.2rem'}}>Our clients continuously praise our dedication to perfection, turning their grandest visions into seamless realities.</p>
        </div>
      </section>

      {/* Destinations & Journeys */}
      <section className="section-padding container">
        <h2 className="reveal" style={{fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center'}}>Explore Morocco</h2>
        <div className="destinations-grid reveal delay-100">
          {destinations.map((dest, idx) => (
            <div key={idx} className="destination-card" onClick={() => navigate(dest.path)}>
              <img src={dest.img} alt={dest.title} className="destination-img" />
              <div className="destination-overlay">
                <h3 className="destination-title">{dest.title}</h3>
                <span className="destination-subtitle">{dest.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* Partners section Placeholder */}
      <section className="section-padding container reveal" style={{textAlign: 'center'}}>
         <h2>Our Prestige Partners</h2>
         <div style={{display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px', opacity: 0.5}}>
            <h3>Vogue</h3>
            <h3>Ritz-Carlton</h3>
            <h3>Four Seasons</h3>
         </div>
      </section>

      {/* Contact Us Section - Moved to End */}
      <section className="section-padding home-contact-section">
        <div className="container">
          <div className="contact-grid reveal">
            <div className="contact-image-col">
              <img src={cityImg} alt="Marrakech Medina" className="home-contact-img" />
              <div className="contact-image-overlay">
                <span className="contact-pill">Get in Touch</span>
                <h3>Start Your Journey In Marrakech</h3>
                <p>From the heart of the Medina to the silence of the Sahara, let us craft your story.</p>
              </div>
            </div>
            <div className="contact-form-col">
              <div className="contact-form-header">
                <h2>Contact Us</h2>
                <p>Tell us about your upcoming celebration.</p>
              </div>

              {submitStatus === 'success' ? (
                <div className="form-success-message" style={{textAlign: 'center', padding: '40px 0'}}>
                   <h3 style={{color: 'var(--color-primary)', marginBottom: '10px'}}>Message Sent!</h3>
                   <p>Thank you, Oussama. We will contact you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-row">
                    <div className="form-group">
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
                    <div className="form-group">
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
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      name="contact_phone"
                      placeholder="+1 (555) 000-0000" 
                      value={formData.contact_phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Service Interested In</label>
                    <select 
                      name="service_type"
                      value={formData.service_type}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="Wedding Planning">Wedding Planning</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="Private Celebration">Private Celebration</option>
                      <option value="Editorial & Influencers">Editorial & Influencers</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Your Vision</label>
                    <textarea 
                      name="message"
                      placeholder="Tell us more about your ideas..." 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  {submitStatus === 'error' && <p style={{color: 'red', fontSize: '0.8rem'}}>Something went wrong. Please try again.</p>}
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{width: '100%'}}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

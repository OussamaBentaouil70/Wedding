import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderVideo from '../components/HeaderVideo';
import Modal from '../components/Modal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', text: ''});

  const sliderImages = [
    'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80'
  ];

  const menuItems = [
    { title: 'Exquisite Planning', text: 'We coordinate every element, from florists to entertainment.' },
    { title: 'Venue Scouting', text: 'Access to exclusive palaces, deserts, and riads.' },
    { title: 'Guest Management', text: 'Seamless logistics for all your distinguished guests from arrival to departure.' }
  ];

  const destinations = [
    { title: 'Sahara Desert', subtitle: 'Signature Journey', path: '/details/desert', img: 'https://images.unsplash.com/photo-1547395027-6f02c6b412bf?auto=format&fit=crop&q=80' },
    { title: 'Imperial Cities', subtitle: 'Cultural Escape', path: '/details/city', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80' },
    { title: 'Atlantic Coast', subtitle: 'Slow Travel', path: '/details/coast', img: 'https://images.unsplash.com/photo-1579560410091-c11dfc2e5058?auto=format&fit=crop&q=80' },
    { title: 'Gastronomy', subtitle: 'Culinary Experience', path: '/details/gastronomy', img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80' },
    { title: 'Wellness', subtitle: 'Rejuvenation', path: '/details/wellness', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80' },
    { title: 'Art & Design', subtitle: 'Creative Journey', path: '/details/art', img: 'https://images.unsplash.com/photo-1544070014-998f41da0204?auto=format&fit=crop&q=80' }
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

  return (
    <div className="page-home">
      <HeaderVideo 
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-in-a-forest-4796-large.mp4" 
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
      <section className="experience-banner" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80)'}}>
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

    </div>
  );
};

export default Home;

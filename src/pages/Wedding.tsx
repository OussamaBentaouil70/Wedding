import React, { useState } from 'react';
import HeaderVideo from '../components/HeaderVideo';
import Modal from '../components/Modal';

const Wedding: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  const weddingStyles = [
    {
      title: 'Traditional Moroccan',
      img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80',
      text: 'Experience the magic of authentic Moroccan traditions. From the intricate zellige tiles to vibrant fabrics, mesmerizing Ahwash performers, and the traditional Amariya entrance. We handle every detail, ensuring your celebration is culturally rich, awe-inspiring, and effortlessly elegant.'
    },
    {
      title: 'Modern Luxury',
      img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
      text: 'Sleek, sophisticated, and absolutely breathtaking. Our Modern Luxury weddings merge contemporary design with Morocco’s beautiful landscapes. Expect minimalist chic decor, crystal-clear marquees under the stars, premium international entertainment, and a dining experience curated by world-class chefs.'
    },
    {
      title: 'Desert Bohemian',
      img: 'https://images.unsplash.com/photo-1547395027-6f02c6b412bf?auto=format&fit=crop&q=80',
      text: 'Escape to the breathtaking Agafay desert or the deep Sahara. Our Desert Bohemian weddings offer a romantic, starry backdrop with luxury glamping, rustic-chic decor, acoustic desert bands, and an atmosphere of pure freedom and romance that cannot be replicated anywhere else.'
    }
  ];

  const openModal = (style: any) => {
    setModalContent(style);
    setIsModalOpen(true);
  };

  const scrollToReservation = () => {
    setIsModalOpen(false);
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-wedding">
      <HeaderVideo 
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-in-a-forest-4796-large.mp4" 
        title="Our Weddings" 
        subtitle="From Traditional Moroccan to Modern Elegance" 
      />
      <section className="section-padding container focus-section reveal">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>Wedding Styles</h2>
        <div className="styles-grid">
           {weddingStyles.map((style, idx) => (
             <div 
               key={idx} 
               className="style-card" 
               style={{ backgroundImage: `url(${style.img})`, cursor: 'pointer' }}
               onClick={() => openModal(style)}
             >
               <h3>{style.title}</h3>
             </div>
           ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '30px', lineHeight: '1.8' }}>
          {modalContent.text}
        </p>
        <button className="btn-primary" onClick={scrollToReservation}>
          Book This Experience
        </button>
      </Modal>
    </div>
  );
};

export default Wedding;

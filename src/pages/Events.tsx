import React, { useState } from 'react';
import HeaderVideo from '../components/HeaderVideo';
import Modal from '../components/Modal';

const Events: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  const events = [
    {
      title: 'Private Parties',
      img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80',
      text: 'Celebrate life’s finest moments in absolute privacy and extreme luxury. Whether it is an intimate birthday gathering in a hidden Riad or a grand anniversary bash in a desert palace, we ensure exclusivity, bespoke themes, tailor-made entertainment, and memories that will last a lifetime.'
    },
    {
      title: 'Corporate Galas',
      img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80',
      text: 'Impress your team and clients with meticulously planned corporate retreats, galas, and launch events. We secure the most prestigious venues in Marrakech, providing high-end audio-visual support, luxurious dining, and engaging team-building experiences throughout Morocco.'
    }
  ];

  const openModal = (evt: any) => {
    setModalContent(evt);
    setIsModalOpen(true);
  };

  const scrollToReservation = () => {
    setIsModalOpen(false);
    document.getElementById('reservation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="page-events">
      <HeaderVideo 
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-in-a-forest-4796-large.mp4"
        title="Exclusive Events" 
        subtitle="Corporate, Private, and Bespoke Celebrations" 
      />
      <section className="section-padding container focus-section reveal">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', textAlign: 'center' }}>Event Offerings</h2>
        <div className="styles-grid">
           {events.map((evt, idx) => (
             <div 
               key={idx} 
               className="style-card" 
               style={{ backgroundImage: `url(${evt.img})`, cursor: 'pointer' }}
               onClick={() => openModal(evt)}
             >
               <h3>{evt.title}</h3>
             </div>
           ))}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={modalContent.title}>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', marginBottom: '30px', lineHeight: '1.8' }}>
          {modalContent.text}
        </p>
        <button className="btn-primary" onClick={scrollToReservation}>
          Plan Your Event
        </button>
      </Modal>
    </div>
  );
};

export default Events;

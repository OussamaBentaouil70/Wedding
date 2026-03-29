import React from 'react';
import { useParams } from 'react-router-dom';
import HeaderVideo from '../components/HeaderVideo';
import ReservationForm from '../components/ReservationForm';

const DetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Determine placeholder content based on route
  const getPageInfo = () => {
    switch (id) {
      case 'desert':
        return { title: 'Sahara Desert Luxury Expedition', subtitle: 'Signature Journey', img: 'https://images.unsplash.com/photo-1547395027-6f02c6b412bf?auto=format&fit=crop&q=80' };
      case 'city':
        return { title: 'Imperial Cities & Hidden Riads', subtitle: 'Cultural Escape', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80' };
      case 'coast':
        return { title: 'Morocco’s Atlantic Coast', subtitle: 'Slow Travel & Seaside Retreats', img: 'https://images.unsplash.com/photo-1579560410091-c11dfc2e5058?auto=format&fit=crop&q=80' };
      case 'gastronomy':
        return { title: 'Moroccan Gourmet Discovery Tour', subtitle: 'Culinary Experience', img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80' };
      case 'wellness':
        return { title: 'Wellness Retreats & Hammam Escapes', subtitle: 'Rejuvenation', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80' };
      case 'art':
        return { title: 'Art, Design & Artisan Heritage', subtitle: 'Creative Journey', img: 'https://images.unsplash.com/photo-1544070014-998f41da0204?auto=format&fit=crop&q=80' };
      case 'traditional':
        return { title: 'Traditional Moroccan Weddings', subtitle: 'Cultural and Authentic', img: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80' };
      case 'modern':
        return { title: 'Modern Luxury Elegance', subtitle: 'Sophisticated and Chic', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80' };
      default:
        return { title: 'Experience Details', subtitle: 'A Bespoke Journey', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80' };
    }
  };

  const info = getPageInfo();

  return (
    <div className="page-detail">
      <HeaderVideo 
        title={info.title} 
        subtitle={info.subtitle} 
      />
      <div className="container detail-content-grid section-padding">
        <div className="detail-article">
           <img src={info.img} alt={info.title} className="detail-hero-image" />
           <p className="detail-text">
             Immerse yourself in our {info.title}. Every detail is meticulously planned to provide a breathtaking and flawless experience. Our dedicated team of experts works tirelessly to bring your vision to absolute reality, blending authentic Moroccan charm with world-class luxury standards.
           </p>
           <p className="detail-text">
             From venue selection to the finest culinary experiences, design aesthetics, and guest management, our holistic approach ensures your event is nothing short of spectacular. Reach out to secure dates and explore available packages.
           </p>
        </div>
        <div className="detail-sidebar">
           <ReservationForm />
        </div>
      </div>
    </div>
  );
};

export default DetailView;

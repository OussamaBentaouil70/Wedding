import React, { useEffect, useMemo, useState } from 'react';
import HeaderVideo from '../components/HeaderVideo';
import { ChevronLeft, ChevronRight, MessageCircle, FileText, CheckCircle, Calendar, Gift, Users, X } from 'lucide-react';
import { galleryCollections } from '../data/imageCollections';

// Imports
import galleryHero from '../assets/video/wedding-hero.mp4';

const Gallery: React.FC = () => {
  const [activeCollectionIndex, setActiveCollectionIndex] = useState<number | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeCollection = useMemo(
    () => (activeCollectionIndex === null ? null : galleryCollections[activeCollectionIndex]),
    [activeCollectionIndex]
  );

  const activeImages = activeCollection?.images ?? [];
  const activeImage = activeImages[activeImageIndex] ?? '';

  const openCollectionImage = (collectionIndex: number, imageIndex: number) => {
    setActiveCollectionIndex(collectionIndex);
    setActiveImageIndex(imageIndex);
  };

  const closeModal = () => {
    setActiveCollectionIndex(null);
    setActiveImageIndex(0);
  };

  const goToImage = (direction: -1 | 1) => {
    if (!activeImages.length) return;
    setActiveImageIndex((current) => (current + direction + activeImages.length) % activeImages.length);
  };

  useEffect(() => {
    if (activeCollectionIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
      if (event.key === 'ArrowLeft') goToImage(-1);
      if (event.key === 'ArrowRight') goToImage(1);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCollectionIndex, activeImages.length]);

  const processSteps = [
    { icon: <MessageCircle size={32} />, title: 'Consultation', text: 'Initial meeting to determine your unique wedding style and fundamental desires.' },
    { icon: <FileText size={32} />, title: 'Étude', text: 'Venue search based on your criteria including capacity, location, and precise budget.' },
    { icon: <CheckCircle size={32} />, title: 'Sélection', text: 'Choosing the absolute best vendors—from catering and photographers to florists and negafas.' },
    { icon: <Calendar size={32} />, title: 'Organisation', text: 'Scouting weekends, venue visits, menu tastings, and comprehensive vendor meetings.' },
    { icon: <Gift size={32} />, title: 'Création & Cadeaux', text: 'Design of Save the Dates, bespoke invitations, table plans, and personalized guest gifts.' },
    { icon: <Users size={32} />, title: 'Coordination', text: 'Full management and discrete coordination of all vendors on your magical D-Day.' }
  ];

  return (
    <div className="page-gallery">
      <HeaderVideo 
        videoUrl={galleryHero}
        title="L'Expérience" 
        subtitle="De A à Z... Marrakech est la destination pour célébrer le plus beau moment de votre vie." 
      />
      
      {/* De A à Z Section */}
      <section className="section-padding container text-center" style={{ maxWidth: '900px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>De A à Z...</h2>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-light)', lineHeight: '1.8' }}>
          Marrakech Weddings s’occupe de tout. Nous construisons avec vous un budget prévisionnel poste par poste. 
          Nous gérons également le planning des invités (transferts, accueil aéroport, hôtels) pour vous épauler dans la 
          réalisation de votre rêve. Quel que soit votre budget, s’unir à Marrakech c’est la garantie d’avoir le plus beau des mariages.
        </p>
      </section>

      {/* 6-Step Process */}
      <section className="process-section section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px' }}>Notre Processus</h2>
          <div className="process-grid">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-card fade-in">
                <div className="process-icon">{step.icon}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-text">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Galleries */}
      <section className="section-padding container">
        <div className="wedding-section-header">
          <span className="section-label">Gallery</span>
          <span className="gold-line" />
          <h2>Collections by Category</h2>
          <p>Every folder is grouped so the visual archive stays easy to browse.</p>
        </div>

        {galleryCollections.map((collection) => (
          <div key={collection.title} style={{ marginBottom: '72px' }}>
            <div className="wedding-section-header" style={{ marginBottom: '28px' }}>
              <span className="section-label">{collection.title}</span>
              <span className="gold-line" />
              <h2>{collection.title}</h2>
              <p>{collection.subtitle}</p>
            </div>
            <div className="themes-gallery">
              {collection.images.map((img, idx) => (
                <button
                  key={`${collection.title}-${idx}`}
                  type="button"
                  className="theme-card theme-card--button"
                  onClick={() => openCollectionImage(galleryCollections.findIndex((item) => item.title === collection.title), idx)}
                  aria-haspopup="dialog"
                  aria-label={`Open ${collection.title} image ${idx + 1}`}
                >
                  <img src={img} alt={`${collection.title} ${idx + 1}`} className="theme-img" loading="lazy" />
                  <div className="theme-overlay">
                    <h3 className="theme-title">{collection.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {activeCollection && (
        <div
          className="gallery-zoom-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeCollection.title} image viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="gallery-zoom-modal fade-in">
            <button type="button" className="gallery-zoom-close" onClick={closeModal} aria-label="Close image viewer">
              <X size={20} />
            </button>

            <div className="gallery-zoom-media">
              <button type="button" className="gallery-zoom-nav gallery-zoom-nav--left" onClick={() => goToImage(-1)} aria-label="Previous image">
                <ChevronLeft size={22} />
              </button>
              <img src={activeImage} alt={`${activeCollection.title} ${activeImageIndex + 1}`} className="gallery-zoom-image" />
              <button type="button" className="gallery-zoom-nav gallery-zoom-nav--right" onClick={() => goToImage(1)} aria-label="Next image">
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="gallery-zoom-caption">
              <span className="section-label">{activeCollection.title}</span>
              <h3>{activeCollection.subtitle}</h3>
              <p>
                Image {activeImageIndex + 1} of {activeImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;

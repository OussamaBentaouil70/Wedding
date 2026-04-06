import React, { useEffect, useMemo, useState } from 'react';
import HeaderVideo from '../components/HeaderVideo';
import { ChevronLeft, ChevronRight, MessageCircle, FileText, CheckCircle, Calendar, Gift, Users, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { galleryCollections } from '../data/imageCollections';

// Imports
import galleryHero from '../assets/video/Wedding.mp4';

const Gallery: React.FC = () => {
  const { t } = useTranslation();
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

  const processTextSteps = t('gallery_page.process.steps', { returnObjects: true }) as Array<{ title: string; text: string }>;
  const processIcons = [MessageCircle, FileText, CheckCircle, Calendar, Gift, Users];
  const processSteps = processTextSteps.map((step, idx) => {
    const Icon = processIcons[idx] ?? MessageCircle;
    return {
      ...step,
      icon: <Icon size={32} />,
    };
  });

  const collectionKeyByTitle: Record<string, string> = {
    'Birthday & Private Events': 'birthday_private',
    'EVJF - Bachelor Party': 'evjf',
    'Festivals': 'festivals',
    'Retreats': 'retreats',
    'Corporate Events': 'corporate',
    'Weddings': 'weddings',
  };

  const getCollectionSubtitle = (title: string, fallback: string) => {
    const key = collectionKeyByTitle[title];
    if (!key) return fallback;
    const translated = t(`gallery_page.collections.${key}.subtitle`);
    return translated === `gallery_page.collections.${key}.subtitle` ? fallback : translated;
  };

  return (
    <div className="page-gallery">
      <HeaderVideo 
        videoUrl={galleryHero}
        title={t('gallery_page.hero.title')} 
        subtitle={t('gallery_page.hero.subtitle')} 
      />
      
      {/* De A à Z Section */}
      <section id="gallery-intro" className="section-padding container text-center" style={{ maxWidth: '900px' }}>
        <div className="wedding-section-header" style={{ marginBottom: 0 }}>
          <h2>{t('gallery_page.intro.title')}</h2>
          <p>
            {t('gallery_page.intro.text')}
          </p>
        </div>
      </section>

      {/* 6-Step Process */}
      <section id="gallery-process" className="process-section section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px' }}>{t('gallery_page.process.title')}</h2>
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
      <section id="gallery-collections" className="section-padding container">
        <div className="wedding-section-header">
          <span className="section-label">{t('gallery_page.gallery.label')}</span>
          <span className="gold-line" />
          <h2>{t('gallery_page.gallery.title')}</h2>
          <p>{t('gallery_page.gallery.subtitle')}</p>
        </div>

        {galleryCollections.map((collection) => (
          <div key={collection.title} style={{ marginBottom: '72px' }}>
            <div className="wedding-section-header" style={{ marginBottom: '28px' }}>
              <span className="section-label">{collection.title}</span>
              <span className="gold-line" />
              <h2>{collection.title}</h2>
              <p>{getCollectionSubtitle(collection.title, collection.subtitle)}</p>
            </div>
            <div className="themes-gallery">
              {collection.images.map((img, idx) => (
                <button
                  key={`${collection.title}-${idx}`}
                  type="button"
                  className="theme-card theme-card--button"
                  onClick={() => openCollectionImage(galleryCollections.findIndex((item) => item.title === collection.title), idx)}
                  aria-haspopup="dialog"
                  aria-label={t('gallery_page.modal.open_image', { title: collection.title, index: idx + 1 })}
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
          aria-label={t('gallery_page.modal.image_viewer', { title: activeCollection.title })}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div className="gallery-zoom-modal fade-in">
            <button type="button" className="gallery-zoom-close" onClick={closeModal} aria-label={t('gallery_page.modal.close')}>
              <X size={20} />
            </button>

            <div className="gallery-zoom-media">
              <button type="button" className="gallery-zoom-nav gallery-zoom-nav--left" onClick={() => goToImage(-1)} aria-label={t('gallery_page.modal.previous')}>
                <ChevronLeft size={22} />
              </button>
              <img src={activeImage} alt={`${activeCollection.title} ${activeImageIndex + 1}`} className="gallery-zoom-image" />
              <button type="button" className="gallery-zoom-nav gallery-zoom-nav--right" onClick={() => goToImage(1)} aria-label={t('gallery_page.modal.next')}>
                <ChevronRight size={22} />
              </button>
            </div>

            <div className="gallery-zoom-caption">
              <span className="section-label">{activeCollection.title}</span>
              <h3>{activeCollection.subtitle}</h3>
              <p>
                {t('gallery_page.modal.counter', { current: activeImageIndex + 1, total: activeImages.length })}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;

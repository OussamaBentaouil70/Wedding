import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PageHero from '../components/PageHero';
import { resolveJsonImageSrc } from '../utils/imageResolver';

// ─────────────────────────────────────────────────────────
const Events: React.FC = () => {
  const { t } = useTranslation();
  const eventsData: any = t('events_page', { returnObjects: true });

  const heroImages: string[] = (eventsData.heroImages ?? []).map(resolveJsonImageSrc);
  const categories: any[] = (eventsData.categories ?? []).map((category: any) => ({
    ...category,
    img: resolveJsonImageSrc(category.img),
  }));
  const promises: any[] = eventsData.promises ?? [];
  const formats: any[] = (eventsData.formats ?? []).map((format: any) => ({
    ...format,
    img: resolveJsonImageSrc(format.img),
  }));

  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number | null>(null);
  const [activeFormatIdx, setActiveFormatIdx] = useState<number | null>(null);

  const activeCategory = useMemo(
    () => (activeCategoryIdx === null ? null : categories[activeCategoryIdx]),
    [activeCategoryIdx]
  );
  const activeFormat = useMemo(() => (activeFormatIdx === null ? null : formats[activeFormatIdx]), [activeFormatIdx]);

  useEffect(() => {
    if (activeCategoryIdx === null && activeFormatIdx === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategoryIdx(null);
        setActiveFormatIdx(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeCategoryIdx, activeFormatIdx]);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-form');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const firstInput = el.querySelector('input, select, textarea, button') as HTMLElement | null;
    firstInput?.focus?.();
  };

  const closeAllModals = () => {
    setActiveCategoryIdx(null);
    setActiveFormatIdx(null);
  };

  return (
    <div className="page-events">

    {/* ══════════ HERO ══════════ */}
    <PageHero
      images={heroImages}
      label={eventsData.hero.label}
      title={eventsData.hero.title}
      subtitle={eventsData.hero.subtitle}
      defaultService={eventsData.hero.defaultService}
    />

    {/* ══════════ EVENT CATEGORIES ══════════ */}
    <section id="events-categories" className="section-padding container reveal">
      <div className="wedding-section-header">
        <span className="section-label">{eventsData.categoriesSection.label}</span>
        <span className="gold-line" />
        <h2>{eventsData.categoriesSection.title}</h2>
        <p>{eventsData.categoriesSection.subtitle}</p>
      </div>
      <div className="ev-categories-grid">
        {categories.map((cat: any, i: number) => (
          <button
            key={cat.title}
            type="button"
            className="ev-category-card ev-card-button reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
            onClick={() => {
              setActiveFormatIdx(null);
              setActiveCategoryIdx(i);
            }}
            aria-haspopup="dialog"
            aria-expanded={activeCategoryIdx === i}
          >
            <div className="ev-category-img-wrap">
              <img src={cat.img} alt={cat.title} />
            </div>
            <div className="ev-category-body">
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </section>

    {/* ══════════ EVENT PROMISE ══════════ */}
    <section id="events-promise" className="ev-promise-section">
      <div className="ev-promise-bg" />
      <div className="container ev-promise-inner">
        <div className="wedding-section-header reveal">
          <h2 style={{ color: '#fff' }}>{eventsData.promiseSection.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>
            {eventsData.promiseSection.subtitle}
          </p>
        </div>
        <div className="ev-promise-grid">
          {promises.map((p: any, i: number) => (
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
    <section id="events-formats" className="section-padding container reveal">
      <div className="wedding-section-header">
        <span className="section-label">{eventsData.formatsSection.label}</span>
        <span className="gold-line" />
        <h2>{eventsData.formatsSection.title}</h2>
        <p>{eventsData.formatsSection.subtitle}</p>
      </div>
      <div className="ev-formats-grid">
        {formats.map((fmt: any, i: number) => (
          <button
            key={fmt.title}
            type="button"
            className="ev-format-card ev-card-button reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
            onClick={() => {
              setActiveCategoryIdx(null);
              setActiveFormatIdx(i);
            }}
            aria-haspopup="dialog"
            aria-expanded={activeFormatIdx === i}
          >
            <div className="ev-format-img-wrap">
              <img src={fmt.img} alt={fmt.title} />
              <div className="ev-format-overlay">
                <span className="ev-format-tag">{fmt.tag}</span>
                <h3>{fmt.title}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>

    {/* ══════════ CATEGORY MODAL ══════════ */}
    {activeCategory && (
      <div
        className="ev-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`${activeCategory.title} ${t('events_page.ui.details')}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeAllModals();
        }}
      >
        <div className="ev-modal">
          <button type="button" className="ev-modal-close" onClick={closeAllModals} aria-label={t('events_page.ui.close')}>
            <X size={20} />
          </button>

          <div className="ev-modal-grid">
            <div className="ev-modal-img-wrap">
              <img src={activeCategory.img} alt={activeCategory.title} className="ev-modal-img" />
              <div className="ev-modal-img-overlay" />
              <div className="ev-modal-img-title">
                <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{t('events_page.ui.event_category')}</span>
                <h3>{activeCategory.title}</h3>
              </div>
            </div>

            <div className="ev-modal-body">
              <p className="ev-modal-desc">{activeCategory.detail}</p>
              <ul className="ev-modal-highlights">
                {activeCategory.highlights.map((h: string) => (
                  <li key={h}>
                    <span className="ev-modal-bullet">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="ev-modal-cta">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    closeAllModals();
                    scrollToReservation();
                  }}
                >
                  {t('events_page.ui.reserve')} <ArrowRight size={15} />
                </button>
                <button type="button" className="btn-outline" onClick={closeAllModals}>
                  {t('events_page.ui.continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ══════════ FORMAT MODAL ══════════ */}
    {activeFormat && (
      <div
        className="ev-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`${activeFormat.title} ${t('events_page.ui.details')}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeAllModals();
        }}
      >
        <div className="ev-modal">
          <button type="button" className="ev-modal-close" onClick={closeAllModals} aria-label={t('events_page.ui.close')}>
            <X size={20} />
          </button>

          <div className="ev-modal-grid">
            <div className="ev-modal-img-wrap">
              <img src={activeFormat.img} alt={activeFormat.title} className="ev-modal-img" />
              <div className="ev-modal-img-overlay" />
              <div className="ev-modal-img-title">
                <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{t('events_page.formatsSection.label')}</span>
                <h3>{activeFormat.title}</h3>
              </div>
            </div>

            <div className="ev-modal-body">
              <p className="ev-modal-desc">{activeFormat.detail}</p>
              <ul className="ev-modal-highlights">
                {activeFormat.highlights.map((h: string) => (
                  <li key={h}>
                    <span className="ev-modal-bullet">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="ev-modal-cta">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    closeAllModals();
                    scrollToReservation();
                  }}
                >
                  {t('events_page.ui.reserve')} <ArrowRight size={15} />
                </button>
                <button type="button" className="btn-outline" onClick={closeAllModals}>
                  {t('events_page.ui.continue')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* ══════════ CTA ══════════ */}
    <section id="events-cta" className="wedding-cta-final">
      <div className="container">
        <span className="section-label" style={{ color: 'rgba(212,185,138,0.95)' }}>{eventsData.ctaSection.label}</span>
        <h2>{eventsData.ctaSection.title}</h2>
        <p>{eventsData.ctaSection.subtitle}</p>
        <Link to="/contact" className="btn-primary">
          {t('events_page.ui.plan_event')} <ArrowRight size={15} />
        </Link>
      </div>
    </section>

    </div>
  );
};

export default Events;

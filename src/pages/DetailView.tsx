import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeaderVideo from '../components/HeaderVideo';
import ReservationForm from '../components/ReservationForm';

const DetailView: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();

  const detailsCopy: any = t('detail_page', { returnObjects: true });

  const imageById: Record<string, string> = {
    desert: 'https://images.unsplash.com/photo-1547395027-6f02c6b412bf?auto=format&fit=crop&q=80',
    city: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&q=80',
    coast: 'https://images.unsplash.com/photo-1579560410091-c11dfc2e5058?auto=format&fit=crop&q=80',
    gastronomy: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80',
    wellness: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80',
    art: 'https://images.unsplash.com/photo-1544070014-998f41da0204?auto=format&fit=crop&q=80',
    traditional: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80',
    modern: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
  };

  const routeKey = id && detailsCopy.cases?.[id] ? id : 'default';
  const routeData = detailsCopy.cases[routeKey];

  const info = {
    title: routeData.title,
    subtitle: routeData.subtitle,
    img: imageById[routeKey] ?? 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80',
  };

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
             {t('detail_page.body.p1', { title: info.title })}
           </p>
           <p className="detail-text">
             {t('detail_page.body.p2')}
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

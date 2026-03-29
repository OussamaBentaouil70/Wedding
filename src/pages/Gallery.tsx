import React from 'react';
import HeaderVideo from '../components/HeaderVideo';
import { MessageCircle, FileText, CheckCircle, Calendar, Gift, Users } from 'lucide-react';

const Gallery: React.FC = () => {
  const processSteps = [
    { icon: <MessageCircle size={32} />, title: 'Consultation', text: 'Initial meeting to determine your unique wedding style and fundamental desires.' },
    { icon: <FileText size={32} />, title: 'Étude', text: 'Venue search based on your criteria including capacity, location, and precise budget.' },
    { icon: <CheckCircle size={32} />, title: 'Sélection', text: 'Choosing the absolute best vendors—from catering and photographers to florists and negafas.' },
    { icon: <Calendar size={32} />, title: 'Organisation', text: 'Scouting weekends, venue visits, menu tastings, and comprehensive vendor meetings.' },
    { icon: <Gift size={32} />, title: 'Création & Cadeaux', text: 'Design of Save the Dates, bespoke invitations, table plans, and personalized guest gifts.' },
    { icon: <Users size={32} />, title: 'Coordination', text: 'Full management and discrete coordination of all vendors on your magical D-Day.' }
  ];

  const themes = [
    { title: 'Bridesmaid & Groomsman', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80' },
    { title: 'Elopement à la Médina', img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80' },
    { title: 'Mariage dans le Sahara', img: 'https://images.unsplash.com/photo-1547395027-6f02c6b412bf?auto=format&fit=crop&w=600&q=80' },
    { title: 'Pool Party', img: 'https://images.unsplash.com/photo-1579560410091-c11dfc2e5058?auto=format&fit=crop&w=600&q=80' },
    { title: 'Soirée de Veille dans le Désert', img: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=600&q=80' }
  ];

  return (
    <div className="page-gallery">
      <HeaderVideo 
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-in-a-forest-4796-large.mp4"
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

      {/* Themes Gallery */}
      <section className="section-padding container">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textAlign: 'center' }}>Nos Thèmes</h2>
        <div className="themes-gallery">
           {themes.map((theme, idx) => (
             <div key={idx} className="theme-card">
               <img src={theme.img} alt={theme.title} className="theme-img" loading="lazy" />
               <div className="theme-overlay">
                 <h3 className="theme-title">{theme.title}</h3>
               </div>
             </div>
           ))}
        </div>
      </section>

    </div>
  );
};

export default Gallery;

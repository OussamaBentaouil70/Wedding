import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ReservationForm from './ReservationForm';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: observer.unobserve(entry.target); if we only want it to animate once
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const timeoutPath = setTimeout(() => {
      const hiddenElements = document.querySelectorAll('.reveal');
      hiddenElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeoutPath);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <section className="section-padding container reveal" id="reservation" style={{ maxWidth: '800px', margin: '0 auto' }}>
         <h2 style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '40px'}}>Start Planning</h2>
         <ReservationForm />
      </section>
      <Footer />
    </div>
  );
};

export default Layout;

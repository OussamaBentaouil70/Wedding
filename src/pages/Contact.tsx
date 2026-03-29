import React from 'react';
import HeaderVideo from '../components/HeaderVideo';

const Contact: React.FC = () => {
  return (
    <div className="page-contact">
      <HeaderVideo 
        title="Contact Us" 
        subtitle="Let's Plan Your Dream Wedding" 
      />
      <section className="section-padding container contact-section">
         <div className="contact-grid">
            <div className="contact-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '500px'}}></div>
            <div className="contact-form-container">
               <h2>Get in Touch</h2>
               <form className="contact-form">
                  <input type="text" placeholder="Your Name" />
                  <input type="email" placeholder="Your Email" />
                  <textarea placeholder="Your Message" rows={5}></textarea>
                  <button type="button" className="btn-primary">Send Message</button>
               </form>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;

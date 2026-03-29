import React, { useState } from 'react';
import HeaderVideo from '../components/HeaderVideo';

// Form Integration
import { submitForm } from '../utils/formHandler';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    service_type: 'General Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitForm(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({ contact_name: '', contact_email: '', service_type: 'General Inquiry', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else {
      setSubmitStatus('error');
    }
  };
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
               {submitStatus === 'success' ? (
                 <div className="form-success-message" style={{padding: '40px 0'}}>
                   <h3 style={{color: 'var(--color-primary)', marginBottom: '10px'}}>Message Sent!</h3>
                   <p>Thank you, Oussama. We have received your message and will get back to you soon.</p>
                 </div>
               ) : (
                 <form className="contact-form" onSubmit={handleContactSubmit}>
                    <input 
                      type="text" 
                      name="contact_name"
                      placeholder="Your Name" 
                      required 
                      value={formData.contact_name}
                      onChange={handleInputChange}
                    />
                    <input 
                      type="email" 
                      name="contact_email"
                      placeholder="Your Email" 
                      required 
                      value={formData.contact_email}
                      onChange={handleInputChange}
                    />
                    <textarea 
                      name="message"
                      placeholder="Your Message" 
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                    {submitStatus === 'error' && <p style={{color: 'red', fontSize: '0.8rem'}}>Error sending message. Please try again.</p>}
                    <button 
                      type="submit" 
                      className="btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                 </form>
               )}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;

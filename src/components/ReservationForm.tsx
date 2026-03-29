import React, { useState } from 'react';

// Form Integration
import { submitForm } from '../utils/formHandler';

const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    preferred_date: '',
    service_type: '',
    message: 'Reservation request from global form'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await submitForm(formData);
    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({ contact_name: '', contact_email: '', contact_phone: '', preferred_date: '', service_type: '', message: 'Reservation request from global form' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="reservation-form-container">
      <h3>Book Your Consultation</h3>
      <p>Begin your seamless journey with us.</p>
      
      {submitStatus === 'success' ? (
        <div className="form-success-message" style={{padding: '20px 0'}}>
           <h4 style={{color: 'var(--color-primary)'}}>Consultation Requested!</h4>
           <p>Oussama will reach out to you within 24 hours.</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleReservationSubmit}>
          <input 
            type="text" 
            name="contact_name"
            placeholder="Full Name" 
            required 
            value={formData.contact_name}
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            name="contact_email"
            placeholder="Email Address" 
            required 
            value={formData.contact_email}
            onChange={handleInputChange}
          />
          <input 
            type="tel" 
            name="contact_phone"
            placeholder="Phone Number" 
            value={formData.contact_phone}
            onChange={handleInputChange}
          />
          <input 
            type="date" 
            name="preferred_date"
            value={formData.preferred_date}
            onChange={handleInputChange}
          />
          <select 
            name="service_type"
            value={formData.service_type}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Select Event Type</option>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Private Celebration">Private Celebration</option>
          </select>
          {submitStatus === 'error' && <p style={{color: 'red', fontSize: '0.8rem'}}>Error requesting consultation.</p>}
          <button 
            type="submit" 
            className="btn-primary" 
            style={{marginTop: '10px'}}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Requesting...' : 'Request Consultation'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Form Integration
import { submitForm } from '../utils/formHandler';

const ReservationForm: React.FC = () => {
  const { t } = useTranslation();
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
      <h3>{t('reservation_form.title')}</h3>
      <p>{t('reservation_form.subtitle')}</p>
      
      {submitStatus === 'success' ? (
        <div className="form-success-message" style={{padding: '20px 0'}}>
           <h4 style={{color: 'var(--color-primary)'}}>{t('reservation_form.success_title')}</h4>
           <p>{t('reservation_form.success_text')}</p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleReservationSubmit}>
          <input 
            type="text" 
            name="contact_name"
            placeholder={t('reservation_form.full_name')} 
            required 
            value={formData.contact_name}
            onChange={handleInputChange}
          />
          <input 
            type="email" 
            name="contact_email"
            placeholder={t('reservation_form.email')} 
            required 
            value={formData.contact_email}
            onChange={handleInputChange}
          />
          <input 
            type="tel" 
            name="contact_phone"
            placeholder={t('reservation_form.phone')} 
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
            <option value="" disabled>{t('reservation_form.select_event')}</option>
            <option value="Wedding">{t('reservation_form.option_wedding')}</option>
            <option value="Corporate Event">{t('reservation_form.option_corporate')}</option>
            <option value="Private Celebration">{t('reservation_form.option_private')}</option>
          </select>
          {submitStatus === 'error' && <p style={{color: 'red', fontSize: '0.8rem'}}>{t('reservation_form.error')}</p>}
          <button 
            type="submit" 
            className="btn-primary" 
            style={{marginTop: '10px'}}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('reservation_form.requesting') : t('reservation_form.request')}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;

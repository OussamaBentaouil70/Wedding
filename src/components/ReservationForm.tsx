import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Form Integration
import { submitForm } from '../utils/formHandler';

type ReservationOption = {
  value: string;
  label: string;
};

type ReservationFormProps = {
  title?: string;
  subtitle?: string;
  selectPlaceholder?: string;
  requestButtonLabel?: string;
  successTitle?: string;
  successText?: string;
  initialServiceType?: string;
  options?: ReservationOption[];
};

const ReservationForm: React.FC<ReservationFormProps> = ({
  title,
  subtitle,
  selectPlaceholder,
  requestButtonLabel,
  successTitle,
  successText,
  initialServiceType = '',
  options,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const eventOptions = options ?? [
    { value: 'Wedding', label: t('reservation_form.option_wedding') },
    { value: 'Traditional Moroccan Wedding', label: t('reservation_form.option_traditional_moroccan') },
    { value: 'Modern Luxury Wedding', label: t('reservation_form.option_modern_luxury') },
    { value: 'Intimate Elopement', label: t('reservation_form.option_intimate_elopement') },
    { value: 'Multi-Day Wedding Weekend', label: t('reservation_form.option_multi_day_weekend') },
    { value: 'Cultural Fusion Wedding', label: t('reservation_form.option_cultural_fusion') },
    { value: 'Corporate Event', label: t('reservation_form.option_corporate') },
    { value: 'Private Celebration', label: t('reservation_form.option_private') },
  ];
  const [formData, setFormData] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    preferred_date: '',
    service_type: initialServiceType,
    message: 'Reservation request from global form'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      service_type: initialServiceType,
    }));
  }, [initialServiceType]);

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
      setFormData({
        contact_name: '',
        contact_email: '',
        contact_phone: '',
        preferred_date: '',
        service_type: initialServiceType,
        message: 'Reservation request from global form',
      });
      navigate('/thank-you');
    } else {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="reservation-form-container">
      <h3>{title ?? t('reservation_form.title')}</h3>
      <p>{subtitle ?? t('reservation_form.subtitle')}</p>
      
      {submitStatus === 'success' ? (
        <div className="form-success-message" style={{padding: '20px 0'}}>
           <h4 style={{color: 'var(--color-primary)'}}>{successTitle ?? t('reservation_form.success_title')}</h4>
           <p>{successText ?? t('reservation_form.success_text')}</p>
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
            <option value="" disabled>{selectPlaceholder ?? t('reservation_form.select_event')}</option>
            {eventOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {submitStatus === 'error' && <p style={{color: 'red', fontSize: '0.8rem'}}>{t('reservation_form.error')}</p>}
          <button 
            type="submit" 
            className="btn-primary" 
            style={{marginTop: '10px'}}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('reservation_form.requesting') : (requestButtonLabel ?? t('reservation_form.request'))}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReservationForm;

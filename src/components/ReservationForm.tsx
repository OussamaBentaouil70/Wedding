import React from 'react';

const ReservationForm: React.FC = () => {
  return (
    <div className="reservation-form-container">
      <h3>Book Your Consultation</h3>
      <p>Begin your seamless journey with us.</p>
      <form className="contact-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="tel" placeholder="Phone Number" />
        <input type="date" placeholder="Preferred Date" />
        <select defaultValue="">
          <option value="" disabled>Select Event Type</option>
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate Event</option>
          <option value="private">Private Celebration</option>
        </select>
        <button type="button" className="btn-primary" style={{marginTop: '10px'}}>Request Consultation</button>
      </form>
    </div>
  );
};

export default ReservationForm;

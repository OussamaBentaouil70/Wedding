/**
 * Marrakech Weddings - Form Submission Utility (PHP Version)
 * Sends data to our own PHP script for unlimited free emails.
 */

interface FormValues {
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  service_type: string; // used as "Event Type" across the site
  preferred_date?: string; // used as "Estimated Date" across the site
  number_of_guests?: string;
  preferred_location?: string;
  estimated_budget?: string;
  message: string;
}

export const submitForm = async (values: FormValues) => {
  try {
    // Send data to our PHP script through the Vite proxy
    const response = await fetch('/api/send_email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: "Emails sent successfully" };
    } else {
      throw new Error(result.message || "Server Error");
    }
  } catch (error) {
    console.error('PHP Submission Error:', error);
    return { success: false, error: "Oussama, the email could not be sent. Check your hosting/PHP." };
  }
};

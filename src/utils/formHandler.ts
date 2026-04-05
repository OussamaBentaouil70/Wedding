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
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
      || (import.meta.env.PROD ? '/send_email.php' : '/api/send_email.php');

    // In production use real PHP endpoint, in dev use Vite proxy fallback
    const response = await fetch(endpoint, {
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
    const errorMessage = error instanceof Error
      ? error.message
      : "Oussama, the email could not be sent. Check your hosting/PHP.";
    return { success: false, error: errorMessage };
  }
};

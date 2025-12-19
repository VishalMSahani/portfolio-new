# Contact Form API Documentation

This documentation provides details on how to integrate the contact form API from your other websites.

## Base URL
```
https://admin.vishal.it.com
```

---

## Submit Contact Form / Enquiry

### Endpoint
```
POST /api/contact-us
```

### Description
Submit a contact form or enquiry that will be stored in the database and visible in the admin dashboard.

### Headers
| Header | Value | Required |
|--------|-------|----------|
| Content-Type | application/json | Yes |

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullName | string | Yes | Full name of the person submitting the enquiry |
| email | string | Yes | Email address (must be valid format) |
| phone | string | No | Phone number |
| companyName | string | No | Company or organization name |
| services | string[] | Yes | Array of services interested in (at least one required) |
| message | string | Yes | Enquiry message or details |
| referralSource | string | No | How they heard about you (e.g., "Google Search", "Social Media") |
| source | string | Yes | Source identifier for tracking where the form was submitted from (e.g., "main-website", "landing-page-1") |

### Available Services
You can include any of these service values (or define your own):
- SEO
- Social Media Marketing
- Content Marketing
- Email Marketing
- PPC Advertising
- Web Design
- Brand Strategy
- Analytics & Reporting

### Request Example

#### JavaScript (Fetch API)
```javascript
const submitContactForm = async (formData) => {
  try {
    const response = await fetch('https://admin.vishal.it.com/api/contact-us', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        services: formData.services, // Array of strings
        message: formData.message,
        referralSource: formData.referralSource,
        source: formData.source // Required: e.g., "portfolio-website"
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('Success:', data.message);
      return { success: true, data };
    } else {
      console.error('Error:', data.message);
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error occurred' };
  }
};

// Usage Example
submitContactForm({
  fullName: "John Doe",
  email: "john@example.com",
  phone: "+1 555-123-4567",
  companyName: "Acme Inc",
  services: ["SEO", "Social Media Marketing"],
  message: "I'm interested in improving my company's online presence.",
  referralSource: "Google Search",
  source: "portfolio-website"
});
```

#### JavaScript (Axios)
```javascript
import axios from 'axios';

const submitContactForm = async (formData) => {
  try {
    const response = await axios.post('https://admin.vishal.it.com/api/contact-us', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      companyName: formData.companyName,
      services: formData.services,
      message: formData.message,
      referralSource: formData.referralSource,
      source: formData.source,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.message || 'An error occurred' 
    };
  }
};
```

#### cURL
```bash
curl -X POST https://admin.vishal.it.com/api/contact-us \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1 555-123-4567",
    "companyName": "Acme Inc",
    "services": ["SEO", "Social Media Marketing"],
    "message": "I am interested in improving my company online presence.",
    "source": "portfolio-website",
    "referralSource": "Google Search"
  }'
```

#### Python (Requests)
```python
import requests
import json

def submit_contact_form(form_data):
  url = 'https://admin.vishal.it.com/api/contact-us'
    headers = {'Content-Type': 'application/json'}
    
    try:
        response = requests.post(url, headers=headers, json=form_data)
        
        if response.status_code == 200:
            return {'success': True, 'data': response.json()}
        else:
            return {'success': False, 'error': response.json().get('message')}
    except Exception as e:
        return {'success': False, 'error': str(e)}

# Usage
form_data = {
    'fullName': 'John Doe',
    'email': 'john@example.com',
    'phone': '+1 555-123-4567',
    'companyName': 'Acme Inc',
    'services': ['SEO', 'Social Media Marketing'],
  'message': 'I am interested in improving my company online presence.',
  'source': 'portfolio-website',
    'referralSource': 'Google Search'
}

result = submit_contact_form(form_data)
print(result)
```

#### PHP
```php
<?php

function submitContactForm($formData) {
    $url = 'https://admin.vishal.it.com/api/contact-us';
    
    $data = json_encode($formData);
    
    $options = [
        'http' => [
            'header'  => "Content-Type: application/json\r\n",
            'method'  => 'POST',
            'content' => $data
        ]
    ];
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        return ['success' => false, 'error' => 'Request failed'];
    }
    
    return ['success' => true, 'data' => json_decode($result, true)];
}

// Usage
$formData = [
  'fullName' => 'John Doe',
  'email' => 'john@example.com',
  'phone' => '+1 555-123-4567',
  'companyName' => 'Acme Inc',
  'services' => ['SEO', 'Social Media Marketing'],
  'message' => 'I am interested in improving my company online presence.',
  'referralSource' => 'Google Search',
  'source' => 'portfolio-website',
];

$result = submitContactForm($formData);
print_r($result);
?>
```

### Response

#### Success Response (200 OK)
```json
{
  "status": true,
  "message": "Inquiry submitted successfully"
}
```

#### 400 Bad Request
```json
{
  "status": false,
  "message": "Source field is required"
}
```

#### Error Response (500 Internal Server Error)
```json
{
  "status": false,
  "message": "Internal server error while submitting the form"
}
```

### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success - Form submitted successfully (even if email notification fails) |
| 400 | Bad Request - Invalid or missing required fields (e.g., missing source field) |
| 500 | Internal Server Error - Server error occurred while saving to database |
attempted to be sent to the admin email address configured in `ADMIN_RECEIVER_EMAIL` environment variable
- The email includes all form details including the source field in a formatted HTML template
- **Important:** Email failures do not affect form submission - if the email fails to send, the form data is still saved and a success response is returned
- Email errors are logged for debugging purposes

### Source Field Tracking
The required `source` field allows you to track where submissions are coming from:
- Use different source identifiers for different websites (e.g., "main-website", "landing-page-1", "blog")
- This helps you analyze which sites generate the most leads in your dashboard
- Examples: `"main-website"`, `"landing-page-A"`, `"promotional-site"`, `"partner-site-1"`
- Email notifications are sent to the admin on successful submission
- **If email sending fails, the form submission will still succeed** (graceful failure)
- Email errors are logged but do not affect the API response
| 400 | Bad Request - Invalid or missing required fields |
| 500 | Internal Server Error - Server error occurred |

---

## Additional Features

### Email Notifications
When a form is submitted successfully:
- An email notification is sent to the admin email address configured in `ADMIN_RECEIVER_EMAIL` environment variable
- The email includes all form details in a formatted HTML template

### Dashboard Access
All submitted enquiries are accessible through the admin dashboard:
1. Navigate to `/dashboard` (requires authentication)
2. View all messages with search and filter capabilities
3. Export individual or all messages as needed

---

## CORS Configuration

If you're calling this API from a different domain (cross-origin), you may need to configure CORS. Add the following to your Next.js API route if needed:

```javascript
// In your API route file
export async function POST(req: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://your-website-domain.com', // or '*' for all domains
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }
  // Your existing code...
}
```

---

## React Example Component

Here's a complete React component example you can use on your website:

```jsx
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    services: [],
    message: '',
    referralSource: '',
    source: 'portfolio-website',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceOptions = [
    'SEO',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'PPC Advertising',
    'Web Design',
    'Brand Strategy',
    'Analytics & Reporting',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.services.length === 0) {
      setSubmitStatus({ type: 'error', message: 'Please select at least one service' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://admin.vishal.it.com/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          companyName: '',
          services: [],
          message: '',
          referralSource: '',
          source: 'portfolio-website',
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Full Name */}
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        placeholder="Full Name"
        required
      />

      {/* Email */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />

      {/* Phone */}
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />

      {/* Company Name */}
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleInputChange}
        placeholder="Company Name"
      />

      {/* Services */}
      <div>
        <label>Services Interested In:</label>
        {serviceOptions.map((service) => (
          <label key={service}>
            <input
              type="checkbox"
              checked={formData.services.includes(service)}
              onChange={() => handleServiceToggle(service)}
            />
            {service}
          </label>
        ))}
      </div>

      {/* Referral Source */}
      <select
        name="referralSource"
        value={formData.referralSource}
        onChange={handleInputChange}
      >
        <option value="">How did you hear about us?</option>
        <option value="Google Search">Google Search</option>
        <option value="Social Media">Social Media</option>
        <option value="Friend Referral">Friend Referral</option>
        <option value="Advertisement">Advertisement</option>
        <option value="Other">Other</option>
      </select>

      {/* Message */}
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Your Message"
        required
        rows={5}
      />

      {/* Submit Status */}
      {submitStatus && (
        <div className={submitStatus.type}>
          {submitStatus.message}
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default ContactForm;
```

---

## Environment Variables

Ensure the following environment variables are set in your dashboard application:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# Email Configuration (for admin notifications)
ADMIN_RECEIVER_EMAIL=admin@yourdomain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-dashboard-domain.com
```

---

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting to prevent spam submissions
2. **Input Validation**: The API validates email format and required fields
3. **CORS**: Configure CORS appropriately to only allow requests from trusted domains
4. **Honeypot Field**: Consider adding a honeypot field to catch bots
5. **reCAPTCHA**: Consider adding Google reCAPTCHA for additional bot protection

---

## Testing

### Test with cURL
```bash
curl -X POST https://admin.vishal.it.com/api/contact-us \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "services": ["SEO"],
    "message": "This is a test message",
    "source": "test-website"
  }'
```

### Expected Response
```json
{
  "status": true,
  "message": "Inquiry submitted successfully"
}
```

---

## Support

For issues or questions:
- Check the dashboard logs for error details
- Verify environment variables are correctly set
- Ensure MongoDB connection is working
- Check email configuration if notifications aren't sent

---
1.0 (December 18, 2025)
- Added required `source` field for tracking submission origin
- Made email notifications optional (graceful failure)
- Email sending errors no longer prevent successful form submission

### Version 1.0
## Changelog

### Version 1.0.0 (December 18, 2025)
- Initial API release
- POST endpoint for contact form submissions
- Email notifications to admin
- Dashboard integration

Topic - BlueWave
Team members:
Nuraly Nuray -> contact, carousel
Altynay Yertay -> responsive, day/night
Aiat Mergenbai -> API, Authentification
Merey Amahgeldi -> Animations

User Authentication with LocalStorage Implementation Summary
A localStorage-based authentication system was developed to enable user registration, login, session management, and profile handling entirely on the client side.
● The core logic was encapsulated within a modular AuthManager JavaScript class (js/auth.js).
● The main registration and login interface was provided on a new auth.html page featuring a tabbed layout for easy navigation between forms.
● Strong client-side validation was enforced for emails and passwords to enhance user experience and practice basic security principles.
All authentication-related user feedback (success, errors) was handled via the site’s existing notification system for UI consistency.
Data Architecture
  
 ● User records are maintained as an array of objects in localStorage under the bluewave_users key, ensuring unique emails and storing user info securely (with simple hashed passwords for demonstration purposes).
● Session state is tracked with a single object saved as bluewave_current_user, including relevant user metadata but excluding the password for privacy.
User Experience & UI Integration
● The navigation bar dynamically shows login/register or user profile/log out options based on authentication state.
● Once signed in, users see personalized greetings, and session data persists across page reloads and navigation.
● Logout functionality immediately clears session data and updates all related UI components.
Testing & Evaluation
● Registration and login work as expected, preventing duplicate emails and enforcing password requirements.
● Sessions persist properly and are cleared on logout.
● Responsive design was verified; forms and buttons render and function well across screen sizes.
● Error feedback (e.g., invalid credentials, validation errors) is immediate and clear.
Security Notes
● The solution uses only simple hashing and has no server-side validation, so it is not secure for production ().
●
● For a real-world environment, a backend, secure password hashing (e.g., bcrypt), HTTPS, and CSRF protection would be essential.
 
 3. Interactive Map Integration (Google Maps Embed) Implementation Summary
The static map previously showcased on contact.html was replaced with a live Google Maps embed via a simple iframe. This interactive map displays the BlueWave Travel Agency office at “123 Ocean Drive, Miami FL”.
Technical Process
● Obtained a proper Google Maps embed URL for the address.
● Replaced the placeholder <div class="map-placeholder"> structure with the following iframe, keeping container styling for consistency:
xml
<iframe
src="https://www.google.com/maps?q=123+Ocean+Drive,+Miami,+FL&output
=embed"
  width="100%"
  height="450"
  style="border:0;"
  allowfullscreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="BlueWave Travel Office Location - 123 Ocean Drive, Miami
FL">
</iframe>
● Updated the .map-container CSS for responsive behavior, ensuring the iframe scales on mobile and remains accessible ().

●
Testing & Results
● The interactive map now loads quickly, showing the correct office location.
● All expected Google Maps controls (zooming, panning) function as intended.
● The component is mobile-friendly and renders properly in tested browsers (Chrome, Firefox, Edge, Safari).
● Accessibility was improved by setting a meaningful title on the iframe.
Key Takeaways
● No external JavaScript or API keys were needed; the embed works immediately.
● The solution is robust for assignments and portfolio purposes but does have standard privacy and rate-limit considerations for public website
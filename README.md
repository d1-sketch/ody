# ODY Logistics & Transport

A static landing page and booking UI for a logistics and transport service built with HTML, CSS, and vanilla JavaScript.

## What it includes

- Splash screen intro experience
- Home page with service highlights
- Popular rental vehicle listings
- Testimonial section
- Fleet page with filterable vehicle cards
- Booking form UI and booking success state
- Airport pickup and police escort service details

## Files

- `index.html` — main page structure
- `styles.css` — app styling and layout
- `app.js` — frontend logic, UI rendering, and interactions
- `server.js` — Node/Express backend server
- `package.json` — project dependencies and run scripts
- `data/bookings.json` — stored booking submissions
- `data/messages.json` — stored contact messages

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser

## Deploy

This project is already pushed to GitHub:

- `https://github.com/d1-sketch/ody`

To publish as a website with GitHub Pages:

1. Go to the repository Settings → Pages
2. Choose branch `main` and folder `/`
3. Save and wait for the site URL

## Notes

- This project now includes a Node/Express backend
- Bookings are stored in `data/bookings.json`
- Contact messages are stored in `data/messages.json`
- The frontend posts booking and contact form data to `/api/bookings` and `/api/contact`

# ODY Logistics & Transport

A full web app for a logistics and transport service with a static frontend and a Node/Express backend.

## What it includes

- Splash screen intro experience
- Home page with service highlights
- Popular rental vehicle listings
- Testimonials and trust metrics
- Fleet page with filterable car categories
- Booking form backed by `/api/bookings`
- Contact form backed by `/api/contact`
- Local JSON storage for bookings and messages

## Files

- `index.html` — main page structure
- `styles.css` — app styling and layout
- `app.js` — frontend logic, UI rendering, and API integration
- `server.js` — Express backend serving the app and API
- `package.json` — dependencies and run scripts
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

## Backend API

- `GET /api/data` — app data for cars, testimonials, and services
- `POST /api/bookings` — submit a new booking
- `POST /api/contact` — submit a contact message
- `GET /api/bookings` — view stored bookings
- `GET /api/messages` — view stored messages

## Deploy

This project is already pushed to GitHub:

- `https://github.com/d1-sketch/ody`

For local development, use `npm start` and open `http://localhost:3000`.

## Notes

- Bookings and contact messages are persisted in `data/bookings.json` and `data/messages.json`
- The frontend now sends real POST requests to the backend API

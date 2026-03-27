const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const bookingsFile = path.join(dataDir, 'bookings.json');
const messagesFile = path.join(dataDir, 'messages.json');

function ensureDataDirectory() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function loadJson(filePath, fallback = []) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (error) {
    console.error(`Unable to load ${filePath}:`, error);
    return fallback;
  }
}

function saveJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

ensureDataDirectory();
const bookings = loadJson(bookingsFile);
const messages = loadJson(messagesFile);

const DATA = {
  cars: [
    { id: 1, name: 'Toyota Hilux', year: 2023, price: 150000, type: 'Toyota', transmission: 'Automatic', seats: 5, tag: 'Premium' },
    { id: 2, name: 'Toyota Corolla', year: 2010, price: 70000, type: 'Toyota', transmission: 'Automatic', seats: 5, tag: 'Economy' },
    { id: 3, name: 'Toyota Camry', year: 2014, price: 80000, type: 'Toyota', transmission: 'Automatic', seats: 5, tag: 'Comfort' },
    { id: 4, name: 'Toyota Camry', year: 2016, price: 100000, type: 'Toyota', transmission: 'Automatic', seats: 5, tag: 'Comfort' },
    { id: 5, name: 'Toyota Hilux (Police Escort)', year: 2019, price: 80000, type: 'Toyota', transmission: 'Automatic', seats: 5, tag: 'Escort' },
    { id: 6, name: 'Toyota Hilux (Police Escort)', year: 2020, price: 120000, type: 'Toyota', transmission: 'Automatic', seats: 5, tag: 'Escort' },
    { id: 7, name: 'Lexus RX 350', year: 2018, price: 180000, type: 'Lexus', transmission: 'Automatic', seats: 5, tag: 'Luxury' },
    { id: 8, name: 'Mercedes-Benz E-Class', year: 2019, price: 250000, type: 'Mercedes-Benz', transmission: 'Automatic', seats: 5, tag: 'Executive' },
    { id: 9, name: 'BMW 5 Series', year: 2017, price: 220000, type: 'BMW', transmission: 'Automatic', seats: 5, tag: 'Executive' }
  ],
  testimonials: [
    {
      quote: "ODY Logistics gave me the smoothest travel experience I've ever had in Nigeria. The chauffeur was professional, punctual, and extremely courteous.",
      author: 'Alice Smart',
      role: 'Manager',
      stars: 5
    },
    {
      quote: "From airport pickup to daily business transportation, ODY handled everything perfectly. The vehicles were spotless, the drivers were friendly.",
      author: 'Robert Frost',
      role: 'Teacher',
      stars: 5
    },
    {
      quote: "Best transport service in Abuja. Always on time, flexible with my schedule, and excellent customer care. I will definitely use them again.",
      author: 'Olugbenga Babatunde',
      role: 'Manager',
      stars: 5
    }
  ],
  services: {
    airport: {
      title: 'Airport Pickup',
      desc: 'Reliable and punctual airport pickup services ensuring a smooth, comfortable ride from the airport to your destination.',
      features: ['Flight tracking', 'Meet & greet', 'Luggage assistance', 'Fixed pricing']
    },
    escort: {
      title: 'Police Escort',
      desc: 'Secure and professional police escort services for high-profile individuals, dignitaries, and sensitive cargo.',
      features: ['Licensed escort vehicles', 'Trained drivers', 'Route planning', '24/7 availability']
    }
  }
};

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/api/data', (req, res) => {
  res.json({ cars: DATA.cars, testimonials: DATA.testimonials, services: DATA.services });
});

app.post('/api/bookings', (req, res) => {
  const { name, phone, serviceType, pickupLocation, pickupDate, pickupTime, vehiclePreference, notes } = req.body;
  if (!name || !phone || !serviceType || !pickupLocation || !pickupDate || !pickupTime || !vehiclePreference) {
    return res.status(400).json({ error: 'All booking fields are required.' });
  }

  const booking = {
    id: bookings.length + 1,
    createdAt: new Date().toISOString(),
    name,
    phone,
    serviceType,
    pickupLocation,
    pickupDate,
    pickupTime,
    vehiclePreference,
    notes: notes || ''
  };

  bookings.push(booking);
  saveJson(bookingsFile, bookings);
  res.status(201).json({ message: 'Booking received', booking });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const contact = {
    id: messages.length + 1,
    createdAt: new Date().toISOString(),
    name,
    email,
    message
  };

  messages.push(contact);
  saveJson(messagesFile, messages);
  res.status(201).json({ message: 'Message received', contact });
});

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

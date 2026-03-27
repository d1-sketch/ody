/* ============================================================
   ODY LOGISTICS & TRANSPORT — App Logic
   ============================================================ */

const API_BASE = '/api';

const DATA = {
  cars: [
    { id: 1, name: "Toyota Hilux", year: 2023, price: 150000, type: "Toyota", transmission: "Automatic", seats: 5, icon: "truck", tag: "Premium" },
    { id: 2, name: "Toyota Corolla", year: 2010, price: 70000, type: "Toyota", transmission: "Automatic", seats: 5, icon: "car", tag: "Economy" },
    { id: 3, name: "Toyota Camry", year: 2014, price: 80000, type: "Toyota", transmission: "Automatic", seats: 5, icon: "car", tag: "Comfort" },
    { id: 4, name: "Toyota Camry", year: 2016, price: 100000, type: "Toyota", transmission: "Automatic", seats: 5, icon: "car", tag: "Comfort" },
    { id: 5, name: "Toyota Hilux (Police Escort)", year: 2019, price: 80000, type: "Toyota", transmission: "Automatic", seats: 5, icon: "shield", tag: "Escort" },
    { id: 6, name: "Toyota Hilux (Police Escort)", year: 2020, price: 120000, type: "Toyota", transmission: "Automatic", seats: 5, icon: "shield", tag: "Escort" },
    { id: 7, name: "Lexus RX 350", year: 2018, price: 180000, type: "Lexus", transmission: "Automatic", seats: 5, icon: "car", tag: "Luxury" },
    { id: 8, name: "Mercedes-Benz E-Class", year: 2019, price: 250000, type: "Mercedes-Benz", transmission: "Automatic", seats: 5, icon: "car", tag: "Executive" },
    { id: 9, name: "BMW 5 Series", year: 2017, price: 220000, type: "BMW", transmission: "Automatic", seats: 5, icon: "car", tag: "Executive" },
  ],

  testimonials: [
    {
      quote: "ODY Logistics gave me the smoothest travel experience I've ever had in Nigeria. The chauffeur was professional, punctual, and extremely courteous.",
      author: "Alice Smart",
      role: "Manager",
      stars: 5
    },
    {
      quote: "From airport pickup to daily business transportation, ODY handled everything perfectly. The vehicles were spotless, the drivers were friendly.",
      author: "Robert Frost",
      role: "Teacher",
      stars: 5
    },
    {
      quote: "Best transport service in Abuja. Always on time, flexible with my schedule, and excellent customer care. I will definitely use them again.",
      author: "Olugbenga Babatunde",
      role: "Manager",
      stars: 5
    }
  ],

  services: {
    airport: {
      title: "Airport Pickup",
      desc: "Reliable and punctual airport pickup services ensuring a smooth, comfortable ride from the airport to your destination.",
      icon: "plane",
      features: ["Flight tracking", "Meet & greet", "Luggage assistance", "Fixed pricing"]
    },
    escort: {
      title: "Police Escort",
      desc: "Secure and professional police escort services for high-profile individuals, dignitaries, and sensitive cargo.",
      icon: "shield",
      features: ["Licensed escort vehicles", "Trained drivers", "Route planning", "24/7 availability"]
    }
  }
};

const ICONS = {
  car: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 36h48l4 12H4l4-12Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M18 36V26c0-4 4-8 8-8h12c4 0 8 4 8 8v10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="52" r="6" stroke="currentColor" stroke-width="4"/><circle cx="46" cy="52" r="6" stroke="currentColor" stroke-width="4"/></svg>`,
  truck: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 40h34l6 10H8l2-10Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M26 40V28c0-4 4-8 8-8h12c4 0 8 4 8 8v12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 40h8v8H50" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="54" r="6" stroke="currentColor" stroke-width="4"/><circle cx="46" cy="54" r="6" stroke="currentColor" stroke-width="4"/></svg>`,
  shield: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 58s20-7 24-22V18L32 6 8 18v18c4 15 24 22 24 22Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M24 32l8 8 12-16" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  plane: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 34l44-10L26 24l8-8-8 4-6-6 4 8-10 4 10 4-4 8 6-6 8 4-4 8 28-8-44-10Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  default: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 36h48l4 12H4l4-12Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M18 36V26c0-4 4-8 8-8h12c4 0 8 4 8 8v10" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="52" r="6" stroke="currentColor" stroke-width="4"/><circle cx="46" cy="52" r="6" stroke="currentColor" stroke-width="4"/></svg>`
};

function getIconSvg(key) {
  return ICONS[key] || ICONS.default;
}

async function loadRemoteData() {
  try {
    const response = await fetch(`${API_BASE}/data`);
    if (!response.ok) throw new Error('Server returned ' + response.status);
    const json = await response.json();
    if (json.cars) DATA.cars = json.cars;
    if (json.testimonials) DATA.testimonials = json.testimonials;
    if (json.services) DATA.services = json.services;
  } catch (error) {
    console.warn('Unable to load remote data, falling back to local data.', error);
  }
}

const App = (() => {

  /* ── STATE ── */
  let currentPage  = "page-home";
  let fleetFilter  = "all";
  let countersRun  = false;

  /* ── INIT ── */
  async function init() {
    await loadRemoteData();

    // Show app after splash
    setTimeout(() => {
      document.getElementById("splash").style.display = "none";
      document.getElementById("app").classList.remove("hidden");
      animateCounters();
    }, 2750);

    renderCarScroll();
    renderTestimonials();
    renderFleet();
    bindNavigation();
    bindFilterPills();
  }

  /* ── NAVIGATION ── */
  function bindNavigation() {
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const page = btn.dataset.page;
        if (page) goTo(page);
      });
    });
  }

  function goTo(pageId) {
    // Hide current
    const current = document.getElementById(currentPage);
    if (current) { current.classList.remove("active"); }

    // Show new
    const next = document.getElementById(pageId);
    if (next) {
      next.classList.add("active");
      next.scrollTop = 0;
    }

    currentPage = pageId;

    // Update nav highlight
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === pageId);
    });
  }

  /* ── FILTER PILLS ── */
  function bindFilterPills() {
    document.querySelectorAll(".pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        fleetFilter = pill.dataset.filter;
        renderFleet();
      });
    });
  }

  /* ── RENDER: HOME CARS SCROLL ── */
  function renderCarScroll() {
    const container = document.getElementById("carScroll");
    const featured = DATA.cars.slice(0, 6);

    container.innerHTML = featured.map(car => `
      <div class="car-card" onclick="App.openCarModal(${car.id})">
        <div class="car-card-img-placeholder">${getIconSvg(car.icon)}</div>
        <div class="car-card-body">
          <div class="car-card-name">${car.name}</div>
          <div class="car-card-year">${car.year} · ${car.tag}</div>
          <div class="car-card-price">₦${car.price.toLocaleString()}</div>
          <div class="car-card-price-sub">/ day</div>
        </div>
      </div>
    `).join("");
  }

  /* ── RENDER: TESTIMONIALS ── */
  function renderTestimonials() {
    const container = document.getElementById("testimonials");
    container.innerHTML = DATA.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="stars">${"★".repeat(t.stars)}</div>
        <div class="testimonial-quote">"${t.quote}"</div>
        <div class="testimonial-author">${t.author}</div>
        <div class="testimonial-role">${t.role}</div>
      </div>
    `).join("");
  }

  /* ── RENDER: FLEET ── */
  function renderFleet() {
    const grid = document.getElementById("fleetGrid");
    const filtered = fleetFilter === "all"
      ? DATA.cars
      : DATA.cars.filter(c => c.type === fleetFilter);

    grid.innerHTML = filtered.map(car => `
      <div class="fleet-card" onclick="App.openCarModal(${car.id})">
        <div class="fleet-card-img">${getIconSvg(car.icon)}</div>
        <div class="fleet-card-body">
          <div class="fleet-badge">${car.tag}</div>
          <div class="fleet-card-name">${car.name}</div>
          <div class="fleet-card-year">${car.year} · ${car.transmission}</div>
          <div class="fleet-card-price">₦${car.price.toLocaleString()}<span style="font-size:10px;color:var(--text-dim);font-weight:400">/day</span></div>
        </div>
      </div>
    `).join("");
  }

  /* ── CAR MODAL ── */
  function openCarModal(id) {
    const car = DATA.cars.find(c => c.id === id);
    if (!car) return;

    const content = document.getElementById("modalContent");
    content.innerHTML = `
      <div class="modal-car-emoji">${getIconSvg(car.icon)}</div>
      <div class="modal-name">${car.name}</div>
      <div class="modal-year">${car.year} · ${car.tag} · Certified Used</div>
      <div class="modal-price">₦${car.price.toLocaleString()}</div>
      <div class="modal-price-unit">per day (all-inclusive)</div>
      <div class="modal-specs">
        <div class="modal-spec">
          <div class="modal-spec-label">Transmission</div>
          <div class="modal-spec-value">${car.transmission}</div>
        </div>
        <div class="modal-spec">
          <div class="modal-spec-label">Seats</div>
          <div class="modal-spec-value">${car.seats} Passengers</div>
        </div>
        <div class="modal-spec">
          <div class="modal-spec-label">Make</div>
          <div class="modal-spec-value">${car.type}</div>
        </div>
        <div class="modal-spec">
          <div class="modal-spec-label">Year</div>
          <div class="modal-spec-value">${car.year}</div>
        </div>
      </div>
      <button class="btn-primary full" onclick="App.closeModal(); App.goTo('page-book');">
        Book This Vehicle
      </button>
      <div style="height:12px"></div>
      <a href="tel:07054678068" style="display:block;text-align:center;color:var(--text-dim);font-size:13px;padding:12px">
        or call 07054678068
      </a>
    `;

    document.getElementById("carModal").classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("carModal").classList.add("hidden");
    document.body.style.overflow = "";
  }

  /* ── SERVICE MODAL ── */
  function showService(key) {
    const svc = DATA.services[key];
    if (!svc) return;

    const content = document.getElementById("modalContent");
    content.innerHTML = `
      <div class="modal-car-emoji">${getIconSvg(svc.icon)}</div>
      <div class="modal-name">${svc.title}</div>
      <div class="modal-year" style="margin-bottom:16px">${svc.desc}</div>
      <div class="modal-specs">
        ${svc.features.map(f => `
          <div class="modal-spec">
            <div class="modal-spec-value">✓ ${f}</div>
          </div>
        `).join("")}
      </div>
      <button class="btn-primary full" onclick="App.closeModal(); App.goTo('page-book');">
        Book This Service
      </button>
      <div style="height:12px"></div>
      <a href="tel:07054678068" style="display:block;text-align:center;color:var(--text-dim);font-size:13px;padding:12px">
        or call 07054678068
      </a>
    `;

    document.getElementById("carModal").classList.remove("hidden");
  }

  /* ── BOOKING ── */
  async function submitBooking() {
    const name = document.getElementById('bookerName').value.trim();
    const phone = document.getElementById('bookerPhone').value.trim();
    const serviceType = document.getElementById('serviceSelect').value;
    const pickupLocation = document.getElementById('pickupLocation').value.trim();
    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const vehiclePreference = document.getElementById('vehiclePreference').value;
    const notes = document.getElementById('bookingNotes').value.trim();

    if (!name || !phone || !serviceType || !pickupLocation || !pickupDate || !pickupTime || !vehiclePreference) {
      showToast('Please complete all booking fields.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, serviceType, pickupLocation, pickupDate, pickupTime, vehiclePreference, notes })
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || 'Booking failed');
      }

      document.getElementById("bookForm").classList.add("hidden");
      document.getElementById("bookSuccess").classList.remove("hidden");
      document.getElementById("page-book").scrollTop = 0;
      showToast("🎉 Booking submitted!");
    } catch (error) {
      showToast(`Unable to submit booking. ${error.message}`);
      console.error(error);
    }
  }

  function resetBooking() {
    document.getElementById("bookForm").classList.remove("hidden");
    document.getElementById("bookSuccess").classList.add("hidden");
    // Reset inputs
    document.getElementById("bookForm").querySelectorAll("input, select, textarea")
      .forEach(el => { el.value = ""; });
  }

  /* ── CONTACT MESSAGE ── */
  async function sendMessage() {
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please complete the contact form.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.error || 'Message failed');
      }

      showToast("✅ Message sent! We'll reply soon.");
      document.getElementById('contactForm').reset();
    } catch (error) {
      showToast(`Unable to send message. ${error.message}`);
      console.error(error);
    }
  }

  /* ── COUNTER ANIMATION ── */
  function animateCounters() {
    if (countersRun) return;
    countersRun = true;
    document.querySelectorAll(".trust-num").forEach(el => {
      const target = parseInt(el.dataset.target);
      let current = 0;
      const step = Math.ceil(target / 40);
      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + (target >= 100 ? "+" : "");
        if (current >= target) clearInterval(interval);
      }, 35);
    });
  }

  /* ── TOAST ── */
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(App._toastTimer);
    App._toastTimer = setTimeout(() => toast.classList.add("hidden"), 2800);
  }

  /* ── CLOSE MODAL ON BACKDROP TAP ── */
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("carModal").addEventListener("click", function(e) {
      if (e.target === this) closeModal();
    });
  });

  /* ── PUBLIC API ── */
  return { init, goTo, openCarModal, closeModal, showService, submitBooking, resetBooking, sendMessage };

})();

/* ── BOOT ── */
document.addEventListener("DOMContentLoaded", App.init);

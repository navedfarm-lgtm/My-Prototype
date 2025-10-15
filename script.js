// ========================
// MOBILE MENU TOGGLE
// ========================
const menuButton = document.getElementById('menuButton');
const menuLinks = document.getElementById('mobileMenuLinks');

if (menuButton && menuLinks) {
  // Toggle mobile menu on button click
  menuButton.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent click from closing immediately
    menuLinks.classList.toggle('active');
    menuButton.classList.toggle('hover-active');
  });

  // Close mobile menu if clicking outside
  document.addEventListener('click', function() {
    menuLinks.classList.remove('active');
    menuButton.classList.remove('hover-active');
  });

  // Prevent closing when clicking inside menu links
  menuLinks.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}

// ========================
// ACTIVE MENU ITEM HIGHLIGHT
// ========================
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a, .mobile-nav .menu-links a');
  const currentPage = location.pathname.split("/").pop(); // get current page filename

  navLinks.forEach(link => {
    if(link.getAttribute('href') === currentPage){
      link.classList.add('active'); // add active class
    }
  });
});

// ========================
// AUTO LOAD FOOTER + COOKIE CONSENT
// ========================
document.addEventListener("DOMContentLoaded", function() {
  // Remove any existing footer
  const existingFooter = document.getElementById("site-footer");
  if (existingFooter) existingFooter.remove();

  // Fetch and insert footer.html
  fetch("footer.html")
    .then(response => response.text())
    .then(data => {
      document.body.insertAdjacentHTML("beforeend", data);
      initCookieConsent(); // Initialize cookie consent after footer loads
    })
    .catch(error => console.error("Error loading footer:", error));
});

// ========================
// COOKIE CONSENT LOGIC
// ========================
function initCookieConsent() {
  const banner = document.getElementById("cookie-consent-banner");
  const acceptBtn = document.getElementById("acceptCookies");
  const rejectBtn = document.getElementById("rejectCookies");

  if (!banner || !acceptBtn || !rejectBtn) return;

  const stored = localStorage.getItem("cookieConsent"); // "accepted" or "rejected"
  if (stored) return; // Already decided

  banner.style.display = "block";

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
    // Enable non-essential cookies/scripts here if needed
  });

  rejectBtn.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "rejected");
    banner.style.display = "none";
    // Disable non-essential cookies/scripts here if needed
  });
}

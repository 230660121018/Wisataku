// DOM Elements
const navLinks = document.querySelectorAll(".nav-link");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const backToTopBtn = document.getElementById("backToTop");
const contactForm = document.getElementById("contactForm");
const formSuccessMessage = document.querySelector(".form-success-message");
const galeriItems = document.querySelectorAll(".galeri-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

// Toggle Mobile Menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close Mobile Menu When Link is Clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Update Active Link
    navLinks.forEach((link) => link.classList.remove("active"));
    link.classList.add("active");

    // Scroll to Section
    window.scrollTo({
      top: targetSection.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

// Smooth Scrolling for CTA Button
document.querySelector(".cta-button").addEventListener("click", (e) => {
  e.preventDefault();
  const targetSection = document.querySelector("#destinasi");

  window.scrollTo({
    top: targetSection.offsetTop - 70,
    behavior: "smooth",
  });
});

// Update Active Navigation Link on Scroll
window.addEventListener("scroll", () => {
  let current = "";

  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });
});

// Show/Hide Back to Top Button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
});

// Scroll to Top When Back to Top Button is Clicked
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form Validation
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Reset Previous Errors
  const formGroups = contactForm.querySelectorAll(".form-group");
  formGroups.forEach((group) => {
    group.classList.remove("error");
  });

  // Get Form Values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  let isValid = true;

  // Validate Name
  if (name === "") {
    showError("name", "Nama harus diisi");
    isValid = false;
  }

  // Validate Email
  if (email === "") {
    showError("email", "Email harus diisi");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Format email tidak valid");
    isValid = false;
  }

  // Validate Message
  if (message === "") {
    showError("message", "Pesan harus diisi");
    isValid = false;
  }

  // If Form is Valid, Show Success Message
  if (isValid) {
    contactForm.style.display = "none";
    formSuccessMessage.style.display = "flex";

    // Reset Form After 5 Seconds
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = "block";
      formSuccessMessage.style.display = "none";
    }, 5000);
  }
});

// Show Error Message
function showError(fieldId, message) {
  const formGroup = document.getElementById(fieldId).parentElement;
  const errorMessage = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  errorMessage.textContent = message;
}

// Validate Email Format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Gallery Lightbox
galeriItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.querySelector("img").src;
    lightboxImg.src = imgSrc;
    lightbox.style.display = "block";
  });
});

// Close Lightbox
closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Close Lightbox When Clicking Outside the Image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// Add Animation on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".destinasi-card, .galeri-item");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Set Initial State for Animation
document
  .querySelectorAll(".destinasi-card, .galeri-item")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

// Run Animation on Scroll
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Header Shadow on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }
});

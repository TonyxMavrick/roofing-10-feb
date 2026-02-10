// FixRoof - Main JavaScript File

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      const icon = this.querySelector('.menu-icon');
      if (icon) {
        icon.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
      }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('.menu-icon');
        if (icon) {
          icon.textContent = '☰';
        }
      });
    });
  }

  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you! Your request has been submitted. We will contact you shortly.');
      
      // Reset form
      form.reset();
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll('.glass-card, .service-card, .gallery-item, .testimonial-card');
  animateElements.forEach(el => {
    observer.observe(el);
  });

  // Counter animation for trust badges
  const counters = document.querySelectorAll('.badge-number');
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
});

// Counter animation function
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const suffix = element.getAttribute('data-suffix') || '';
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString() + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }
  }, 16);
}

// Parallax effect for hero backgrounds
window.addEventListener('scroll', function() {
  const heroElements = document.querySelectorAll('.hero-bg');
  heroElements.forEach(hero => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
  });
});

// Service card click handler
function goToServiceDetail(serviceId) {
  window.location.href = `service-detail.html?service=${serviceId}`;
}

// Load service detail based on URL parameter
if (window.location.pathname.includes('service-detail.html')) {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('service');
  
  if (serviceId) {
    loadServiceDetail(serviceId);
  }
}

// Service data
const servicesData = {
  'roof-repair': {
    title: 'Roof Repair',
    description: 'Expert roof repair services for all types of roofing systems',
    fullDescription: 'Our professional roof repair services address all types of damage, from minor leaks to major structural issues. We use high-quality materials and proven techniques to ensure long-lasting repairs that protect your property.',
    features: [
      'Emergency leak repair',
      'Shingle replacement',
      'Flashing repair',
      'Storm damage restoration',
      'Structural repairs',
      'Preventive maintenance'
    ],
    benefits: [
      'Fast response time',
      '10-year warranty',
      'Licensed professionals',
      'Quality materials',
      'Competitive pricing',
      'Free inspections'
    ],
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800'
  },
  'roof-replacement': {
    title: 'Roof Replacement',
    description: 'Complete roof replacement with premium materials',
    fullDescription: 'When repairs are no longer cost-effective, our complete roof replacement service provides you with a brand new, durable roofing system. We work with all major roofing materials and manufacturers to deliver the best solution for your property.',
    features: [
      'Complete tear-off and replacement',
      'Multiple material options',
      'Structural assessment',
      'Updated ventilation systems',
      'Energy-efficient options',
      'Warranty coverage'
    ],
    benefits: [
      'Increased property value',
      'Enhanced curb appeal',
      'Better energy efficiency',
      'Long-term protection',
      'Manufacturer warranties',
      'Expert installation'
    ],
    image: 'https://images.unsplash.com/photo-1590482795838-786bae38bc46?w=800'
  },
  'roof-inspection': {
    title: 'Roof Inspection',
    description: 'Comprehensive roof inspection and assessment',
    fullDescription: 'Our detailed roof inspection service identifies potential problems before they become costly repairs. We provide comprehensive reports with photos and recommendations to help you make informed decisions about your roof maintenance.',
    features: [
      'Visual inspection',
      'Moisture detection',
      'Structural assessment',
      'Detailed photo documentation',
      'Written reports',
      'Maintenance recommendations'
    ],
    benefits: [
      'Early problem detection',
      'Cost savings',
      'Extended roof life',
      'Insurance documentation',
      'Peace of mind',
      'Professional expertise'
    ],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800'
  },
  'emergency-services': {
    title: 'Emergency Roof Services',
    description: '24/7 emergency roofing services',
    fullDescription: 'When disaster strikes, our emergency roofing services are available 24/7 to protect your property. We respond quickly to minimize damage and provide immediate solutions to keep your building secure.',
    features: [
      '24/7 availability',
      'Rapid response',
      'Temporary repairs',
      'Permanent solutions',
      'Insurance assistance',
      'Storm damage experts'
    ],
    benefits: [
      'Immediate protection',
      'Minimize damage',
      'Fast restoration',
      'Insurance support',
      'Experienced team',
      'Quality workmanship'
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800'
  },
  'gutter-services': {
    title: 'Gutter Installation & Repair',
    description: 'Professional gutter installation and repair',
    fullDescription: 'Properly functioning gutters are essential for protecting your roof and foundation. We provide complete gutter services including installation, repair, and maintenance to ensure optimal water drainage.',
    features: [
      'Gutter installation',
      'Repair and replacement',
      'Cleaning services',
      'Downspout installation',
      'Gutter guards',
      'Custom solutions'
    ],
    benefits: [
      'Foundation protection',
      'Prevent water damage',
      'Low maintenance options',
      'Quality materials',
      'Professional installation',
      'Competitive pricing'
    ],
    image: 'https://images.unsplash.com/photo-1604584239165-8918f48c2c17?w=800'
  },
  'commercial-roofing': {
    title: 'Commercial Roofing',
    description: 'Specialized commercial roofing solutions',
    fullDescription: 'Our commercial roofing services cater to businesses of all sizes. From flat roofs to complex commercial systems, we provide installation, maintenance, and repair services that minimize downtime and protect your investment.',
    features: [
      'Flat roof systems',
      'TPO and EPDM',
      'Metal roofing',
      'Maintenance programs',
      'Emergency repairs',
      'Roof coatings'
    ],
    benefits: [
      'Minimal business disruption',
      'Long-lasting solutions',
      'Energy efficiency',
      'Warranty protection',
      'Experienced team',
      'Competitive pricing'
    ],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800'
  }
};

function loadServiceDetail(serviceId) {
  const service = servicesData[serviceId];
  
  if (service) {
    document.getElementById('service-title').textContent = service.title;
    document.getElementById('service-description').textContent = service.description;
    document.getElementById('service-full-description').textContent = service.fullDescription;
    document.getElementById('service-image').src = service.image;
    document.getElementById('service-image').alt = service.title;
    
    const featuresList = document.getElementById('service-features');
    featuresList.innerHTML = '';
    service.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresList.appendChild(li);
    });
    
    const benefitsList = document.getElementById('service-benefits');
    benefitsList.innerHTML = '';
    service.benefits.forEach(benefit => {
      const li = document.createElement('li');
      li.textContent = benefit;
      benefitsList.appendChild(li);
    });
  }
}

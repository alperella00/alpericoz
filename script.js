// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")

  // Animate hamburger
  const spans = hamburger.querySelectorAll("span")
  if (navMenu.classList.contains("active")) {
    spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
    spans[1].style.opacity = "0"
    spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
  } else {
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  }
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    const spans = hamburger.querySelectorAll("span")
    spans[0].style.transform = "none"
    spans[1].style.opacity = "1"
    spans[2].style.transform = "none"
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Add scroll effect to navbar
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  } else {
    navbar.style.boxShadow = "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
  }

  lastScroll = currentScroll
})

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all sections and cards
document.querySelectorAll(".section, .project-card, .timeline-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Simple image gallery for project cards
document.querySelectorAll('.gallery').forEach((gallery) => {
  const imgEl = gallery.querySelector('img')
  const prevBtn = gallery.querySelector('.gallery-prev')
  const nextBtn = gallery.querySelector('.gallery-next')
  const dotsEl = gallery.querySelector('.gallery-dots')
  const images = JSON.parse(gallery.getAttribute('data-images') || '[]')
  let index = 0

  // Build dots
  dotsEl.innerHTML = ''
  images.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.addEventListener('click', () => setIndex(i))
    dotsEl.appendChild(dot)
  })

  function setIndex(i) {
    index = (i + images.length) % images.length
    imgEl.src = images[index]
    updateDots()
  }

  function updateDots() {
    const buttons = dotsEl.querySelectorAll('button')
    buttons.forEach((b, i) => b.classList.toggle('active', i === index))
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    setIndex(index - 1)
  })

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation()
    setIndex(index + 1)
  })

  // Init
  if (images.length > 0) {
    setIndex(0)
    // Hide controls if only one image
    const controlsVisible = images.length > 1
    prevBtn.style.display = controlsVisible ? 'flex' : 'none'
    nextBtn.style.display = controlsVisible ? 'flex' : 'none'
    dotsEl.style.display = controlsVisible ? 'flex' : 'none'
  }
})

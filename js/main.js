import { HomeView } from "../views/home.js";
import { GalleryView } from "../views/gallery.js";
import { InteractiveView } from "../views/interactive.js";

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const entranceOverlay = document.getElementById("entrance-overlay");
  const enterBtn = document.getElementById("enter-btn");
  const bgMusic = document.getElementById("bg-music");
  const mainNav = document.getElementById("main-nav");
  const appContent = document.getElementById("app-content");
  const navButtons = document.querySelectorAll(".nav-btn");
  const audioToggle = document.getElementById("audio-toggle");
  const iconPause = document.getElementById("icon-pause");
  const iconPlay = document.getElementById("icon-play");
  const themeToggle = document.getElementById("theme-toggle");

  // State
  let currentRoute = "home";
  let isMusicPlaying = false;

  // View Mapping
  const routes = {
    home: HomeView,
    gallery: GalleryView,
    interactive: InteractiveView,
  };

  // ═══════════════════════════════════════════════
  // Ambient Particle System
  // ═══════════════════════════════════════════════
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let animFrameId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: -Math.random() * 0.4 - 0.1,
      pulseSpeed: Math.random() * 0.02 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    };
  }

  function initParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.001;

    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;

      // Wrap around edges
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      // Pulse opacity
      const pulse = Math.sin(time * p.pulseSpeed * 10 + p.pulsePhase) * 0.5 + 0.5;
      const alpha = p.alpha * (0.5 + pulse * 0.5);

      // Read theme-aware particle color
      const pc = getComputedStyle(document.documentElement).getPropertyValue('--particle-color').trim();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${pc}, ${alpha})`;
      ctx.fill();
    });

    animFrameId = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    initParticles();
  });

  // ═══════════════════════════════════════════════
  // Floating Pink Flower Petals System
  // ═══════════════════════════════════════════════
  const petalCanvas = document.getElementById("petal-canvas");
  const petalCtx = petalCanvas.getContext("2d");
  let petals = [];

  function resizePetalCanvas() {
    petalCanvas.width = window.innerWidth;
    petalCanvas.height = window.innerHeight;
  }

  // Pink color palette for petals
  const petalColors = [
    { r: 255, g: 182, b: 193 }, // light pink
    { r: 255, g: 150, b: 170 }, // medium pink
    { r: 244, g: 114, b: 152 }, // rose pink
    { r: 255, g: 200, b: 210 }, // blush
    { r: 230, g: 130, b: 160 }, // deep pink
    { r: 255, g: 170, b: 190 }, // soft rose
  ];

  function createPetal() {
    const color = petalColors[Math.floor(Math.random() * petalColors.length)];
    return {
      x: Math.random() * petalCanvas.width,
      y: Math.random() * -petalCanvas.height, // start above viewport
      size: Math.random() * 10 + 6,           // 6–16px
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      fallSpeed: Math.random() * 0.6 + 0.3,   // 0.3–0.9 px/frame
      swayAmplitude: Math.random() * 40 + 15,  // horizontal sway range
      swaySpeed: Math.random() * 0.015 + 0.005,
      swayOffset: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.4 + 0.15,       // 0.15–0.55
      color: color,
      originX: Math.random() * petalCanvas.width,
    };
  }

  function initPetals() {
    petals = [];
    // Moderate density — enough to look magical, not overwhelming
    const count = Math.min(Math.floor((petalCanvas.width * petalCanvas.height) / 25000), 35);
    for (let i = 0; i < count; i++) {
      const p = createPetal();
      // Scatter initial positions across the full screen height for instant effect
      p.y = Math.random() * petalCanvas.height;
      petals.push(p);
    }
  }

  // Draw a single flower petal shape (teardrop / elliptical petal)
  function drawPetal(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.alpha;

    const s = p.size;
    const { r, g, b } = p.color;

    // Draw a 5-petal flower shape
    const petalCount = 5;
    for (let i = 0; i < petalCount; i++) {
      ctx.save();
      ctx.rotate((Math.PI * 2 * i) / petalCount);

      // Each petal is a soft ellipse
      ctx.beginPath();
      ctx.ellipse(0, -s * 0.5, s * 0.28, s * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.7})`;
      ctx.fill();

      ctx.restore();
    }

    // Center circle (pistil)
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 220, 180, ${p.alpha * 0.9})`;
    ctx.fill();

    ctx.restore();
  }

  function animatePetals() {
    petalCtx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
    const time = Date.now() * 0.001;

    petals.forEach((p) => {
      // Drift downward
      p.y += p.fallSpeed;

      // Gentle horizontal sway (sinusoidal)
      p.x = p.originX + Math.sin(time * p.swaySpeed * 10 + p.swayOffset) * p.swayAmplitude;

      // Slow rotation
      p.rotation += p.rotationSpeed;

      // Wrap: reset above screen when fallen below
      if (p.y > petalCanvas.height + 20) {
        p.y = -20;
        p.originX = Math.random() * petalCanvas.width;
        p.x = p.originX;
      }

      drawPetal(petalCtx, p);
    });

    requestAnimationFrame(animatePetals);
  }

  resizePetalCanvas();
  initPetals();
  animatePetals();

  window.addEventListener("resize", () => {
    resizePetalCanvas();
    initPetals();
  });

  // ═══════════════════════════════════════════════
  // View Router
  // ═══════════════════════════════════════════════
  async function loadView(route) {
    if (!routes[route]) return;

    // Update active nav button styling
    navButtons.forEach((btn) => {
      if (btn.dataset.route === route) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Setup Fade Out
    appContent.classList.remove("opacity-100");
    appContent.classList.add("opacity-0");

    // Wait for fade out transition
    setTimeout(() => {
      // Inject new view HTML
      appContent.innerHTML = routes[route]();

      // Execute any post-render logic needed for specific views
      if (route === "gallery") {
        initLightbox();
      }
      if (route === "interactive") {
        // Enable tap-to-flip on flip cards (for touch and click)
        document.querySelectorAll(".flip-card").forEach((card) => {
          card.addEventListener("click", () => {
            card.classList.toggle("flipped");
          });
        });
      }

      // Trigger Fade In
      requestAnimationFrame(() => {
        appContent.classList.remove("opacity-0");
        appContent.classList.add("opacity-100");
      });

      // Scroll to top on route change
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }

  // ═══════════════════════════════════════════════
  // Lightbox for Gallery
  // ═══════════════════════════════════════════════
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.getElementById("lightbox-close");
    const galleryCards = document.querySelectorAll(".gallery-card");

    if (!lightbox) return;

    galleryCards.forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector("img");
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.remove("hidden");
          requestAnimationFrame(() => {
            lightbox.classList.remove("opacity-0");
            lightbox.classList.add("opacity-100");
          });
        }
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("opacity-100");
      lightbox.classList.add("opacity-0");
      setTimeout(() => {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
      }, 300);
    }

    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    });
  }

  // ═══════════════════════════════════════════════
  // Navigation
  // ═══════════════════════════════════════════════
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const route = e.currentTarget.dataset.route;
      if (route !== currentRoute) {
        currentRoute = route;
        loadView(route);
      }
    });
  });

  // ═══════════════════════════════════════════════
  // Entrance Experience
  // ═══════════════════════════════════════════════
  enterBtn.addEventListener("click", () => {
    // Fade out overlay
    entranceOverlay.classList.remove("opacity-100");
    entranceOverlay.classList.add("opacity-0", "pointer-events-none");

    // Start background music seamlessly
    bgMusic.volume = 0.5;
    bgMusic
      .play()
      .then(() => {
        isMusicPlaying = true;
      })
      .catch((err) => console.log("Autoplay blocked:", err));

    // Initial load the home view
    loadView("home");

    // Reveal the floating navigation Menu
    setTimeout(() => {
      entranceOverlay.style.display = "none";
      mainNav.classList.remove("opacity-0", "translate-y-10");
      mainNav.classList.add("opacity-100", "translate-y-0");
    }, 1000);
  });

  // ═══════════════════════════════════════════════
  // Audio Toggle
  // ═══════════════════════════════════════════════
  audioToggle.addEventListener("click", () => {
    if (isMusicPlaying) {
      bgMusic.pause();
      iconPause.classList.add("hidden");
      iconPlay.classList.remove("hidden");
    } else {
      bgMusic.play();
      iconPlay.classList.add("hidden");
      iconPause.classList.remove("hidden");
    }
    isMusicPlaying = !isMusicPlaying;
  });

  // ═══════════════════════════════════════════════
  // Music Dropdown
  // ═══════════════════════════════════════════════
  const musicDropdownBtn = document.getElementById("music-dropdown-btn");
  const musicDropdownMenu = document.getElementById("music-dropdown-menu");
  const currentSongLabel = document.getElementById("current-song-label");
  const musicOptions = document.querySelectorAll(".music-option");

  // Toggle menu visibility
  musicDropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isHidden = musicDropdownMenu.classList.contains("opacity-0");
    if (isHidden) {
      musicDropdownMenu.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
      musicDropdownMenu.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
    } else {
      musicDropdownMenu.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
      musicDropdownMenu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", () => {
    musicDropdownMenu.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
    musicDropdownMenu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
  });

  // Handle option selection
  musicOptions.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const src = btn.dataset.src;
      const label = btn.dataset.label;
      
      // Update label
      currentSongLabel.textContent = label;
      
      // Update checkmarks
      musicOptions.forEach(opt => {
        const icon = opt.querySelector("[data-icon]");
        if (opt === btn) {
          icon.classList.remove("opacity-0");
          icon.classList.add("opacity-100");
        } else {
          icon.classList.remove("opacity-100");
          icon.classList.add("opacity-0");
        }
      });
      
      // Update audio
      bgMusic.src = src;
      if (isMusicPlaying) {
        bgMusic.play().catch((err) => console.log("Autoplay blocked:", err));
      }
      
      // Close menu
      musicDropdownMenu.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
      musicDropdownMenu.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
    });
  });

  // ═══════════════════════════════════════════════
  // Theme Toggle (Light / Dark)
  // ═══════════════════════════════════════════════
  const htmlEl = document.documentElement;

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  htmlEl.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const current = htmlEl.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    htmlEl.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
});

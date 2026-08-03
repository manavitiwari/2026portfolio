/* ==========================================================================
   Modern Developer Portfolio - JavaScript Logic
   Theme: Obsidian Cyber-Glass Developer Portfolio
   Includes: Web Audio Guitar Synthesizer, HTML5 Canvas Studio,
   Extra-Curricular Activity Filters (Sketches, Hand Embroidery, Mehndi, Resin Art),
   Lightboxes, Smooth Scroll, and Animation Observers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypingEffect();
  initGuitarSynth();
  initCanvasStudio();
  initArtFilters();
  initArtModal();
  initProjectFilters();
  initScrollAnimations();
  initSkillBars();
  initContactForm();
});

/* --- Navbar Scroll & Mobile Drawer --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}

/* --- Hero Typing Effect --- */
function initTypingEffect() {
  const typedSpan = document.querySelector('.typed-text');
  if (!typedSpan) return;

  const phrases = [
    'Software Engineer (1+ Yrs)',
    'Frontend & Web Developer',
    'Full-Stack Developer',
    'Passionate Sketching Artist'
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      typedSpan.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 50;
    } else {
      typedSpan.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* --- Extra-Curricular Category Filter --- */
function initArtFilters() {
  const artTabBtns = document.querySelectorAll('.art-tab-btn');

  artTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      artTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-art-filter');
      const artCards = document.querySelectorAll('.art-card');

      artCards.forEach(card => {
        const category = card.getAttribute('data-art-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- Artwork Lightbox Modal --- */
function initArtModal() {
  const artCards = document.querySelectorAll('.art-card[data-img]');
  const modal = document.getElementById('artModal');
  if (!modal) return;

  const modalImg = document.getElementById('modalArtImg');
  const modalTitle = document.getElementById('modalArtTitle');
  const modalCategory = document.getElementById('modalArtCategory');
  const modalDesc = document.getElementById('modalArtDesc');
  const closeBtn = document.querySelector('.art-modal-close');

  artCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category-name');
      const desc = card.getAttribute('data-desc');

      if (modalImg) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDesc) modalDesc.textContent = desc;

      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

/* --- Web Audio API Guitar Synthesizer Studio --- */
function initGuitarSynth() {
  const guitarStrings = document.querySelectorAll('.guitar-string');
  const chordBtns = document.querySelectorAll('.chord-btn');
  const audioBars = document.querySelectorAll('.audio-bar');
  const nowPlayingLabel = document.getElementById('nowPlayingNote');

  const stringFreqs = [82.41, 110.00, 146.83, 196.00, 246.94, 329.63];
  const stringNames = ['E2 (Low E)', 'A2', 'D3', 'G3', 'B3', 'E4 (High E)'];

  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function pluckString(freq, stringIndex = 0) {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const harmonic = ctx.createOscillator();
    harmonic.type = 'sine';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    const bufferSize = ctx.sampleRate * 0.02;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 1200;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.3, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 2.0);

    osc.connect(filter);
    harmonic.connect(filter);
    filter.connect(gainNode);
    noiseGain.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    harmonic.start(now);
    noise.start(now);

    osc.stop(now + 2.3);
    harmonic.stop(now + 2.3);

    triggerAudioVisualizer();
    if (guitarStrings[stringIndex]) {
      guitarStrings[stringIndex].classList.add('pluck');
      setTimeout(() => guitarStrings[stringIndex].classList.remove('pluck'), 300);
    }
  }

  guitarStrings.forEach((strEl, idx) => {
    strEl.addEventListener('mouseenter', (e) => {
      if (e.buttons === 1 || e.buttons === 0) {
        pluckString(stringFreqs[idx], idx);
        if (nowPlayingLabel) nowPlayingLabel.textContent = `String: ${stringNames[idx]}`;
      }
    });

    strEl.addEventListener('click', () => {
      pluckString(stringFreqs[idx], idx);
      if (nowPlayingLabel) nowPlayingLabel.textContent = `Plucked: ${stringNames[idx]}`;
    });
  });

  const chords = {
    'C': [130.81, 164.81, 196.00, 261.63, 329.63],
    'G': [98.00, 123.47, 146.83, 196.00, 293.66, 392.00],
    'Am': [110.00, 164.81, 220.00, 261.63, 329.63],
    'F': [87.31, 130.81, 174.61, 220.00, 261.63, 349.23],
    'D': [146.83, 220.00, 293.66, 369.99],
    'Em': [82.41, 123.47, 164.81, 196.00, 246.94, 329.63]
  };

  chordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const chordName = btn.getAttribute('data-chord');
      const freqs = chords[chordName];

      chordBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (nowPlayingLabel) nowPlayingLabel.textContent = `Strumming Chord: ${chordName} Major`;

      if (freqs) {
        freqs.forEach((f, index) => {
          setTimeout(() => pluckString(f, index % 6), index * 35);
        });
      }
    });
  });

  function triggerAudioVisualizer() {
    audioBars.forEach(bar => {
      const randomHeight = Math.floor(Math.random() * 85) + 15;
      bar.style.height = `${randomHeight}%`;
      setTimeout(() => {
        bar.style.height = '20%';
      }, 400);
    });
  }
}

/* --- HTML5 Canvas Studio (Interactive Drawing Board) --- */
function initCanvasStudio() {
  const canvas = document.getElementById('drawingCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const swatches = document.querySelectorAll('.swatch');
  const brushSlider = document.getElementById('brushSize');
  const sizeValueSpan = document.getElementById('brushSizeValue');
  const toolBtns = document.querySelectorAll('.tool-btn[data-tool]');
  const clearBtn = document.getElementById('clearCanvasBtn');
  const saveBtn = document.getElementById('saveCanvasBtn');

  let isDrawing = false;
  let currentColor = '#00f2fe';
  let currentSize = 4;
  let currentTool = 'brush';
  let lastX = 0;
  let lastY = 0;

  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    drawSampleSketch();
  }

  function drawSampleSketch() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0d0f17';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#00f2fe';

    ctx.beginPath();
    ctx.arc(canvas.width * 0.35, canvas.height * 0.5, 60, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width * 0.65, canvas.height * 0.5, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(157, 78, 221, 0.5)';
    ctx.shadowColor = '#9d4edd';
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.15, canvas.height * 0.5);
    ctx.lineTo(canvas.width * 0.85, canvas.height * 0.5);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(241, 245, 249, 0.6)';
    ctx.font = '13px "Fira Code", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Interactive Canvas Studio - Draw Your Sketch Here!', canvas.width / 2, canvas.height * 0.85);
    ctx.restore();
  }

  window.addEventListener('resize', resizeCanvas);
  setTimeout(resizeCanvas, 100);

  function startDrawing(e) {
    isDrawing = true;
    const pos = getPos(e);
    lastX = pos.x;
    lastY = pos.y;
  }

  function draw(e) {
    if (!isDrawing) return;
    const pos = getPos(e);

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);

    if (currentTool === 'eraser') {
      ctx.strokeStyle = '#0d0f17';
      ctx.lineWidth = currentSize * 3;
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = currentSize;
      ctx.shadowBlur = 8;
      ctx.shadowColor = currentColor;
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastX = pos.x;
    lastY = pos.y;
  }

  function stopDrawing() { isDrawing = false; }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      currentColor = swatch.getAttribute('data-color');
      currentTool = 'brush';
      toolBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-tool="brush"]').classList.add('active');
    });
  });

  if (brushSlider) {
    brushSlider.addEventListener('input', (e) => {
      currentSize = e.target.value;
      if (sizeValueSpan) sizeValueSpan.textContent = `${currentSize}px`;
    });
  }

  toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toolBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTool = btn.getAttribute('data-tool');
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      ctx.fillStyle = '#0d0f17';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      showToast('🎨 Canvas cleared!');
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', () => {
      const imageURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'my_portfolio_sketch.png';
      link.href = imageURL;
      link.click();
      showToast('📥 Sketch downloaded successfully!');
    });
  }
}

/* --- Project Filter Tabs --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- Scroll Reveal Animations --- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.glass-card, .timeline-item, .project-card, .art-card, .skill-category-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/* --- Animated Skill Bars --- */
function initSkillBars() {
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.progress-bar-fill');
        fills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-progress');
          fill.style.width = `${targetWidth}%`;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skills-grid').forEach(el => skillObserver.observe(el));
}

/* --- Contact Form Handler --- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const email = document.getElementById('formEmail').value;
    const message = document.getElementById('formMessage').value;

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      form.reset();
      showToast('🚀 Thank you! Your message has been sent.');
    }, 1200);
  });
}

/* --- Toast Notification Utility --- */
function showToast(message) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

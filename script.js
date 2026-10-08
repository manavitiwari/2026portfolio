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
  initUiuxFilters();
  initArtModal();
  initDemoModal();
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
    'Junior Developer & DevRel',
    'UI/UX & Product Designer',
    'Figma Design Systems & Wireframing',
    'Ojas AI Research Lab',
    'Software Engineer (1+ Yrs)',
    'Frontend & Web Developer',
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
      const artCards = document.querySelectorAll('#artGrid .art-card');

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

/* --- Dedicated UI/UX Section Subnav Category Filter --- */
function initUiuxFilters() {
  const uiuxTabBtns = document.querySelectorAll('.uiux-tab-btn');
  const uiuxCards = document.querySelectorAll('.uiux-card');

  uiuxTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      uiuxTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-uiux-filter');

      uiuxCards.forEach(card => {
        const category = card.getAttribute('data-uiux-category');

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

/* --- Artwork Lightbox Modal & One-By-One Sketch Gallery --- */
function initArtModal() {
  const artCards = document.querySelectorAll('.art-card');
  const modal = document.getElementById('artModal');
  if (!modal) return;

  const modalImg = document.getElementById('modalArtImg');
  const modalTitle = document.getElementById('modalArtTitle');
  const modalCategory = document.getElementById('modalArtCategory');
  const modalDesc = document.getElementById('modalArtDesc');
  const closeBtn = document.querySelector('.art-modal-close');
  
  const prevBtn = document.getElementById('modalPrevBtn');
  const nextBtn = document.getElementById('modalNextBtn');
  const counterBox = document.getElementById('modalGalleryCounter');
  const counterText = document.getElementById('counterText');
  const nextSketchAction = document.getElementById('nextSketchAction');
  const nextSketchBtn = document.getElementById('nextSketchBtn');
  const nextTitleHint = document.getElementById('nextTitleHint');
  const thumbStrip = document.getElementById('modalThumbStrip');

  // Collection of all 4 hand-drawn pencil & charcoal sketches
  const sketchCollection = [
    {
      img: 'assets/sketch_glasses_framed.jpg?v=3',
      title: 'Eyeglasses & Lips Pencil Sketch',
      category: 'Manavi Tiwari Original Sketch (1 of 4)',
      desc: 'Clean white sketch paper artwork featuring eyes with stylish glasses, lips & signature by Manavi Tiwari.'
    },
    {
      img: 'assets/sketch_crying_framed.jpg?v=3',
      title: 'Tear & Windblown Hair Charcoal Portrait',
      category: 'Manavi Tiwari Original Sketch (2 of 4)',
      desc: 'Framed original photo of dramatic charcoal portrait sketch with tear drop on cheek and flowing hair, signed Manavi.'
    },
    {
      img: 'assets/sketch_hibiscus_framed.jpg?v=3',
      title: 'Hibiscus Botanical Graphite Sketch',
      category: 'Manavi Tiwari Original Sketch (3 of 4)',
      desc: 'Framed original photo of detailed graphite pencil sketch of Hibiscus flowers & leaves, signed Manavi Tiwari.'
    },
    {
      img: 'assets/sketch_sailboat_framed.jpg?v=3',
      title: 'Moonlight Ocean Sailboat Charcoal Art',
      category: 'Manavi Tiwari Original Sketch (4 of 4)',
      desc: 'Framed original photo of dramatic charcoal ocean landscape sketch of a sailboat under full moon & clouds, signed Manavi Dubey.'
    }
  ];

  let currentSketchIdx = 0;
  let isGalleryMode = false;

  function renderThumbnails() {
    if (!thumbStrip) return;
    thumbStrip.innerHTML = '';
    sketchCollection.forEach((item, idx) => {
      const thumb = document.createElement('img');
      thumb.src = item.img;
      thumb.alt = item.title;
      thumb.className = `modal-thumb ${idx === currentSketchIdx ? 'active' : ''}`;
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        currentSketchIdx = idx;
        showSketch(currentSketchIdx);
      });
      thumbStrip.appendChild(thumb);
    });
  }

  function showSketch(idx) {
    const item = sketchCollection[idx];
    if (!item) return;

    if (modalImg) {
      modalImg.style.opacity = '0.4';
      modalImg.style.transform = 'scale(0.96)';
      setTimeout(() => {
        modalImg.src = item.img;
        modalImg.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
      }, 150);
    }

    if (modalTitle) modalTitle.textContent = item.title;
    if (modalCategory) modalCategory.textContent = item.category;
    if (modalDesc) modalDesc.textContent = item.desc;
    if (counterText) counterText.textContent = `Sketch ${idx + 1} of ${sketchCollection.length}`;

    const nextIdx = (idx + 1) % sketchCollection.length;
    if (nextTitleHint) nextTitleHint.textContent = `(${sketchCollection[nextIdx].title.split(' ')[0]}...)`;

    // Highlight active thumbnail
    if (thumbStrip) {
      const thumbs = thumbStrip.querySelectorAll('.modal-thumb');
      thumbs.forEach((t, i) => {
        if (i === idx) t.classList.add('active');
        else t.classList.remove('active');
      });
    }
  }

  artCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.add('card-rotating');
      setTimeout(() => card.classList.remove('card-rotating'), 650);

      const isGallery = card.getAttribute('data-is-gallery') === 'true' || card.getAttribute('data-art-category') === 'sketch';

      if (isGallery) {
        isGalleryMode = true;
        currentSketchIdx = 0;
        
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (counterBox) counterBox.style.display = 'inline-flex';
        if (nextSketchAction) nextSketchAction.style.display = 'block';
        if (thumbStrip) thumbStrip.style.display = 'flex';

        renderThumbnails();
        showSketch(currentSketchIdx);
      } else {
        isGalleryMode = false;

        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (counterBox) counterBox.style.display = 'none';
        if (nextSketchAction) nextSketchAction.style.display = 'none';
        if (thumbStrip) thumbStrip.style.display = 'none';

        const imgSrc = card.getAttribute('data-img');
        const title = card.getAttribute('data-title');
        const category = card.getAttribute('data-category-name');
        const desc = card.getAttribute('data-desc');

        if (modalImg) modalImg.src = imgSrc;
        if (modalTitle) modalTitle.textContent = title;
        if (modalCategory) modalCategory.textContent = category;
        if (modalDesc) modalDesc.textContent = desc;
      }

      modal.classList.add('open');
    });
  });

  function nextSketch() {
    if (!isGalleryMode) return;
    currentSketchIdx = (currentSketchIdx + 1) % sketchCollection.length;
    showSketch(currentSketchIdx);
  }

  function prevSketch() {
    if (!isGalleryMode) return;
    currentSketchIdx = (currentSketchIdx - 1 + sketchCollection.length) % sketchCollection.length;
    showSketch(currentSketchIdx);
  }

  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSketch(); });
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSketch(); });
  if (nextSketchBtn) nextSketchBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSketch(); });
  if (modalImg) modalImg.addEventListener('click', () => { if (isGalleryMode) nextSketch(); });

  // Keyboard navigation (Left / Right Arrow Keys)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open') || !isGalleryMode) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSketch();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSketch();
    } else if (e.key === 'Escape') {
      modal.classList.remove('open');
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });
}

/* --- Live Interactive Project Demo Modal Simulator --- */
function initDemoModal() {
  const demoModal = document.getElementById('demoModal');
  const demoCloseBtn = document.getElementById('demoModalClose');
  const openDemoBtns = document.querySelectorAll('.open-demo-btn');
  const demoTitle = document.getElementById('demoTitle');
  const demoDesc = document.getElementById('demoDesc');
  const demoSimulator = document.getElementById('demoSimulator');

  if (!demoModal || !demoSimulator) return;

  function renderInteractiveGymApp() {
    demoSimulator.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Gym App Header Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; background: linear-gradient(135deg, rgba(242, 78, 30, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%); padding: 1rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid rgba(242, 78, 30, 0.3);">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div style="width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #ff7247, #f24e1e); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 1.1rem;">P</div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.75rem; color: #ff7247; text-transform: uppercase;">PULSEFIT MOBILE DASHBOARD</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #fff;">Welcome back, Priyank! 💪</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem; background: rgba(0,0,0,0.4); padding: 0.5rem 0.85rem; border-radius: 20px; border: 1px solid rgba(255,114,71,0.3);">
            <i class="fa-solid fa-heart-pulse" style="color: #ff3b30; font-size: 1.1rem; animation: pulse 1.2s infinite;"></i>
            <span style="font-family: var(--font-mono); font-weight: 700; color: #fff; font-size: 0.95rem;"><span id="gymHeartRate">142</span> BPM</span>
          </div>
        </div>

        <!-- Live Workout Metrics Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem;">
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(242, 78, 30, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">WORKOUT DURATION</div>
            <div id="gymTimer" style="font-size: 1.4rem; font-weight: 700; color: #ff7247; margin: 0.25rem 0;">00:44:28</div>
            <div style="font-size: 0.75rem; color: #00f5d4;"><i class="fa-solid fa-fire"></i> Chest & Triceps Day</div>
          </div>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(242, 78, 30, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">CALORIES BURNED</div>
            <div id="gymCalories" style="font-size: 1.4rem; font-weight: 700; color: #00f2fe; margin: 0.25rem 0;">548 kcal</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Target: 750 kcal</div>
          </div>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(242, 78, 30, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">COMPLETED SETS</div>
            <div id="gymSetsCount" style="font-size: 1.4rem; font-weight: 700; color: #00f5d4; margin: 0.25rem 0;">10 / 16</div>
            <div style="font-size: 0.75rem; color: #ff7247;">62.5% Complete</div>
          </div>
        </div>

        <!-- Interactive Workout Routine Checklist for Priyank -->
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-glass); padding: 1.25rem; border-radius: var(--radius-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; font-size: 0.9rem; font-weight: 600; color: #fff;">
            <span><i class="fa-solid fa-list-check" style="color: #ff7247; margin-right: 0.5rem;"></i> Priyank's Workout Routine Checklist (Click Items to Complete)</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">HYPERTROPHY MODE</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.65rem;" id="gymRoutineList">
            <div class="gym-check-item completed" style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,245,212,0.08); border: 1px solid rgba(0,245,212,0.3); padding: 0.75rem 1rem; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-circle-check" style="color: #00f5d4; font-size: 1.1rem;"></i>
                <div>
                  <div style="font-weight: 600; font-size: 0.92rem; color: #fff; text-decoration: line-through; opacity: 0.85;">Barbell Flat Bench Press</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">4 Sets x 10 Reps • 85 kg (Completed)</div>
                </div>
              </div>
              <span class="badge" style="background: rgba(0,245,212,0.2); color: #00f5d4; font-size: 0.7rem; padding: 0.25rem 0.6rem; border-radius: 12px;">Done</span>
            </div>

            <div class="gym-check-item completed" style="display: flex; align-items: center; justify-content: space-between; background: rgba(0,245,212,0.08); border: 1px solid rgba(0,245,212,0.3); padding: 0.75rem 1rem; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-solid fa-circle-check" style="color: #00f5d4; font-size: 1.1rem;"></i>
                <div>
                  <div style="font-weight: 600; font-size: 0.92rem; color: #fff; text-decoration: line-through; opacity: 0.85;">Incline Dumbbell Press</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">3 Sets x 12 Reps • 32 kg (Completed)</div>
                </div>
              </div>
              <span class="badge" style="background: rgba(0,245,212,0.2); color: #00f5d4; font-size: 0.7rem; padding: 0.25rem 0.6rem; border-radius: 12px;">Done</span>
            </div>

            <div class="gym-check-item" style="display: flex; align-items: center; justify-content: space-between; background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-glass); padding: 0.75rem 1rem; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-regular fa-circle" style="color: var(--text-muted); font-size: 1.1rem;"></i>
                <div>
                  <div style="font-weight: 600; font-size: 0.92rem; color: #fff;">Cable Chest Flyes & Pullovers</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">3 Sets x 15 Reps • 20 kg (Next Up)</div>
                </div>
              </div>
              <span class="badge" style="background: rgba(255,114,71,0.2); color: #ff7247; font-size: 0.7rem; padding: 0.25rem 0.6rem; border-radius: 12px;">Pending</span>
            </div>

            <div class="gym-check-item" style="display: flex; align-items: center; justify-content: space-between; background: rgba(15, 23, 42, 0.8); border: 1px solid var(--border-glass); padding: 0.75rem 1rem; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <i class="fa-regular fa-circle" style="color: var(--text-muted); font-size: 1.1rem;"></i>
                <div>
                  <div style="font-weight: 600; font-size: 0.92rem; color: #fff;">Tricep Skullcrushers & Dips</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">3 Sets x 15 Reps • Bodyweight</div>
                </div>
              </div>
              <span class="badge" style="background: rgba(255,114,71,0.2); color: #ff7247; font-size: 0.7rem; padding: 0.25rem 0.6rem; border-radius: 12px;">Pending</span>
            </div>
          </div>
        </div>

      </div>
    `;

    // Heartbeat & timer simulator interval
    const heartEl = document.getElementById('gymHeartRate');
    const timerEl = document.getElementById('gymTimer');
    const calEl = document.getElementById('gymCalories');
    let seconds = 2668;

    if (heartEl && timerEl) {
      setInterval(() => {
        if (!demoModal.classList.contains('open')) return;
        const bpm = 138 + Math.floor(Math.random() * 8);
        heartEl.textContent = bpm;

        seconds++;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        timerEl.textContent = `00:${m}:${s}`;

        if (seconds % 5 === 0 && calEl) {
          const currentCal = parseInt(calEl.textContent) || 548;
          calEl.textContent = `${currentCal + 1} kcal`;
        }
      }, 1000);
    }

    const checkItems = demoSimulator.querySelectorAll('.gym-check-item');
    const setsCountEl = document.getElementById('gymSetsCount');

    checkItems.forEach(item => {
      item.addEventListener('click', () => {
        const icon = item.querySelector('i');
        const title = item.querySelector('div > div:first-child');
        const badge = item.querySelector('.badge');

        if (item.classList.contains('completed')) {
          item.classList.remove('completed');
          item.style.background = 'rgba(15, 23, 42, 0.8)';
          item.style.borderColor = 'var(--border-glass)';
          icon.className = 'fa-regular fa-circle';
          icon.style.color = 'var(--text-muted)';
          title.style.textDecoration = 'none';
          title.style.opacity = '1';
          badge.style.background = 'rgba(255,114,71,0.2)';
          badge.style.color = '#ff7247';
          badge.textContent = 'Pending';
        } else {
          item.classList.add('completed');
          item.style.background = 'rgba(0,245,212,0.08)';
          item.style.borderColor = 'rgba(0,245,212,0.3)';
          icon.className = 'fa-solid fa-circle-check';
          icon.style.color = '#00f5d4';
          title.style.textDecoration = 'line-through';
          title.style.opacity = '0.85';
          badge.style.background = 'rgba(0,245,212,0.2)';
          badge.style.color = '#00f5d4';
          badge.textContent = 'Done';
        }

        const totalCompleted = demoSimulator.querySelectorAll('.gym-check-item.completed').length;
        if (setsCountEl) {
          const completedSets = totalCompleted === 4 ? 16 : totalCompleted === 3 ? 13 : totalCompleted === 2 ? 10 : totalCompleted === 1 ? 4 : 0;
          const percent = ((completedSets / 16) * 100).toFixed(1);
          setsCountEl.textContent = `${completedSets} / 16`;
          if (setsCountEl.nextElementSibling) {
            setsCountEl.nextElementSibling.textContent = `${percent}% Complete`;
          }
        }
      });
    });
  }

  function renderInteractiveDashboard() {
    demoSimulator.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        
        <!-- Live Ticker & Filters Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; background: rgba(15, 23, 42, 0.8); padding: 0.85rem 1.25rem; border-radius: var(--radius-sm); border: 1px solid var(--border-glass);">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="status-dot" style="background: #00f2fe;"></span>
            <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-main); font-weight: 600;">
              Live Traffic: <span id="liveUserTicker" style="color: #00f2fe;">1,482</span> Active Visitors Online
            </span>
          </div>
          <div class="demo-filter-group" style="display: flex; gap: 0.5rem;">
            <button class="tool-btn active demo-time-btn" data-time="realtime">Real-Time</button>
            <button class="tool-btn demo-time-btn" data-time="24h">24h Summary</button>
            <button class="tool-btn demo-time-btn" data-time="7d">Weekly Peak</button>
          </div>
        </div>

        <!-- Metric Stat Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 1rem;">
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">TOTAL REQUESTS</div>
            <div id="statReq" style="font-size: 1.4rem; font-weight: 700; color: #fff; margin: 0.25rem 0;">4,829,102</div>
            <div style="font-size: 0.75rem; color: #00f5d4;"><i class="fa-solid fa-arrow-trend-up"></i> +12.4% vs last hr</div>
          </div>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">AVG API LATENCY</div>
            <div id="statLat" style="font-size: 1.4rem; font-weight: 700; color: #00f2fe; margin: 0.25rem 0;">18.4 ms</div>
            <div style="font-size: 0.75rem; color: #00f5d4;"><i class="fa-solid fa-check"></i> Optimal speed</div>
          </div>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">CONVERSION RATE</div>
            <div id="statConv" style="font-size: 1.4rem; font-weight: 700; color: #ff7247; margin: 0.25rem 0;">4.85%</div>
            <div style="font-size: 0.75rem; color: #ff7247;"><i class="fa-solid fa-fire"></i> +2.1% funnel boost</div>
          </div>
          <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(59, 130, 246, 0.3); padding: 1rem; border-radius: var(--radius-sm);">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">SYSTEM HEALTH</div>
            <div id="statHealth" style="font-size: 1.4rem; font-weight: 700; color: #00f5d4; margin: 0.25rem 0;">99.98%</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">All nodes green</div>
          </div>
        </div>

        <!-- Telemetry SVG Bar Visualizer -->
        <div style="background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-glass); padding: 1.25rem; border-radius: var(--radius-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; font-size: 0.85rem; color: var(--text-muted); font-family: var(--font-mono);">
            <span>LIVE THROUGHPUT SPECTRUM (MB/s)</span>
            <span style="color: #00f2fe;"><i class="fa-solid fa-chart-simple"></i> Active Engine</span>
          </div>
          <div id="telemetryBars" style="display: flex; align-items: flex-end; gap: 8px; height: 110px; padding-top: 10px;">
            ${[65, 40, 85, 30, 95, 70, 50, 90, 60, 100, 45, 80, 55, 75, 90, 60, 40, 85].map(val => `
              <div class="telemetry-bar" style="flex: 1; height: ${val}%; background: linear-gradient(180deg, #00f2fe 0%, #3b82f6 100%); border-radius: 4px; transition: height 0.4s ease;"></div>
            `).join('')}
          </div>
        </div>

      </div>
    `;

    // Live Ticker Interval
    const tickerEl = document.getElementById('liveUserTicker');
    if (tickerEl) {
      setInterval(() => {
        if (!demoModal.classList.contains('open')) return;
        const current = parseInt(tickerEl.textContent.replace(',', '')) || 1482;
        const delta = Math.floor(Math.random() * 15) - 7;
        tickerEl.textContent = (current + delta).toLocaleString();
      }, 1800);
    }

    // Time Filter Interactive Button Handlers
    const timeBtns = demoSimulator.querySelectorAll('.demo-time-btn');
    const bars = demoSimulator.querySelectorAll('.telemetry-bar');

    timeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        timeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        bars.forEach(bar => {
          const randomH = Math.floor(Math.random() * 75) + 25;
          bar.style.height = `${randomH}%`;
        });
      });
    });
  }

  // Re-query dynamically to support elements added to DOM
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-demo-btn');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    const title = btn.getAttribute('data-demo-title') || 'Aether Analytics Real-Time Dashboard';
    const desc = btn.getAttribute('data-demo-desc') || 'Interactive real-time telemetry dashboard simulation.';
    const demoType = btn.getAttribute('data-demo-type') || 'telemetry';

    if (demoTitle) demoTitle.textContent = title;
    if (demoDesc) demoDesc.textContent = desc;

    if (demoType === 'gym') {
      renderInteractiveGymApp();
    } else {
      renderInteractiveDashboard();
    }

    demoModal.classList.add('open');
  });

  if (demoCloseBtn) {
    demoCloseBtn.addEventListener('click', () => demoModal.classList.remove('open'));
  }

  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) demoModal.classList.remove('open');
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

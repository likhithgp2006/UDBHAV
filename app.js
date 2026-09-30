// UDBHAV 2026: BIZTOPIA - Standalone JavaScript Engine

// --- 1. THREE.JS 3D QUANTUM FINANCIAL CONSTELLATION & WAVE MESH BACKGROUND ENGINE ---
let bgScene, bgCamera, bgRenderer, waveGridMesh, constellationPoints, linesMesh, dustPoints;
let teamMeshAura, teamMeshSync, teamMeshCresta, teamMeshZephora;
let scrollProgress = 0, mouseX = 0, mouseY = 0;

function init3DFinancialConstellation() {
  const canvas = document.getElementById('three-bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  bgScene = new THREE.Scene();
  bgScene.fog = new THREE.FogExp2(0x070b14, 0.012);

  bgCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  bgCamera.position.set(0, 25, 45);
  bgCamera.lookAt(0, 0, 0);

  bgRenderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  bgScene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f2fe, 3.0, 100);
  pointLight1.position.set(35, 40, 20);
  bgScene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffb703, 3.0, 100);
  pointLight2.position.set(-35, -30, -10);
  bgScene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0xd946ef, 2.5, 100);
  pointLight3.position.set(0, -20, 35);
  bgScene.add(pointLight3);

  // A. 3D Wave Mesh Grid (Wall Street Market Grid)
  const gridWidth = 150;
  const gridDepth = 150;
  const gridSegs = 50;
  const planeGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, gridSegs, gridSegs);
  planeGeo.rotateX(-Math.PI / 2);

  const planeMat = new THREE.MeshStandardMaterial({
    color: 0x07152b,
    emissive: 0x002244,
    wireframe: true,
    transparent: true,
    opacity: 0.45,
    roughness: 0.1,
    metalness: 0.9
  });
  waveGridMesh = new THREE.Mesh(planeGeo, planeMat);
  waveGridMesh.position.y = -10;
  bgScene.add(waveGridMesh);

  const originalPositions = planeGeo.attributes.position.array.slice();

  // B. 3D Floating Polyhedron Meshes representing 4 Teams (Aura, Sync, Cresta, Zephora)
  // 1. Team Aura (Gold Dodecahedron)
  const geoAura = new THREE.DodecahedronGeometry(2.2);
  const matAura = new THREE.MeshStandardMaterial({ color: 0xffb703, wireframe: true, emissive: 0xffb703, emissiveIntensity: 0.4 });
  teamMeshAura = new THREE.Mesh(geoAura, matAura);
  teamMeshAura.position.set(24, 10, -15);
  bgScene.add(teamMeshAura);

  // 2. Team Sync (Cyan TorusKnot)
  const geoSync = new THREE.TorusKnotGeometry(1.8, 0.45, 64, 12);
  const matSync = new THREE.MeshStandardMaterial({ color: 0x00f2fe, wireframe: true, emissive: 0x00f2fe, emissiveIntensity: 0.4 });
  teamMeshSync = new THREE.Mesh(geoSync, matSync);
  teamMeshSync.position.set(-24, 6, -10);
  bgScene.add(teamMeshSync);

  // 3. Team Cresta (Magenta Icosahedron)
  const geoCresta = new THREE.IcosahedronGeometry(2.0);
  const matCresta = new THREE.MeshStandardMaterial({ color: 0xd946ef, wireframe: true, emissive: 0xd946ef, emissiveIntensity: 0.4 });
  teamMeshCresta = new THREE.Mesh(geoCresta, matCresta);
  teamMeshCresta.position.set(20, -12, -20);
  bgScene.add(teamMeshCresta);

  // 4. Team Zephora (Emerald Octahedron)
  const geoZephora = new THREE.OctahedronGeometry(2.2);
  const matZephora = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: true, emissive: 0x10b981, emissiveIntensity: 0.4 });
  teamMeshZephora = new THREE.Mesh(geoZephora, matZephora);
  teamMeshZephora.position.set(-20, -14, -15);
  bgScene.add(teamMeshZephora);

  // C. 3D Constellation Nodes (Stock Market Data Points in Team Colors)
  const nodeCount = 200;
  const constGeo = new THREE.BufferGeometry();
  const constPositions = new Float32Array(nodeCount * 3);
  const constColors = new Float32Array(nodeCount * 3);

  const teamColors = [
    new THREE.Color(0xffb703), // Aura Gold
    new THREE.Color(0x00f2fe), // Sync Cyan
    new THREE.Color(0xd946ef), // Cresta Magenta
    new THREE.Color(0x10b981)  // Zephora Emerald
  ];

  for (let i = 0; i < nodeCount; i++) {
    const x = (Math.random() - 0.5) * 130;
    const y = (Math.random() - 0.5) * 45;
    const z = (Math.random() - 0.5) * 130;

    constPositions[i * 3] = x;
    constPositions[i * 3 + 1] = y;
    constPositions[i * 3 + 2] = z;

    const col = teamColors[i % teamColors.length];
    constColors[i * 3] = col.r;
    constColors[i * 3 + 1] = col.g;
    constColors[i * 3 + 2] = col.b;
  }

  constGeo.setAttribute('position', new THREE.BufferAttribute(constPositions, 3));
  constGeo.setAttribute('color', new THREE.BufferAttribute(constColors, 3));

  const constMat = new THREE.PointsMaterial({
    size: 0.85,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  constellationPoints = new THREE.Points(constGeo, constMat);
  bgScene.add(constellationPoints);

  // D. 3D Connecting Lines Network
  const linePositions = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      const dx = constPositions[i * 3] - constPositions[j * 3];
      const dy = constPositions[i * 3 + 1] - constPositions[j * 3 + 1];
      const dz = constPositions[i * 3 + 2] - constPositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < 18) {
        linePositions.push(
          constPositions[i * 3], constPositions[i * 3 + 1], constPositions[i * 3 + 2],
          constPositions[j * 3], constPositions[j * 3 + 1], constPositions[j * 3 + 2]
        );
      }
    }
  }

  const linesGeo = new THREE.BufferGeometry();
  linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const linesMat = new THREE.LineBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.2
  });
  linesMesh = new THREE.LineSegments(linesGeo, linesMat);
  bgScene.add(linesMesh);

  // E. 3D Ambient Dust Field (300 floating particles)
  const dustCount = 300;
  const dustGeo = new THREE.BufferGeometry();
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 160;
    dustPositions[i * 3 + 1] = Math.random() * 60 - 20;
    dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 160;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    size: 0.5,
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
  });
  dustPoints = new THREE.Points(dustGeo, dustMat);
  bgScene.add(dustPoints);

  // LISTENERS
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      scrollProgress = window.scrollY / maxScroll;
    }
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // ANIMATION LOOP
  let clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    // 1. Animate Wave Grid Vertices with Mouse Ripple Dynamics
    const pos = waveGridMesh.geometry.attributes.position.array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = originalPositions[i];
      const z = originalPositions[i + 2];

      const distToMouse = Math.sqrt(Math.pow(x - mouseX * 45, 2) + Math.pow(z - mouseY * 45, 2));
      const ripple = Math.sin(distToMouse * 0.35 - elapsed * 4) * Math.max(0, 3.5 - distToMouse * 0.08);

      const wave1 = Math.sin(x * 0.12 + elapsed * 1.5 + scrollProgress * 5) * 3.0;
      const wave2 = Math.cos(z * 0.12 + elapsed * 1.2) * 2.5;
      pos[i + 1] = wave1 + wave2 + ripple;
    }
    waveGridMesh.geometry.attributes.position.needsUpdate = true;

    // 2. Rotate Floating Team Polyhedrons
    if (teamMeshAura) {
      teamMeshAura.rotation.x = elapsed * 0.4;
      teamMeshAura.rotation.y = elapsed * 0.6;
      teamMeshAura.position.y = 10 + Math.sin(elapsed * 1.5) * 1.5;
    }
    if (teamMeshSync) {
      teamMeshSync.rotation.x = elapsed * 0.5;
      teamMeshSync.rotation.z = elapsed * 0.3;
      teamMeshSync.position.y = 6 + Math.cos(elapsed * 1.8) * 1.5;
    }
    if (teamMeshCresta) {
      teamMeshCresta.rotation.y = elapsed * 0.6;
      teamMeshCresta.rotation.z = elapsed * 0.4;
      teamMeshCresta.position.y = -12 + Math.sin(elapsed * 1.2) * 1.8;
    }
    if (teamMeshZephora) {
      teamMeshZephora.rotation.x = elapsed * 0.3;
      teamMeshZephora.rotation.y = elapsed * 0.5;
      teamMeshZephora.position.y = -14 + Math.cos(elapsed * 1.4) * 1.5;
    }

    // 3. Upward Drift for Dust Particles
    const dustArr = dustPoints.geometry.attributes.position.array;
    for (let i = 1; i < dustArr.length; i += 3) {
      dustArr[i] += 0.04;
      if (dustArr[i] > 40) dustArr[i] = -20;
    }
    dustPoints.geometry.attributes.position.needsUpdate = true;

    // 4. Scroll-Driven Camera Motion & Tilt
    bgCamera.position.x += (mouseX * 6 - bgCamera.position.x) * 0.05;
    bgCamera.position.y += ((25 + scrollProgress * 20 - mouseY * 4) - bgCamera.position.y) * 0.05;
    bgCamera.position.z += ((45 - scrollProgress * 15) - bgCamera.position.z) * 0.05;
    bgCamera.lookAt(0, scrollProgress * 5, 0);

    // 5. Rotate Constellation Nodes
    constellationPoints.rotation.y = elapsed * 0.04 + scrollProgress * Math.PI;
    linesMesh.rotation.y = elapsed * 0.04 + scrollProgress * Math.PI;

    bgRenderer.render(bgScene, bgCamera);
  }
  animate();

  window.addEventListener('resize', () => {
    if (!bgRenderer || !bgCamera) return;
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// --- 2. INTERACTIVE 3D CARD TILT ANIMATION ENGINE ---
function init3DCardsTilt() {
  const cards = document.querySelectorAll('.glass-panel');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

// --- 3. SCROLL-DRIVEN ENTRANCE REVEAL MOTION ENGINE ---
function initScrollReveal() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

// --- 4. DYNAMIC INTERACTIVE PARTICLE BURST ON HEADLINE ---
function triggerTitleBurst(e) {
  if (typeof confetti === 'undefined') return;

  const rect = e.currentTarget.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 80,
    spread: 90,
    origin: { x: x, y: y },
    colors: ['#00f2fe', '#ffb703', '#d946ef', '#10b981']
  });
}

// --- 5. COUNTDOWN TIMER ---
function updateCountdown() {
  const festStartDate = new Date('2026-08-24T09:00:00+05:30');
  const festEndDate = new Date('2026-08-25T17:00:00+05:30');
  const now = new Date();

  const dEl = document.getElementById('cnt-days');
  const hEl = document.getElementById('cnt-hours');
  const mEl = document.getElementById('cnt-mins');
  const sEl = document.getElementById('cnt-secs');
  const labelEl = document.getElementById('cnt-label');

  if (!dEl || !hEl || !mEl || !sEl) return;

  if (now < festStartDate) {
    const diff = festStartDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    dEl.innerText = days.toString().padStart(2, '0');
    hEl.innerText = hours.toString().padStart(2, '0');
    mEl.innerText = mins.toString().padStart(2, '0');
    sEl.innerText = secs.toString().padStart(2, '0');

    if (labelEl) {
      labelEl.innerText = 'FEST COUNTDOWN';
      labelEl.className = 'text-xs font-bold font-tech text-[#00f2fe] uppercase tracking-widest mb-1';
    }
  } else if (now >= festStartDate && now <= festEndDate) {
    dEl.innerText = '00';
    hEl.innerText = '00';
    mEl.innerText = '00';
    sEl.innerText = '00';

    if (labelEl) {
      labelEl.innerText = '🔴 BIZTOPIA IS LIVE NOW!';
      labelEl.className = 'text-xs font-bold font-tech text-[#10b981] uppercase tracking-widest mb-1 animate-pulse';
    }
  } else {
    dEl.innerText = '00';
    hEl.innerText = '00';
    mEl.innerText = '00';
    sEl.innerText = '00';

    if (labelEl) {
      labelEl.innerText = 'BIZTOPIA 2026 CONCLUDED';
      labelEl.className = 'text-xs font-bold font-tech text-gray-400 uppercase tracking-widest mb-1';
    }
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// --- 6. EVENTS PORTAL ENGINE ---
const eventsList = [
  { id: 1, title: 'BUSINESS QUIZ – BIZ BLITZ', cat: 'Quiz', format: 'Team of 2', faculty: 'Mr. Samuel', student: 'Aadithya Anand III A, Angelinna II B', about: 'Intellectually stimulating business quiz evaluating knowledge of commerce, business management, economics, finance, current affairs, and corporate trends.', rules: ['Participation in teams of 2.', 'Multiple elimination rounds.', 'Report 15 mins before event.', 'Electronic gadgets strictly prohibited.', 'Malpractice leads to disqualification.', "Judges' decisions final."] },
  { id: 2, title: 'BEST MANAGER – MANAGIX', cat: 'Management', format: 'Individual', faculty: 'Ms. Binila B. Chandran', student: 'Sumbhram III C, Sagarika II D', about: 'Identify the most competent future manager by testing leadership, communication, business acumen, analytical thinking, creativity, and crisis management.', rules: ['Individual participation.', 'Carry updated resume and laptop.', 'Formal business attire compulsory.', 'Strictly adhere to time limits.', "Judges' decision final."] },
  { id: 3, title: 'BEST MARKETING TEAM – PITCHCRAFT', cat: 'Marketing', format: 'Team of 3-4', faculty: 'Dr. Rathish. G', student: 'Dani III D, Meghan III B, Shailashree II D', about: 'Dynamic marketing and public relations competition creating impactful marketing campaigns and persuasive promotional strategies for real-world scenarios.', rules: ['Team of 3-4.', 'Product/case announced on the spot.', 'Present original marketing strategies.', 'Time limits strictly followed.', "Judges' decision final."] },
  { id: 4, title: 'SHARK TANK – INVENZA', cat: 'Entrepreneurship', format: 'Team of 2', faculty: 'Ms. Samisha B.', student: 'Varun III B, Tarun II B', about: 'Pitch innovative business ideas before an expert investor panel. Present feasible business models, market understanding, and defend ideas.', rules: ['Team of 2.', 'Ideas must be original and feasible.', 'Plagiarism results in disqualification.', 'Must include business model and financial overview.', "Judges' decision final."] },
  { id: 5, title: 'CORPORATE WALK – EXECUTIVE AVENUE', cat: 'Fashion', format: 'Team of 8-12', faculty: 'Dr. Harmeet Matharu', student: 'Neha III C, Gunashree II B', about: 'Fashion showcase creatively interpreting the assigned Biztopia theme through professional styling, choreography, storytelling, and stage presence.', rules: ['Team of 8-12.', 'Performance time strictly capped.', 'Costumes and music must match theme.', 'Professionalism compulsory.', "Judges' decision final."] },
  { id: 6, title: 'BEST ACCOUNTANT – LEDGER LEGENDS', cat: 'Finance', format: 'Individual', faculty: 'Ms. Suneetha K. S.', student: 'Shrujan Subbaiah III A, Khushal III B, Martina II C', about: 'Evaluates expertise in accounting, financial reporting, taxation, and analytical problem-solving with accuracy and practical precision.', rules: ['Individual participation.', 'Bring calculator and stationery.', 'Mobile phones/internet prohibited.', 'Accuracy essential.', "Judges' decision final."] },
  { id: 7, title: 'MOCK STOCK – WALL STREET WARS', cat: 'Finance', format: 'Team of 2', faculty: 'Mr. Shamanth B. S.', student: 'Deekshith III D, Ryan III A, Hansini II B', about: 'Live stock market simulation where participants experience the excitement of investing, analyzing market conditions, and managing virtual portfolios.', rules: ['Team of 2.', 'Virtual investment portfolio provided.', 'Market scenarios introduced live.', 'Justify investment decisions.', "Judges' decision final."] },
  { id: 8, title: 'PUBLIC SPEAKING – VOICES OF INDUSTRY', cat: 'Oratory', format: 'Individual', faculty: 'Mr. Abin Baby', student: 'Sandeep III A, Shrinidhi III D, Viona II A', about: 'Oratory competition encouraging participants to express ideas with confidence, clarity, conviction, and persuasive eloquence.', rules: ['Individual participation.', 'Topics announced on spot.', 'Adhere to speaking time.', 'Offensive language prohibited.', "Judges' decision final."] },
  { id: 9, title: 'CORPORATE HR – HR X', cat: 'HR', format: 'Team of 2', faculty: 'Dr. Radha T.', student: 'Riya III D, Monisha III B, Varsha II C', about: 'Corporate HR Management simulation placing participants in HR leadership roles to recruit talent, address workplace crises, and develop strategic solutions.', rules: ['Team of 2.', 'Analyze case scenarios.', 'Present ethical HR solutions.', 'Professional attire mandatory.', "Judges' decision final."] },
  { id: 10, title: 'FUN ARENA – CARNIVAL CORNER', cat: 'Recreational', format: 'Team of 4', faculty: 'Ms. Sabeena L.', student: 'Shwetha Munirai II C, Mridul II C, Prashanth II D, Deeksha II A', about: 'Recreational event featuring engaging team games promoting coordination, enthusiasm, teamwork, and sportsmanship.', rules: ['Team of 4.', 'Report before scheduled time.', 'Fair play mandatory.', 'Unsporting behavior leads to disqualification.', "Judges' decision final."] }
];

let selectedCategory = 'All';

function renderEventsGrid() {
  const grid = document.getElementById('events-grid');
  const searchVal = (document.getElementById('event-search')?.value || '').toLowerCase();
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = eventsList.filter(e => {
    const matchCat = selectedCategory === 'All' || e.cat.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchSearch = e.title.toLowerCase().includes(searchVal) || e.faculty.toLowerCase().includes(searchVal) || (e.student && e.student.toLowerCase().includes(searchVal)) || e.about.toLowerCase().includes(searchVal);
    return matchCat && matchSearch;
  });

  filtered.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'glass-panel p-6 flex flex-col justify-between hover:border-[#00f2fe]/40 transition-all';
    card.innerHTML = `
      <div>
        <div class="flex justify-between items-center mb-3">
          <span class="badge-tag badge-sync text-[10px]">${ev.cat}</span>
          <span class="text-xs text-gray-400 font-semibold">${ev.format}</span>
        </div>
        <h3 class="font-heading font-extrabold text-xl text-white mb-2">${ev.title}</h3>
        <p class="text-xs text-gray-400 line-clamp-3 mb-3">${ev.about}</p>
        <div class="text-[11px] text-gray-300 mb-1">Faculty: <strong class="text-white">${ev.faculty}</strong></div>
        <div class="text-[11px] text-gray-300 mb-4">Student Coordinators: <strong class="text-white">${ev.student}</strong></div>
      </div>
      <div class="pt-3 border-t border-white/10 flex justify-between items-center">
        <button onclick="openRulesModal(${ev.id})" class="text-xs font-bold text-[#00f2fe] hover:underline">View Rules & Info</button>
        <button onclick="openRegisterModal()" class="glow-btn-cyan text-[11px] py-1 px-3">Register</button>
      </div>
    `;
    grid.appendChild(card);
  });

  init3DCardsTilt();
}

function setCategoryFilter(cat) {
  selectedCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(btn => {
    if (btn.innerText.includes(cat)) {
      btn.className = 'cat-btn active px-3 py-1.5 rounded-xl text-xs font-bold bg-[#00f2fe] text-[#070b14]';
    } else {
      btn.className = 'cat-btn px-3 py-1.5 rounded-xl text-xs font-bold text-gray-400 hover:text-white';
    }
  });
  renderEventsGrid();
}

function filterEvents() {
  renderEventsGrid();
}

function openRulesModal(id) {
  const ev = eventsList.find(e => e.id === id);
  if (!ev) return;

  document.getElementById('modal-event-cat').innerText = ev.cat + ' • ' + ev.format;
  document.getElementById('modal-event-title').innerText = ev.title;
  document.getElementById('modal-event-about').innerText = ev.about;
  document.getElementById('modal-event-faculty').innerText = ev.faculty;
  document.getElementById('modal-event-student').innerText = ev.student;

  const rulesList = document.getElementById('modal-event-rules');
  rulesList.innerHTML = '';
  ev.rules.forEach(r => {
    const li = document.createElement('li');
    li.innerText = '• ' + r;
    rulesList.appendChild(li);
  });

  document.getElementById('event-rules-modal').classList.add('active');
}

function closeRulesModal() {
  document.getElementById('event-rules-modal').classList.remove('active');
}

// --- 7. MOCK STOCK TICKER SIMULATOR WITH FLASH PULSE MOTION ---
let userCash = 10000;
const stocks = [
  { ticker: 'AURA.FIN', name: 'Aura Capital', price: 142.50 },
  { ticker: 'SYNC.LOG', name: 'Sync Global Trade', price: 98.20 },
  { ticker: 'CRST.AI', name: 'Cresta Quantum AI', price: 215.80 },
  { ticker: 'ZEPH.LD', name: 'Zephora Holdings', price: 175.10 }
];

function renderStockGrid() {
  const grid = document.getElementById('stock-ticker-grid');
  if (!grid) return;
  grid.innerHTML = '';

  stocks.forEach(s => {
    const card = document.createElement('div');
    card.id = 'stock-card-' + s.ticker.replace('.', '-');
    card.className = 'bg-slate-950/80 p-4 rounded-xl border border-white/10 text-xs transition-colors duration-500';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-1">
        <div>
          <strong class="font-tech text-white text-sm block">${s.ticker}</strong>
          <span class="text-[10px] text-gray-400">${s.name}</span>
        </div>
      </div>
      <div class="font-tech text-xl font-bold text-white mb-3">$${s.price.toFixed(2)}</div>
      <div class="flex gap-2">
        <button onclick="buyStock('${s.ticker}')" class="flex-1 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors">Buy</button>
        <button onclick="sellStock('${s.ticker}')" class="flex-1 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 font-bold border border-rose-500/40 hover:bg-rose-500/30 transition-colors">Sell</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function buyStock(ticker) {
  const st = stocks.find(s => s.ticker === ticker);
  if (st && userCash >= st.price) {
    userCash -= st.price;
    document.getElementById('user-cash').innerText = '$' + userCash.toFixed(2);
  }
}

function sellStock(ticker) {
  const st = stocks.find(s => s.ticker === ticker);
  if (st) {
    userCash += st.price;
    document.getElementById('user-cash').innerText = '$' + userCash.toFixed(2);
  }
}

setInterval(() => {
  stocks.forEach(s => {
    const delta = (Math.random() - 0.48) * 3;
    const oldPrice = s.price;
    s.price = Math.max(10, +(s.price + delta).toFixed(2));

    const cardEl = document.getElementById('stock-card-' + s.ticker.replace('.', '-'));
    if (cardEl) {
      cardEl.classList.remove('flash-up', 'flash-down');
      void cardEl.offsetWidth; // reflow
      if (s.price > oldPrice) {
        cardEl.classList.add('flash-up');
      } else {
        cardEl.classList.add('flash-down');
      }
    }
  });
  renderStockGrid();
}, 2500);

// --- 8. REGISTRATION MODAL ---
function openRegisterModal() {
  document.getElementById('register-modal').classList.add('active');
  document.getElementById('register-form-view').classList.remove('hidden');
  document.getElementById('ticket-pass-view').classList.add('hidden');
}

function closeRegisterModal() {
  document.getElementById('register-modal').classList.remove('active');
}

// Google Sheets Webhook Integration Configuration
window.GOOGLE_SHEETS_WEBHOOK_URL = window.GOOGLE_SHEETS_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbyvDkBEvY2pxsv29Wb0Tuj_bc52zlPNtmeSYjhJQsuvOGlldRj8dotY_H1vSt7wJp0ztw/exec';

function handleRegistrationSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const regNo = document.getElementById('reg-no').value;
  const email = document.getElementById('reg-email')?.value || '';
  const phone = document.getElementById('reg-phone')?.value || '';
  const cls = document.getElementById('reg-class').value;
  const team = document.getElementById('reg-team').value;
  const eventName = document.getElementById('reg-event')?.value || 'General';
  const passId = 'UB26-' + Math.floor(100000 + Math.random() * 900000);
  const timestamp = new Date().toLocaleString();

  // Send registration payload to Google Sheets Webhook Endpoint
  if (window.GOOGLE_SHEETS_WEBHOOK_URL && window.GOOGLE_SHEETS_WEBHOOK_URL !== '') {
    const payload = {
      timestamp: timestamp,
      passId: passId,
      name: name,
      regNo: regNo,
      email: email,
      phone: phone,
      classSec: cls,
      team: team,
      eventName: eventName
    };

    fetch(window.GOOGLE_SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(() => console.log('Registration synced to Google Sheets!'))
      .catch(err => console.error('Google Sheets Sync Error:', err));
  }

  if (typeof confetti !== 'undefined') {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }

  document.getElementById('pass-name-tag').innerText = name;
  document.getElementById('pass-reg-tag').innerText = regNo + ' • ' + cls;
  const contactTag = document.getElementById('pass-contact-tag');
  if (contactTag) {
    contactTag.innerText = (phone ? phone : '') + (phone && email ? ' | ' : '') + (email ? email : '');
  }
  document.getElementById('pass-team-tag').innerText = 'TEAM ' + team;
  document.getElementById('pass-id-tag').innerText = passId;

  document.getElementById('register-form-view').classList.add('hidden');
  document.getElementById('ticket-pass-view').classList.remove('hidden');
}

// --- 9. CUSTOM CYBER POINTED ARROW CURSOR ENGINE ---
function initCyberPointedArrowCursor() {
  const arrowEl = document.getElementById('cyber-arrow-cursor');
  if (!arrowEl) return;

  window.addEventListener('mousemove', (e) => {
    arrowEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });

  document.querySelectorAll('a, button, input, select, .glass-panel, [onclick]').forEach(el => {
    el.addEventListener('mouseenter', () => arrowEl.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => arrowEl.classList.remove('is-hovering'));
  });
}

// --- 10. EVENT SCHEDULE TIMELINE MATRIX ---
const scheduleData = [
  { time: '09:00 AM - 10:00 AM', title: 'Grand Inaugural Ceremony & Biztopia Keynote', venue: 'St. Claret Main Auditorium', cat: 'Ceremony', desc: 'Welcome address by Dept of Commerce, Dignitaries keynote, and team flag hoisting.' },
  { time: '10:15 AM - 12:30 PM', title: 'BIZ BLITZ – Business Quiz Prelims', venue: 'Mini Auditorium', cat: 'Quiz', desc: 'Fast-paced business trivia test evaluating finance, management, and global commerce.' },
  { time: '10:30 AM - 01:00 PM', title: 'MANAGIX – Best Manager Round 1 & 2', venue: 'Executive Boardroom', cat: 'Management', desc: 'Stress interview and corporate crisis response scenarios.' },
  { time: '01:30 PM - 03:30 PM', title: 'INVENZA – Shark Tank Pitch Arena', venue: 'Innovation Hub', cat: 'Entrepreneurship', desc: 'Teams pitch groundbreaking business models before expert angel investors.' },
  { time: '03:45 PM - 05:00 PM', title: 'WALL STREET WARS – Live Mock Stock Trading (Session 1)', venue: 'Computer Lab 3', cat: 'Finance', desc: 'Real-time portfolio management and algorithmic market shock simulation.' },
  { time: '09:30 AM - 11:30 AM', title: 'PITCHCRAFT – Best Marketing Team Showcase', venue: 'Main Auditorium Arena', cat: 'Marketing', desc: 'Presenting high-impact promotional campaigns and live product ad launches.' },
  { time: '11:45 AM - 01:15 PM', title: 'HR X – Corporate HR Crisis Mitigation', venue: 'Seminar Hall B', cat: 'HR', desc: 'Handling emergency workplace disputes, labor negotiations, and talent retention.' },
  { time: '01:45 PM - 03:15 PM', title: 'VĀK SHAKTI – Public Speaking Finals', venue: 'Mini Auditorium', cat: 'Oratory', desc: 'Extempore oratory battle on corporate ethics and macroeconomic trends.' },
  { time: '03:30 PM - 04:30 PM', title: 'EXECUTIVE AVENUE – Corporate Fashion Walk', venue: 'Main Open Stage', cat: 'Fashion', desc: 'Choreographed corporate styling showcase representing the 4 pillars of Biztopia.' },
  { time: '04:45 PM - 06:00 PM', title: 'Valedictory & Grand Award Ceremony', venue: 'Main Auditorium Arena', cat: 'Valedictory', desc: 'Crowning the Overall Champion Team of UDBHAV 2026 & Trophy Distribution.' }
];

function renderScheduleTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;
  container.innerHTML = '';

  scheduleData.forEach(item => {
    const node = document.createElement('div');
    node.className = 'timeline-node glass-panel p-5 border-white/10 hover:border-cyan-500/30 transition-all';
    node.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span class="badge-tag badge-sync text-[10px]">${item.cat}</span>
      </div>
      <h3 class="font-heading font-extrabold text-lg text-white mb-1">${item.title}</h3>
      <p class="text-xs text-gray-300 leading-relaxed">${item.desc}</p>
    `;
    container.appendChild(node);
  });
}

// --- 11. DYNAMIC SERVICE & ARENA MODULE ENGINE (FRAMER-INSPIRED) ---
const serviceData = {
  1: {
    tag: 'SERVICE 01 • FINANCIAL SPACES',
    badgeClass: 'badge-sync',
    title: 'Wall Street & Financial Spaces',
    desc: 'Immersive market simulation environment with real-time portfolio management, risk analytics, ledger precision, and high-frequency trade execution.',
    events: 'Mock Stock (Wall Street Wars), Ledger Legends',
    glowGradient: 'linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(79, 172, 254, 0.1))',
    border: 'rgba(0, 242, 254, 0.5)'
  },
  2: {
    tag: 'SERVICE 02 • EXECUTIVE LEADERSHIP',
    badgeClass: 'badge-aura',
    title: 'Executive Manager & HR Governance',
    desc: 'High-stakes boardroom challenges testing decision making under extreme stress, managerial ethics, labor conflict response, and strategic vision.',
    events: 'Managix (Best Manager), HR X',
    glowGradient: 'linear-gradient(135deg, rgba(255, 183, 3, 0.25), rgba(251, 133, 0, 0.1))',
    border: 'rgba(255, 183, 3, 0.5)'
  },
  3: {
    tag: 'SERVICE 03 • SHARK TANK & VENTURES',
    badgeClass: 'badge-cresta',
    title: 'Invenza Shark Tank & Startup Pitch',
    desc: 'Defending groundbreaking business models, unit economics, market cap expansion, and term sheets before seasoned angel investors.',
    events: 'Invenza (Shark Tank), Pitchcraft',
    glowGradient: 'linear-gradient(135deg, rgba(217, 70, 239, 0.25), rgba(168, 85, 247, 0.1))',
    border: 'rgba(217, 70, 239, 0.5)'
  },
  4: {
    tag: 'SERVICE 04 • CAMPAIGNS & ORATORY',
    badgeClass: 'badge-zephora',
    title: 'Public Speaking & Brand Campaigns',
    desc: 'Persuasive executive communication, extempore debate, business trivia blitz, and creative public relations campaign creation.',
    events: 'Vāk Shakti (Public Speaking), Biz Blitz',
    glowGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.1))',
    border: 'rgba(16, 185, 129, 0.5)'
  },
  5: {
    tag: 'SERVICE 05 • STAGE & RUNWAY',
    badgeClass: 'badge-sync',
    title: 'Executive Avenue Corporate Fashion',
    desc: 'Choreographed corporate runway showcase interpreting the four pillars of Biztopia through styling, stage presence, and executive elegance.',
    events: 'Executive Avenue (Corporate Walk)',
    glowGradient: 'linear-gradient(135deg, rgba(0, 242, 254, 0.25), rgba(217, 70, 239, 0.15))',
    border: 'rgba(0, 242, 254, 0.5)'
  }
};

function initDynamicServiceModule() {
  const items = document.querySelectorAll('.dynamic-service-item');
  const previewCard = document.getElementById('dynamic-preview-card');
  const tagEl = document.getElementById('dynamic-tag');
  const titleEl = document.getElementById('dynamic-title');
  const descEl = document.getElementById('dynamic-desc');
  const eventsEl = document.getElementById('dynamic-events');
  const bgGlowEl = document.getElementById('dynamic-bg-glow');

  if (!items.length || !previewCard) return;

  function activateService(id) {
    const data = serviceData[id];
    if (!data) return;

    items.forEach(item => {
      if (item.getAttribute('data-service') === String(id)) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    if (tagEl) {
      tagEl.innerText = data.tag;
      tagEl.className = `badge-tag ${data.badgeClass} mb-4`;
    }
    if (titleEl) titleEl.innerText = data.title;
    if (descEl) descEl.innerText = data.desc;
    if (eventsEl) eventsEl.innerText = data.events;

    if (bgGlowEl) {
      bgGlowEl.style.background = data.glowGradient;
    }
    if (previewCard) {
      previewCard.style.borderColor = data.border;
      previewCard.style.transform = 'scale(1.02)';
      setTimeout(() => previewCard.style.transform = 'scale(1)', 250);
    }
  }

  items.forEach(item => {
    const id = item.getAttribute('data-service');
    item.addEventListener('mouseenter', () => activateService(id));
    item.addEventListener('click', () => activateService(id));
  });
}

// --- 12. CONTACT DIRECTORY CATEGORY FILTER ---
function filterContactCategory(type) {
  document.querySelectorAll('.contact-tab-btn').forEach(btn => {
    if (btn.id === 'contact-tab-' + type) {
      btn.className = 'contact-tab-btn active px-5 py-2 rounded-full text-xs font-bold bg-[#00f2fe] text-[#070b14] transition-all';
    } else {
      btn.className = 'contact-tab-btn px-5 py-2 rounded-full text-xs font-bold text-gray-400 hover:text-white bg-slate-900 border border-white/10 transition-all';
    }
  });

  const facultySec = document.getElementById('faculty-contact-section');
  const studentSec = document.getElementById('student-contact-section');

  if (type === 'all') {
    if (facultySec) facultySec.style.display = 'block';
    if (studentSec) studentSec.style.display = 'block';
  } else if (type === 'faculty') {
    if (facultySec) facultySec.style.display = 'block';
    if (studentSec) studentSec.style.display = 'none';
  } else if (type === 'student') {
    if (facultySec) facultySec.style.display = 'none';
    if (studentSec) studentSec.style.display = 'block';
  }
}

// Init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  init3DFinancialConstellation();
  init3DCardsTilt();
  initScrollReveal();
  updateCountdown();
  renderEventsGrid();
  renderStockGrid();
  renderScheduleTimeline();
  initCyberPointedArrowCursor();
  initDynamicServiceModule();
});



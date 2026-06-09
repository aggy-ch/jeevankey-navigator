/* ══════════════════════════════════════════════════════
   JEEVANKEY NAVIGATOR v5 — PRODUCTION ENGINE (DECOUPLED)
   ══════════════════════════════════════════════════════ */
'use strict';

/* ── CONFIGURATION PLANS ── */
const PLANS = [
  { id:'trial',     name:'Trial',     price:'₹499',   period:'one-time', experts:'1 Expert Consultation',  featured:false },
  { id:'essential', name:'Essential', price:'₹2,499', period:'/month',   experts:'2 Coordinated Experts',  featured:false },
  { id:'premium',   name:'Premium',   price:'₹4,499', period:'/month',   experts:'3 Specialized Experts',  featured:true  },
  { id:'elite',     name:'Elite',     price:'₹7,499', period:'/month',   experts:'4+ Clinical Experts',    featured:false }
];

/* ── CLIENT STATE ── */
const state = {
  q0: null, q1: null, q2: null, q3: [], q4: null, q5: null,
  selectedPlan: null, activeWaUrl: '#', result: null,
  lang: 'hi',          // Initial system default fallback
  history: [],         // Navigation tracking stack
  translations: null,  // Populated asynchronously
  profiles: null       // Populated asynchronously
};

/* ── RUNTIME ASYNC DATA FETCH INITIALIZER ── */
async function initializeNavigatorData() {
  try {
    // Fetches the dynamic JSON asset data modules relative to deployment paths
    const [translationsRes, profilesRes] = await Promise.all([
      fetch('i18n.json'),
      fetch('profiles.json')
    ]);

    if (!translationsRes.ok || !profilesRes.ok) {
      throw new Error('Network assets failed to load securely.');
    }

    state.translations = await translationsRes.json();
    state.profiles = await profilesRes.json();

    // Remove the loading blanket once assets hit background storage memory safely
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';

    // Synchronize initial rendering paths
    setLang(state.lang);
    showScreen('welcome');
  } catch (error) {
    console.error('Initialization Fault:', error);
    const textEl = document.querySelector('.loading-text');
    if (textEl) textEl.textContent = 'Connection error. Please refresh.';
  }
}

/* ── MULTI-LANGUAGE TRANSLATION WRAPPER ── */
function t(key) {
  const dict = state.translations;
  if (!dict) return '';
  const currentLang = state.lang;
  return (dict[currentLang] && dict[currentLang][key]) || dict['hi'][key] || dict['en'][key] || key;
}

function setLang(lang) {
  state.lang = lang;
  // Sync language selection pickers across every state screen navigation element
  document.querySelectorAll('.lang-select').forEach(select => {
    select.value = lang;
  });
  applyTranslations();
}

function applyTranslations() {
  // Parse elements matching data hooks and execute clean language layout injection
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (value) el.innerHTML = value;
  });
  updateStepDisplay();
  
  // Re-run results grid renderer if active state data is cached
  if (state.result) {
    renderResultUI();
  }
}

/* ── DYNAMIC STEP TRACKING COUNTER ENGINE ── */
function updateStepDisplay() {
  const active = document.querySelector('.screen.active');
  if (!active) return;
  const id = active.id.replace('screen-', '');
  const counterEl = document.getElementById(id + '-counter');
  if (!counterEl) return;

  const pos = state.history.length;
  // Dynamic step tracker pulls labels safely out of regional string collections
  counterEl.textContent = t('step_prefix') + ' ' + pos;
}

/* ── SCREEN NAVIGATION MECHANICS ── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('screen-' + id);
  if (target) {
    target.classList.add('active');
    target.scrollTop = 0;
  }
  updateStepDisplay();
  _broadcastHeight();
}

function pushHistory(screenId) {
  if (!state.history.includes(screenId)) {
    state.history.push(screenId);
  }
}

function startNavigator() {
  state.history = [];
  pushHistory('q0');
  showScreen('q0');
}

/* ── INTERACTIVE DIALOGUE SELECTION HANDLERS ── */
function selectQ0(val) {
  state.q0 = val;
  highlightSelected('q0-answers', val);
  setTimeout(() => {
    if (val === 'guided') {
      showScreen('triage');
    } else if (val === 'open') {
      pushHistory('q5');
      showScreen('q5');
    } else {
      state.q5 = null;
      pushHistory('q1');
      showScreen('q1');
    }
  }, 250);
}

function selectQ5(val) {
  state.q5 = val;
  highlightSelected('q5-answers', val);
  setTimeout(() => {
    if (val === 'confused') {
      showScreen('triage');
    } else {
      pushHistory('q1');
      showScreen('q1');
    }
  }, 250);
}

function selectQ1(val) {
  state.q1 = val;
  highlightSelected('q1-answers', val);
  // Contextually render preconception indicators exclusively for women's endocrine states
  const conceiveBtn = document.getElementById('q3-conceive');
  if (conceiveBtn) conceiveBtn.style.display = (val === 'hormonal') ? 'flex' : 'none';
  pushHistory('q2');
  setTimeout(() => showScreen('q2'), 250);
}

function selectQ2(val) {
  state.q2 = val;
  highlightSelected('q2-answers', val);
  pushHistory('q3');
  setTimeout(() => showScreen('q3'), 250);
}

function toggleQ3(val) {
  const btn = document.querySelector('#q3-answers [data-val="' + val + '"]');
  const noneBtn = document.getElementById('q3-none');
  
  if (val === 'none') {
    state.q3 = ['none'];
    document.querySelectorAll('#q3-answers .answer-btn').forEach(b => b.classList.remove('selected'));
    if (noneBtn) noneBtn.classList.add('selected');
  } else {
    if (noneBtn) noneBtn.classList.remove('selected');
    state.q3 = state.q3.filter(v => v !== 'none');
    if (state.q3.includes(val)) {
      state.q3 = state.q3.filter(v => v !== val);
      if (btn) btn.classList.remove('selected');
    } else {
      state.q3.push(val);
      if (btn) btn.classList.add('selected');
    }
  }
  
  const continueBtn = document.getElementById('q3-continue');
  if (continueBtn) continueBtn.classList.toggle('visible', state.q3.length > 0);
}

function goToQ4() {
  if (state.q3.length > 0) {
    pushHistory('q4');
    showScreen('q4');
  }
}

function selectQ4(val) {
  state.q4 = val;
  highlightSelected('q4-answers', val);
  setTimeout(() => {
    showScreen('matching');
    setTimeout(() => computeResult(), 2000);
  }, 250);
}

function highlightSelected(containerId, val) {
  document.querySelectorAll('#' + containerId + ' .answer-btn').forEach(b => {
    b.classList.toggle('selected', b.getAttribute('data-val') === val);
  });
}

/* ── 7-STAGE CLINICAL TRIAGE ARCHITECTURE ── */
function computeProfile(q0, q1, q2, q3, q4, q5) {
  const has = (v) => Array.isArray(q3) && q3.includes(v);
  const conceiveFlag = has('conceive');
  const envFlag = has('env_exposure');
  const hormOvlp = ['periods', 'acne', 'skin_hair'].some(s => has(s));

  // STAGE 1: Explicit Gate Assessment
  let paradigm = q0;
  if (q0 === 'guided') return _buildResult('I1_fallback_triage', 'A', false, true, true);

  // STAGE 2: History Friction Evaluation
  let seniority_escalation = false;
  if (q0 === 'open') {
    if (q5 === 'confused') return _buildResult('I1_fallback_triage', 'A', false, true, true);
    if (q5 === 'dissatisfied') seniority_escalation = true;
  }

  // STAGE 3: Multi-Morbidity Cluster Alignment
  let cluster;
  if (q4 === 'managing' && q1 !== 'hormonal') { cluster = 'F'; }
  else if (q1 === 'hormonal' && conceiveFlag) { cluster = 'H'; }
  else if (q1 === 'chronic' || q4 === 'managing') { cluster = 'F'; }
  else if (q1 === 'mind') { cluster = 'A'; }
  else if ((q1 === 'gut' || q1 === 'energy') && envFlag) { cluster = 'G'; }
  else if (q1 === 'gut') { cluster = 'B'; }
  else if (q1 === 'pain') { cluster = 'C'; }
  else if (q1 === 'hormonal') { cluster = 'D'; }
  else if (q1 === 'energy') { cluster = 'E'; }
  else { return _fallbackResult(q4, seniority_escalation); }

  if (cluster === 'H' && paradigm === 'open') { paradigm = 'allopathic'; }

  // STAGE 4: Pathological Complexity Scoring
  const dur = { acute: 0, months: 1, long: 2, recurring: 3 }[q2] || 0;
  const q3c = Array.isArray(q3) ? q3.filter(v => !['none', 'conceive', 'env_exposure'].includes(v)) : [];
  let sig = Math.min(q3c.length, 3);
  if (cluster !== 'D' && cluster !== 'H' && hormOvlp) sig += 1;
  const complexity = dur + sig;
  let tier = complexity <= 1 ? 'essential' : complexity <= 4 ? 'premium' : 'elite';

  // STAGE 5: Secondary Systemic Constraints Check
  if (q4 === 'managing' && cluster !== 'F') cluster = 'F';

  // STAGE 6: Resolution of Open Paradigm States
  if (paradigm === 'open') {
    const clinAnchor = ['periods', 'acne', 'skin_hair'].some(s => has(s)) || conceiveFlag || q4 === 'managing' || complexity >= 4;
    const lifeSigs = ['meal_fatigue', 'sleep', 'motivation', 'weight'].filter(s => has(s)).length;
    const lifeDom = lifeSigs >= 2 && complexity <= 3 && !clinAnchor;
    paradigm = clinAnchor ? 'allopathic' : (lifeDom ? 'alternative' : 'allopathic');
  }

  const pdm = (paradigm === 'alternative') ? 'ALT' : 'A';

  // STAGE 7: Final Source Mapping Matrix Check
  const profileKey = _selectMapping(cluster, pdm, tier, q4, q1, q3);
  if (!profileKey || !state.profiles || !state.profiles[profileKey]) {
    return _fallbackResult(q4, seniority_escalation);
  }

  let profile = JSON.parse(JSON.stringify(state.profiles[profileKey]));
  const resolvedTier = profile.tier;
  if (seniority_escalation) profile = _applySeniority(profile, cluster, pdm);

  return { profileKey, profile, tier: resolvedTier, paradigm: pdm, seniority_escalation, isTriage: !!profile.isTriage, isGuided: false };
}

function _buildResult(key, pdm, sen, isTriage, isGuided) {
  const fallbackProfile = state.profiles ? state.profiles[key] : null;
  return { profileKey: key, profile: fallbackProfile, tier: fallbackProfile ? fallbackProfile.tier : 'essential', paradigm: pdm, seniority_escalation: sen, isTriage, isGuided };
}

function _selectMapping(cluster, pdm, tier, q4, q1, q3) {
  const has = (v) => Array.isArray(q3) && q3.includes(v);
  switch(cluster) {
    case 'A':
      if (pdm === 'ALT') return tier === 'essential' ? 'A6_mind_alt_essential' : 'A7_mind_alt_premium';
      if (['periods', 'acne', 'skin_hair'].some(s => has(s))) return 'A5_mind_hormonal_xcluster';
      if (tier === 'essential') return 'A1_mind_essential';
      if (tier === 'elite') return 'A4_mind_elite';
      return (q4 === 'sleep_issue' || has('sleep')) ? 'A3_mind_premium_sleep' : 'A2_mind_premium_diet';
    case 'B':
      if (pdm === 'ALT') return tier === 'essential' ? 'B5_gut_alt_essential' : 'B6_gut_alt_premium';
      if (tier === 'essential') return 'B1_gut_essential';
      if (has('weight')) return 'B3_gut_premium_weight';
      if (q4 === 'stressed' || has('mood') || has('motivation')) return 'B4_gut_premium_stress';
      return 'B2_gut_premium_chronic';
    case 'C':
      if (tier === 'essential') return 'C1_pain_essential';
      if (tier === 'elite') return 'C4_pain_elite';
      if (has('weight') || q4 === 'sedentary') return 'C3_pain_premium_weight';
      return 'C2_pain_premium_stress';
    case 'D':
      if (pdm === 'ALT') return tier === 'essential' ? 'D5_hormonal_alt_essential' : 'D6_hormonal_alt_premium';
      if (tier === 'essential') return 'D1_hormonal_essential';
      if (tier === 'elite') return 'D4_hormonal_elite';
      if (has('mood') || has('motivation') || has('sleep')) return 'D2_hormonal_premium_stress';
      if (has('skin_hair') || has('acne')) return 'D3_hormonal_premium_skin';
      return 'D2_hormonal_premium_stress';
    case 'E':
      if (pdm === 'ALT') return tier === 'essential' ? 'E5_energy_alt_essential' : 'E6_energy_alt_premium';
      if (tier === 'essential') return 'E1_energy_essential';
      if (['periods', 'acne', 'skin_hair'].some(s => has(s))) return 'E4_energy_premium_hormonal';
      if (q4 === 'stressed' || has('mood') || has('sleep')) return 'E2_energy_premium_stress';
      if (has('meal_fatigue') || has('weight')) return 'E3_energy_premium_gut';
      return 'E2_energy_premium_stress';
    case 'F':
      if (pdm === 'ALT') return 'F5_chronic_alt_premium';
      if (tier === 'essential') return 'F1_chronic_essential';
      if (tier === 'elite') return (has('mood') || has('motivation') || has('sleep')) ? 'F4_chronic_elite_psych' : 'F3_chronic_elite_complex';
      return 'F2_chronic_premium';
    case 'G':
      if (pdm === 'ALT') {
        if (has('env_exposure')) return 'G6_immunity_pollution_ayurvedic';
        return (has('sleep') || has('motivation')) ? 'G4_immunity_premium_ayurvedic' : 'G2_immunity_essential_ayurvedic';
      }
      if (has('env_exposure')) return 'G5_immunity_pollution_allopathic';
      return (has('sleep') || has('motivation')) ? 'G3_immunity_premium_allopathic' : 'G1_immunity_essential_allopathic';
    case 'H':
      if (pdm === 'ALT') {
        if (tier === 'essential') return 'H5_fertility_alt_essential';
        if (tier === 'premium') return 'H6_fertility_alt_premium';
        return (has('mood') || has('motivation')) ? 'H7_fertility_alt_elite_stress' : 'H8_fertility_alt_elite_full';
      }
      if (tier === 'essential') return 'H1_fertility_essential';
      if (tier === 'premium') return 'H2_fertility_premium';
      return (has('mood') || has('motivation')) ? 'H3_fertility_elite_stress' : 'H4_fertility_elite_full';
    default: return null;
  }
}

function _applySeniority(profile, cluster, pdm) {
  const a = profile.team[0];
  if (pdm === 'ALT') {
    if (cluster === 'H') {
      a.detail = 'Senior specialist (8+ years reproductive medicine). ' + a.detail;
    } else {
      a.name = 'Senior Ayurvedic Doctor (8+ years experience)';
      a.detail = 'Senior practitioner. ' + a.detail;
    }
  } else {
    if (cluster === 'D' || cluster === 'H') {
      a.name = 'Gynaecologist / MD Specialist — Senior';
      a.detail = 'Senior specialist (8+ years). ' + a.detail;
    } else if (cluster === 'F') {
      a.name = 'Senior MD Specialist';
      a.detail = 'Senior specialist (8+ years systemic medicine). ' + a.detail;
    } else {
      a.name = a.name.replace('MBBS Doctor', 'Senior MBBS Doctor');
      a.detail = 'Senior practitioner (5+ years specialist experience). ' + a.detail;
    }
  }
  profile.team.forEach(m => { if (m.isActiveLead) m.detail += ' [Senior / Registered practitioner preferred.]'; });
  profile.seniorityEscalated = true;
  return profile;
}

function _fallbackResult(q4, sen) {
  const key = (q4 === 'managing') ? 'I2_fallback_managing' : 'I1_fallback_triage';
  return { profileKey: key, profile: state.profiles[key], tier: state.profiles[key].tier, paradigm: 'A', seniority_escalation: sen, isTriage: true, isGuided: false };
}

/* ── HIGH-FIDELITY OUTPUT GENERATION RENDERERS ── */
function computeResult() {
  const result = computeProfile(state.q0, state.q1, state.q2, state.q3, state.q4, state.state === undefined ? state.q5 : state.q5);
  state.result = result;

  if (result.isGuided) {
    showScreen('triage');
    return;
  }
  renderResultUI();
}

function renderResultUI() {
  const { profile, tier, paradigm, seniority_escalation, isTriage } = state.result;

  const eyebrowEl = document.getElementById('result-eyebrow');
  if (eyebrowEl) {
    eyebrowEl.textContent = profile.eyebrow;
    eyebrowEl.className = 'result-eyebrow' + (paradigm === 'ALT' ? ' alt-track' : '');
  }

  const subEl = document.getElementById('result-sub');
  if (subEl) subEl.textContent = profile.sub;

  // Sync structural alert layouts
  document.getElementById('alt-track-banner').classList.toggle('visible', paradigm === 'ALT');
  document.getElementById('seniority-notice').classList.toggle('visible', seniority_escalation);
  document.getElementById('triage-notice').classList.toggle('visible', isTriage);

  // Execute clean HTML rendering on expert grid targets
  const grid = document.getElementById('team-grid');
  grid.innerHTML = '';
  profile.team.forEach((m, idx) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    
    // Dynamic role mapping updates strings flawlessly based on selected language states
    const translatedRoleKey = m.role.toLowerCase().replace(/ /g, '_');
    
    card.innerHTML = `
      <div class="team-card-header" onclick="this.parentElement.classList.toggle('open')">
        <span class="team-role-badge ${m.badge}">${t(translatedRoleKey)}</span>
        <div class="team-expert-info">
          <div class="team-expert-name">${m.name}</div>
        </div>
        <span class="team-card-chevron">▼</span>
      </div>
      <div class="team-card-body">
        <div class="team-card-body-inner">${m.detail}</div>
      </div>`;
    grid.appendChild(card);
    if (idx === 0) card.classList.add('open');
  });

  // Render pricing selection arrays
  const planGrid = document.getElementById('plan-grid');
  planGrid.innerHTML = '';
  PLANS.forEach(p => {
    const card = document.createElement('div');
    const isMatched = p.id === tier;
    const dimTrial = p.id === 'trial' && (tier === 'premium' || tier === 'elite');
    
    card.className = 'plan-card' + (isMatched ? ' selected' : '') + (dimTrial ? ' dimmed' : '');
    card.setAttribute('data-plan-id', p.id);
    
    const trialNote = p.id === 'trial' && tier !== 'essential' ? `<div class="plan-trial-note">${t('plan_trial_note')}</div>` : '';
    
    card.innerHTML = `
      ${isMatched ? `<div class="plan-tag match">${t('plan_match')}</div>` : ''}
      ${p.featured && !isMatched ? `<div class="plan-tag pop">${t('plan_pop')}</div>` : ''}
      <div class="plan-name">${p.name}</div>
      <div class="plan-price">${p.price}<span style="font-size:10px;color:var(--ink-4)"> ${p.period}</span></div>
      <div class="plan-experts">${p.experts}</div>
      ${trialNote}`;
      
    card.onclick = () => selectPlan(p.id, profile.waCopy);
    planGrid.appendChild(card);
  });

  selectPlan(tier, profile.waCopy);
  showScreen('result');
}

function selectPlan(pId, waCopy) {
  state.selectedPlan = pId;
  document.querySelectorAll('.plan-card').forEach(c => {
    c.classList.toggle('selected', c.getAttribute('data-plan-id') === pId);
  });
  
  const plan = PLANS.find(p => p.id === pId);
  const consent = t('wa_consent');
  const full = waCopy + (plan ? ` Plan Interest: ${plan.name} Tier.` : '') + consent;
  
  state.activeWaUrl = 'https://wa.me/919259684363?text=' + encodeURIComponent(full);
  
  const waBtnText = document.getElementById('whatsapp-text');
  if (waBtnText) {
    waBtnText.textContent = plan ? `${plan.name} Plan pe Shuru Karein →` : 'WhatsApp pe Connect karein →';
  }
}

function openWhatsAppRedirect() {
  if (state.activeWaUrl && state.activeWaUrl !== '#') window.open(state.activeWaUrl, '_blank');
}

function openTriageWhatsApp() {
  const text = 'Hello JeevanKey, Maine Clinical Navigator complete kiya. Mujhe personal review chahiye — mere symptoms kai areas cover karte hain. Please sahi care path dhundhne mein madad karein.';
  window.open('https://wa.me/919259684363?text=' + encodeURIComponent(text), '_blank');
}

function restart() {
  state.q0 = null; state.q1 = null; state.q2 = null; state.q3 = [];
  state.q4 = null; state.q5 = null; state.selectedPlan = null;
  state.activeWaUrl = '#'; state.result = null; state.history = [];
  
  document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected'));
  const contBtn = document.getElementById('q3-continue');
  if (contBtn) contBtn.classList.remove('visible');
  
  const conceiveBtn = document.getElementById('q3-conceive');
  if (conceiveBtn) conceiveBtn.style.display = 'none';
  
  showScreen('welcome');
}

/* ── CORE RESPONSIVE EMBED IFRAME HEIGHT BRIDGE ── */
function _broadcastHeight() {
  const height = document.documentElement.scrollHeight;
  window.parent.postMessage({ type: 'jk-height', height: height }, '*');
}

/* ── BOOTSTRAP INITIALIZATION STAGE ── */
document.addEventListener('DOMContentLoaded', initializeNavigatorData);
if (window.ResizeObserver) {
  new ResizeObserver(_broadcastHeight).observe(document.body);
}
window.addEventListener('load', _broadcastHeight);
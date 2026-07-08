/* ══════════════════════════════════════════════════════
   JEEVANKEY NAVIGATOR v5 — PRODUCTION ENGINE (DECOUPLED)
   GA4 FUNNEL TRACKING LAYER — G-JQG3B09294
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
  lang: 'hi',
  history: [],
  translations: null,
  profiles: null,
  _navigatorStartTime: null   // GA4: session-level timer for time-to-completion metric
};

/* ══════════════════════════════════════════════════════
   GA4 TRACKING LAYER
   ─────────────────────────────────────────────────────
   All events fire via gtag() which is loaded on the
   parent Carrd page (jeevankey.com) using measurement
   ID G-JQG3B09294. The iframe sends events upward via
   postMessage so the parent page's gtag instance fires
   them — this is the only reliable cross-origin method.

   Event naming convention:
   - Snake_case, all lowercase
   - Prefixed jk_ for easy filtering in GA4 Explorer
   - Every event carries lang, paradigm, cluster dims
   ══════════════════════════════════════════════════════ */

/* Safe gtag dispatcher — dual-path: fires locally AND notifies parent
   Local path: gtag on GitHub Pages iframe (direct URL visits)
   Parent path: postMessage to Carrd parent (jeevankey.com embedded visits)
   Both paths always fire so events are captured regardless of access method */
var _gtagQueue = [];
var _gtagReady = false;

/* Detect if running inside an iframe (Carrd embed) */
var _inIframe = (function() {
  try { return window.self !== window.top; } catch(e) { return true; }
})();

function _sendToParent(eventName, params) {
  try {
    /* Always attempt postMessage — parent bridge will handle it
       '*' target origin is safe because bridge validates source */
    window.parent.postMessage({
      type: 'jk-ga4-event',
      eventName: eventName,
      params: params
    }, '*');
  } catch(e) {}
}

function _flushGtagQueue() {
  _gtagReady = true;
  _gtagQueue.forEach(function(item) {
    gtag('event', item.eventName, item.params);
    _sendToParent(item.eventName, item.params);
  });
  _gtagQueue = [];
}

// Poll until gtag is available (handles async script load race condition)
(function _waitForGtag() {
  if (typeof gtag === 'function') {
    _flushGtagQueue();
  } else {
    setTimeout(_waitForGtag, 50);
  }
})();

function _gtag(eventName, params) {
  try {
    /* Path 1: fire via local gtag (works on GitHub direct URL and iframe) */
    if (_gtagReady && typeof gtag === 'function') {
      gtag('event', eventName, params);
    } else {
      _gtagQueue.push({ eventName: eventName, params: params });
    }
    /* Path 2: always notify parent via postMessage
       When embedded in Carrd, parent bridge picks this up and
       fires gtag again in the jeevankey.com session context
       ensuring correct session source attribution */
    _sendToParent(eventName, params);
  } catch (e) {
    // Silent fail — never break the UX for analytics
  }
}

/* Build a consistent base parameter set to attach to every event */
function _baseParams() {
  return {
    lang: state.lang,
    paradigm: state.q0 || 'not_set',
    primary_cluster: state.q1 || 'not_set'
  };
}

/* ── RUNTIME ASYNC DATA FETCH INITIALIZER ── */
async function initializeNavigatorData() {
  try {
    const [translationsRes, profilesRes] = await Promise.all([
      fetch('i18n.json'),
      fetch('profiles.json')
    ]);

    if (!translationsRes.ok || !profilesRes.ok) {
      throw new Error('Network assets failed to load securely.');
    }

    state.translations = await translationsRes.json();
    state.profiles = await profilesRes.json();

    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.style.display = 'none';

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
  document.querySelectorAll('.lang-select').forEach(select => {
    select.value = lang;
  });
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key);
    if (value) el.innerHTML = value;
  });
  updateStepDisplay();
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

/* ══════════════════════════
   EVENT: jk_navigator_start
   Fires when user clicks "Begin" on welcome screen.
   This is the top of your funnel.
   Dimension: lang (tells you which language audience is largest)
══════════════════════════ */
function startNavigator() {
  state.history = [];
  state._navigatorStartTime = Date.now();
  pushHistory('q0');
  showScreen('q0');

  _gtag('jk_navigator_start', {
    lang: state.lang,
    event_category: 'navigator_funnel',
    event_label: 'welcome_screen'
  });
}

/* ══════════════════════════
   EVENT: jk_paradigm_selected (Q0)
   Most important early signal.
   Dimensions: paradigm_choice (allopathic/alternative/open/guided)
   Use: if 60%+ pick "open", your Q0 framing is working.
   Drop-off here = welcome screen not motivating enough.
══════════════════════════ */
function selectQ0(val) {
  state.q0 = val;
  highlightSelected('q0-answers', val);
 
  _gtag('jk_paradigm_selected', {
    ..._baseParams(),
    paradigm_choice: val,
    event_category: 'navigator_funnel',
    event_label: 'q0_paradigm_gate'
  });
 
  setTimeout(() => {
    // All paradigms go straight to Q1 — no Q5 branch, no triage branch
    state.q5 = null;
    pushHistory('q1');
    showScreen('q1');
  }, 250);
}

/* ══════════════════════════
   EVENT: jk_primary_concern_selected (Q1)
   Your most valuable segmentation dimension.
   Tells you which health cluster dominates your audience.
   Use this to decide which expert type to onboard first.
   Dimension: concern_cluster (mind/gut/pain/hormonal/energy/chronic)
══════════════════════════ */
function selectQ1(val) {
  state.q1 = val;
  highlightSelected('q1-answers', val);
  const conceiveBtn = document.getElementById('q3-conceive');
  if (conceiveBtn) conceiveBtn.style.display = (val === 'hormonal') ? 'flex' : 'none';
  pushHistory('q2');

  _gtag('jk_primary_concern_selected', {
    ..._baseParams(),
    concern_cluster: val,
    event_category: 'navigator_funnel',
    event_label: 'q1_primary_concern'
  });

  setTimeout(() => showScreen('q2'), 250);
}

/* ══════════════════════════
   EVENT: jk_duration_selected (Q2)
   Signals chronic vs acute patient split.
   Dimension: symptom_duration
   Use: if 70%+ pick "recurring", you have a chronic patient base
   — price your plans and messaging accordingly.
══════════════════════════ */
function selectQ2(val) {
  state.q2 = val;
  highlightSelected('q2-answers', val);
  pushHistory('q3');

  _gtag('jk_duration_selected', {
    ..._baseParams(),
    symptom_duration: val,
    event_category: 'navigator_funnel',
    event_label: 'q2_duration'
  });

  setTimeout(() => showScreen('q3'), 250);
}

/* Q3 toggle — no individual event per chip, the final set
   is captured in jk_complexity_signals_submitted below */
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

/* ══════════════════════════
   EVENT: jk_complexity_signals_submitted (Q3 Continue)
   Captures the full secondary signals array and count.
   Dimensions: signal_count, signals_list
   Use: high signal_count = complex patients = Elite candidates.
   Drop-off here = too many chips, users feel overwhelmed.
══════════════════════════ */
function goToQ4() {
  if (state.q3.length > 0) {
    pushHistory('q4');

    const signals = state.q3.filter(v => v !== 'none');
    _gtag('jk_complexity_signals_submitted', {
      ..._baseParams(),
      signal_count: signals.length,
      signals_list: signals.join(','),
      event_category: 'navigator_funnel',
      event_label: 'q3_secondary_signals'
    });

    showScreen('q4');
  }
}

/* ══════════════════════════
   EVENT: jk_lifestyle_selected (Q4)
   Final question — triggers matching.
   Dimension: lifestyle_type
   Also fires jk_matching_initiated immediately after.
══════════════════════════ */
function selectQ4(val) {
  state.q4 = val;
  highlightSelected('q4-answers', val);

  _gtag('jk_lifestyle_selected', {
    ..._baseParams(),
    lifestyle_type: val,
    event_category: 'navigator_funnel',
    event_label: 'q4_lifestyle'
  });

  setTimeout(() => {
    showScreen('matching');

    _gtag('jk_matching_initiated', {
      ..._baseParams(),
      symptom_duration: state.q2 || 'not_set',
      signal_count: state.q3.filter(v => v !== 'none').length,
      lifestyle_type: val,
      event_category: 'navigator_funnel',
      event_label: 'matching_screen'
    });

    setTimeout(() => computeResult(), 2000);
  }, 250);
}

function highlightSelected(containerId, val) {
  document.querySelectorAll('#' + containerId + ' .answer-btn').forEach(b => {
    b.classList.toggle('selected', b.getAttribute('data-val') === val);
  });
}

/* ── 7-STAGE CLINICAL TRIAGE ARCHITECTURE ── */
function computeProfile(q0, q1, q2, q3, q4) {
  // q5 parameter dropped — no longer used
  const has = (v) => Array.isArray(q3) && q3.includes(v);
  const conceiveFlag = has('conceive');
  const envFlag = has('env_exposure');
  const hormOvlp = ['periods', 'acne', 'skin_hair'].some(s => has(s));
 
  // Seniority escalation: true for all 'open' paradigm users (was: only if q5 === 'dissatisfied')
  let seniority_escalation = (q0 === 'open');
 
  let cluster;
  if (q4 === 'managing' && q1 !== 'hormonal') { cluster = 'F'; }
  else if (q1 === 'hormonal' && conceiveFlag)  { cluster = 'H'; }
  else if (q1 === 'chronic' || q4 === 'managing') { cluster = 'F'; }
  else if (q1 === 'mind')   { cluster = 'A'; }
  else if ((q1 === 'gut' || q1 === 'energy') && envFlag) { cluster = 'G'; }
  else if (q1 === 'gut')    { cluster = 'B'; }
  else if (q1 === 'pain')   { cluster = 'C'; }
  else if (q1 === 'hormonal') { cluster = 'D'; }
  else if (q1 === 'energy') { cluster = 'E'; }
  else { return _fallbackResult(q4, seniority_escalation); }
 
  // Paradigm resolution: 'open' + hormonal cluster → allopathic (unchanged)
  let paradigm = q0;
  if (cluster === 'H' && paradigm === 'open') { paradigm = 'allopathic'; }
 
  const dur = { acute: 0, months: 1, long: 2, recurring: 3 }[q2] || 0;
  const q3c = Array.isArray(q3) ? q3.filter(v => !['none', 'conceive', 'env_exposure'].includes(v)) : [];
  let sig = Math.min(q3c.length, 3);
  if (cluster !== 'D' && cluster !== 'H' && hormOvlp) sig += 1;
  const complexity = dur + sig;
  let tier = complexity <= 1 ? 'essential' : complexity <= 4 ? 'premium' : 'elite';
 
  // Resolve 'open' paradigm to allopathic or alternative
  if (paradigm === 'open') {
    const clinAnchor = ['periods', 'acne', 'skin_hair'].some(s => has(s)) || conceiveFlag || q4 === 'managing' || complexity >= 4;
    const lifeSigs = ['meal_fatigue', 'sleep', 'motivation', 'weight'].filter(s => has(s)).length;
    const lifeDom = lifeSigs >= 2 && complexity <= 3 && !clinAnchor;
    paradigm = clinAnchor ? 'allopathic' : (lifeDom ? 'alternative' : 'allopathic');
  }

  const pdm = (paradigm === 'alternative') ? 'ALT' : 'A';
  const profileKey = _selectMapping(cluster, pdm, tier, q4, q1, q3);

  if (!profileKey || !state.profiles || !state.profiles[profileKey]) {
    return _fallbackResult(q4, seniority_escalation);
  }

  let profile = JSON.parse(JSON.stringify(state.profiles[profileKey]));
  const resolvedTier = profile.tier;
  if (seniority_escalation) profile = _applySeniority(profile, cluster, pdm);

  return { profileKey, profile, tier: resolvedTier, paradigm: pdm, seniority_escalation, isTriage: false, isGuided: false };
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
      if (pdm === 'ALT') {
        if (tier === 'essential') return 'C5_pain_alt_essential';
        if (tier === 'elite') return 'C8_pain_alt_elite';
        if (has('weight') || q4 === 'sedentary') return 'C7_pain_alt_premium_weight';
        return 'C6_pain_alt_premium_stress';
      }
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
    } else if (a.name && a.name.includes('BHMS')) {
      a.name = 'Senior BHMS Doctor (8+ years experience)';
      a.detail = 'Senior homeopathic practitioner. ' + a.detail;
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
  // Pass only 5 args — q5 removed
  const result = computeProfile(state.q0, state.q1, state.q2, state.q3, state.q4);
  state.result = result;
  // No triage branch — always render result
  renderResultUI();
}
/* ══════════════════════════
   EVENT: jk_care_profile_matched
   The most important mid-funnel event.
   Dimensions: profile_key, care_tier, paradigm_resolved, time_to_match_ms
   Use: which profiles match most? Which tiers are most common?
   Do Elite-matched users convert less? (suggests price friction)
   Does triage_routed = true correlate with drop-off?
══════════════════════════ */
function renderResultUI() {
  const { profile, tier, paradigm, seniority_escalation, isTriage } = state.result;
  const profileKey = state.result.profileKey;

  // Calculate time user spent answering questions
  const timeToMatch = state._navigatorStartTime
    ? Math.round((Date.now() - state._navigatorStartTime) / 1000)
    : null;

  _gtag('jk_care_profile_matched', {
    ..._baseParams(),
    profile_key:        profileKey,
    care_tier:          tier,
    paradigm_resolved:  paradigm,
    is_alt_track:       paradigm === 'ALT',
    seniority_flag:     seniority_escalation,
    triage_routed:      isTriage,
    symptom_duration:   state.q2 || 'not_set',
    signal_count:       state.q3.filter(v => v !== 'none').length,
    lifestyle_type:     state.q4 || 'not_set',
    time_to_match_sec:  timeToMatch,
    event_category:     'navigator_funnel',
    event_label:        'result_screen'
  });

  const eyebrowEl = document.getElementById('result-eyebrow');
  if (eyebrowEl) {
    eyebrowEl.textContent = profile.eyebrow;
    eyebrowEl.className = 'result-eyebrow' + (paradigm === 'ALT' ? ' alt-track' : '');
  }

  const subEl = document.getElementById('result-sub');
  if (subEl) subEl.textContent = profile.sub;
  document.getElementById('alt-track-banner').classList.toggle('visible', paradigm === 'ALT');
  document.getElementById('seniority-notice').classList.toggle('visible', seniority_escalation);
   
  const grid = document.getElementById('team-grid');
  grid.innerHTML = '';
  profile.team.forEach((m, idx) => {
    const card = document.createElement('div');
    card.className = 'team-card';
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

/* ══════════════════════════
   EVENT: jk_plan_selected
   Fires every time a user clicks a plan card.
   Includes whether they drifted from the engine recommendation.
   Dimensions: plan_chosen, engine_recommended, is_downgrade, is_upgrade
   Use: if 60%+ downgrade from Elite to Trial = price objection is real.
   Critical for pricing strategy decisions.
══════════════════════════ */
function selectPlan(pId, waCopy) {
  const prevPlan = state.selectedPlan;
  state.selectedPlan = pId;

  document.querySelectorAll('.plan-card').forEach(c => {
    c.classList.toggle('selected', c.getAttribute('data-plan-id') === pId);
  });

  const plan = PLANS.find(p => p.id === pId);
  const consent = t('wa_consent');
  const full = waCopy + (plan ? ` Plan Interest: ${plan.name} Tier.` : '') + consent;
  state.activeWaUrl = 'https://wa.me/919760015878?text=' + encodeURIComponent(full);

  const waBtnText = document.getElementById('whatsapp-text');
  if (waBtnText) {
    waBtnText.textContent = plan ? `${plan.name} Plan pe Shuru Karein →` : 'WhatsApp pe Connect karein →';
  }

  // Only fire the event on explicit user selection (not the auto-call from renderResultUI)
  const engineTier = state.result ? state.result.tier : null;
  const tierOrder = { trial: 0, essential: 1, premium: 2, elite: 3 };
  const isDowngrade = engineTier && tierOrder[pId] < tierOrder[engineTier];
  const isUpgrade   = engineTier && tierOrder[pId] > tierOrder[engineTier];
  const isDrift     = pId !== engineTier;

  if (prevPlan !== null) {
    // Only fire on explicit user click, not programmatic default selection
    _gtag('jk_plan_selected', {
      ..._baseParams(),
      plan_chosen:        pId,
      engine_recommended: engineTier || 'unknown',
      is_drift:           isDrift,
      is_downgrade:       isDowngrade,
      is_upgrade:         isUpgrade,
      profile_key:        state.result ? state.result.profileKey : 'unknown',
      event_category:     'navigator_funnel',
      event_label:        'plan_selection'
    });
  }
}

/* ══════════════════════════
   EVENT: jk_whatsapp_initiated  ← YOUR CONVERSION EVENT
   This is the bottom of the funnel. Mark this as a
   Conversion in GA4 (see setup instructions below).
   Dimensions: plan_selected, engine_recommended, care_tier,
               profile_key, paradigm_resolved, is_triage
   Use: segment conversions by cluster to find your
   highest-converting health concern category.
   Cross-reference with plan_selected to find price-to-convert.
══════════════════════════ */
function openWhatsAppRedirect() {
  if (!state.activeWaUrl || state.activeWaUrl === '#') return;

  const result = state.result || {};
  _gtag('jk_whatsapp_initiated', {
    ..._baseParams(),
    plan_selected:      state.selectedPlan  || 'unknown',
    engine_recommended: result.tier         || 'unknown',
    care_tier:          result.tier         || 'unknown',
    profile_key:        result.profileKey   || 'unknown',
    paradigm_resolved:  result.paradigm     || 'unknown',
    is_triage:          result.isTriage     || false,
    concern_cluster:    state.q1            || 'not_set',
    symptom_duration:   state.q2            || 'not_set',
    lifestyle_type:     state.q4            || 'not_set',
    event_category:     'conversion',
    event_label:        'whatsapp_cta'
  });

  document.dispatchEvent(new Event('jk_converted'));
  window.open(state.activeWaUrl, '_blank');
}

/* ══════════════════════════
   EVENT: jk_navigator_restarted
   Fires when a user explicitly clicks the restart button mid-funnel.
   This is intentional re-entry, NOT abandonment.
   Dimension: restarted_at_screen — which screen made them want to start over.
   Use: if restarted_at_screen = q3 peaks, that screen has selection friction.
══════════════════════════ */
function restart() {
  const activeScreen = document.querySelector('.screen.active');
  const activeId = activeScreen ? activeScreen.id.replace('screen-', '') : 'unknown';
  const nonEntryScreens = ['q0','q5','q1','q2','q3','q4','matching','result','triage'];

  if (nonEntryScreens.includes(activeId)) {
    _gtag('jk_navigator_restarted', {
      ..._baseParams(),
      restarted_at_screen: activeId,
      steps_completed:     state.history.length,
      event_category:      'navigator_funnel',
      event_label:         'restart_clicked'
    });
  }

  state.q0 = null; state.q1 = null; state.q2 = null; state.q3 = [];
  state.q4 = null; state.q5 = null; state.selectedPlan = null;
  state.activeWaUrl = '#'; state.result = null; state.history = [];
  state._navigatorStartTime = null;

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

/* ── TRUE ABANDONMENT TRACKING ── */
/* ══════════════════════════
   EVENT: jk_navigator_abandoned
   Fires when user leaves mid-funnel WITHOUT clicking restart —
   tab close, browser close, navigation away, app switch.
   Uses Page Visibility API (visibilitychange) as primary signal —
   fires when tab goes to background on mobile (app switch, lock screen).
   Uses pagehide as secondary signal for tab/browser close on desktop.
   Only fires if user has actually started (history.length > 0)
   and has not yet converted (no whatsapp_initiated in this session).
   Dimension: abandoned_at_screen, steps_completed, time_spent_sec
   Use: this is your real drop-off data. Compare with jk_navigator_restarted
   to distinguish friction (restarted) from disengagement (abandoned).
══════════════════════════ */
(function _initAbandonmentTracking() {
  var _converted = false;
  var _abandonFired = false;

  // Mark session as converted so abandonment doesn't fire after WhatsApp click
  document.addEventListener('jk_converted', function() {
    _converted = true;
  });

  function _fireAbandonment(trigger) {
    if (_abandonFired) return;           // fire once per session only
    if (_converted) return;              // converted users are not abandonments
    if (!state.history || state.history.length === 0) return;  // never started

    var activeScreen = document.querySelector('.screen.active');
    var activeId = activeScreen ? activeScreen.id.replace('screen-', '') : 'unknown';
    if (activeId === 'welcome') return;  // left from welcome = never truly started

    var timeSpent = state._navigatorStartTime
      ? Math.round((Date.now() - state._navigatorStartTime) / 1000)
      : null;

    _abandonFired = true;
    _gtag('jk_navigator_abandoned', {
      lang:                state.lang          || 'not_set',
      paradigm:            state.q0            || 'not_set',
      primary_cluster:     state.q1            || 'not_set',
      abandoned_at_screen: activeId,
      steps_completed:     state.history.length,
      time_spent_sec:      timeSpent,
      abandon_trigger:     trigger,
      event_category:      'navigator_funnel',
      event_label:         'true_abandonment'
    });
  }

  // Primary: visibility change — catches mobile app switch, lock screen, tab switch
  document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
      _fireAbandonment('visibility_hidden');
    }
  });

  // Secondary: pagehide — catches tab close and browser close on desktop
  window.addEventListener('pagehide', function() {
    _fireAbandonment('page_hide');
  });
})();

/* ── BOOTSTRAP INITIALIZATION STAGE ── */
document.addEventListener('DOMContentLoaded', initializeNavigatorData);
if (window.ResizeObserver) {
  new ResizeObserver(_broadcastHeight).observe(document.body);
}
window.addEventListener('load', _broadcastHeight);

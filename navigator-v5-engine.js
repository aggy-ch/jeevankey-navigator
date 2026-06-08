/* ============================================================
   JeevanKey Routing Engine v5
   navigator-v5-engine.js
   Production-ready standalone module — no DOM dependencies.
   All 46 clinical track mappings, Clusters A–I.
   computeProfile(q0, q1, q2, q3, q4, q5) → result object.
   ============================================================ */

'use strict';

/* ── PLAN DEFINITIONS ── */
const PLANS = [
  { id: 'trial',     name: 'Trial',     price: '₹499',   period: 'one-time', experts: '1 Expert Consultation',  featured: false },
  { id: 'essential', name: 'Essential', price: '₹2,499', period: '/month',   experts: '2 Coordinated Experts',  featured: false },
  { id: 'premium',   name: 'Premium',   price: '₹4,499', period: '/month',   experts: '3 Specialized Experts',  featured: true  },
  { id: 'elite',     name: 'Elite',     price: '₹7,499', period: '/month',   experts: '4+ Clinical Experts',    featured: false }
];

/* ── ROLE BADGE KEYS ──
   badge-anchor      → Diagnostic Anchor / Medical Anchor / Therapeutic Anchor
   badge-therapeutic → Therapeutic Anchor (ALT paradigm primary)
   badge-driver      → Active Treatment Lead
   badge-accel       → Core Accelerator
   badge-compliance  → Compliance Anchor
*/

/* ── PROFILES: ALL 46 MAPPINGS ──
   Each entry:
     key        : unique mapping identifier (snake_case)
     cluster    : A–I
     paradigm   : 'A' | 'ALT'
     tier       : 'essential' | 'premium' | 'elite'
     eyebrow    : result screen eyebrow label
     sub        : result screen subheading
     team[]     : ordered array — Diagnostic Anchor always index 0
       { role, badge, name, detail, isActiveLead }
     waCopy     : WhatsApp pre-fill base text
*/
const PROFILES = {

  /* ══ CLUSTER A — STRESS & MENTAL WELLNESS ══ */

  A1_mind_essential: {
    cluster: 'A', paradigm: 'A', tier: 'essential',
    eyebrow: 'Nervous System — Essential Track',
    sub: 'Your profile points toward early-stage stress and psychological load. The focus is clinical baseline confirmation paired with direct cognitive intervention.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Rules out nutritional deficiencies, thyroid fluctuations, and biochemical mimics before treatment begins.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers evidence-backed cognitive interventions for nervous system de-escalation.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Essential.'
  },

  A2_mind_premium_diet: {
    cluster: 'A', paradigm: 'A', tier: 'premium',
    eyebrow: 'Nervous System — Metabolic Overlay',
    sub: 'Your profile shows stress load compounded by nutritional depletion or weight-related fatigue loops. Recovery requires parallel clinical, psychological, and dietary work.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Reviews biochemical baselines and rules out underlying metabolic contributors to the stress presentation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages cortisol de-escalation loops and behavioral recovery mechanics.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Addresses nutritional depletion and meal-energy patterns that sustain the stress-fatigue cycle.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Metabolic Overlay.'
  },

  A3_mind_premium_sleep: {
    cluster: 'A', paradigm: 'A', tier: 'premium',
    eyebrow: 'Nervous System — Sleep Disruption Track',
    sub: 'Your profile shows a stress-sleep feedback loop as the dominant driver. The team is structured around breaking the arousal cycle and restoring circadian rhythm.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Confirms no underlying thyroid, cortisol, or sleep apnea pathology driving the insomnia presentation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Applies CBT-I and nervous system regulation protocols.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Maintains daily sleep hygiene rituals, breathwork protocols, and circadian anchoring practices.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Sleep Disruption.'
  },

  A4_mind_elite: {
    cluster: 'A', paradigm: 'A', tier: 'elite',
    eyebrow: 'Nervous System — Full Burnout Recovery',
    sub: 'Your profile reflects deep, multi-dimensional burnout with metabolic, sleep, and motivational collapse. Recovery requires a fully coordinated four-expert team.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Rules out thyroid dysfunction, adrenal fatigue markers, and nutritional collapse as biological maintainers of the burnout state.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Leads systematic nervous system rebuilding through structured cognitive and somatic protocols.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Rebuilds energy substrate through anti-inflammatory nutrition, adrenal support meal timing, and metabolic restoration.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Sustains the daily recovery rhythm through breathwork, movement, and nervous system down-regulation practices.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Full Burnout Recovery.'
  },

  A5_mind_hormonal_xcluster: {
    cluster: 'A', paradigm: 'A', tier: 'premium',
    eyebrow: 'Nervous System — Hormonal Overlap',
    sub: 'Your profile shows a stress presentation with hormonal signals embedded — the mind and endocrine systems are reinforcing each other. The team addresses both simultaneously.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist / MBBS GP',
        detail: 'Reviews hormonal panel and rules out endocrine contributors — PCOS, thyroid, androgen imbalance — as upstream stress drivers.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Targets the cortisol-hormonal feedback loop through structured psychological intervention.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Manages the insulin-cortisol-hormone interaction through targeted nutritional protocol.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Hormonal Overlap.'
  },

  A6_mind_alt_essential: {
    cluster: 'A', paradigm: 'ALT', tier: 'essential',
    eyebrow: 'Nervous System — Ayurvedic Root-Cause Track',
    sub: 'Your profile indicates a Vata-Pitta imbalance driving mental load and exhaustion. The approach focuses on constitutional assessment and nervous system nourishment.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Conducts constitutional assessment, identifies dosha imbalance, and prescribes Ayurvedic nervine and adaptogenic support within the AYUSH formulary.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Integrates cognitive recovery with the constitutional framework established by the Therapeutic Anchor.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Ayurvedic Essential.'
  },

  A7_mind_alt_premium: {
    cluster: 'A', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Nervous System — Ayurvedic Deep Recovery',
    sub: 'Your profile shows a chronic, multi-signal mental wellness concern rooted in constitutional depletion. Recovery integrates Ayurvedic protocol, psychological care, and breathwork.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Manages Ayurvedic treatment protocol — rasayana, shodhana guidance, and ashwagandha-based nervous system restoration.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Leads cognitive and behavioral recovery alongside the Ayurvedic protocol.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Anchors daily practice in pranayama, yoga nidra, and Ayurvedic lifestyle rhythms for sustained recovery.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Stress & Mental Wellness — Ayurvedic Deep Recovery.'
  },

  /* ══ CLUSTER B — GUT & METABOLIC ══ */

  B1_gut_essential: {
    cluster: 'B', paradigm: 'A', tier: 'essential',
    eyebrow: 'Gut & Metabolic — Essential Track',
    sub: 'Your profile shows an early-stage gut concern requiring clinical rule-out and targeted dietary correction.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Clinician',
        detail: 'Reviews blood biomarker baselines, inflammatory markers, and rules out structural GI pathology.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Runs tailored elimination protocols to isolate persistent food triggers and restore gut function.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Gut & Metabolic — Essential.'
  },

  B2_gut_premium_chronic: {
    cluster: 'B', paradigm: 'A', tier: 'premium',
    eyebrow: 'Gut & Metabolic — Chronic Restoration',
    sub: 'Your persistent gut profile requires medical oversight, sustained dietary correction, and a lifestyle compliance layer to prevent relapse.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Clinician',
        detail: 'Monitors ongoing GI markers and rules out inflammatory bowel conditions requiring escalation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages phased dietary restoration with progressive reintroduction protocols.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Supports gut motility, vagal tone, and daily stress-digestion regulation through targeted practice.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Gut & Metabolic — Chronic Restoration.'
  },

  B3_gut_premium_weight: {
    cluster: 'B', paradigm: 'A', tier: 'premium',
    eyebrow: 'Gut & Metabolic — Weight Overlay',
    sub: 'Your gut concern is compounded by weight-related metabolic disruption. The team addresses both through integrated nutrition and movement protocols.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Clinician',
        detail: 'Reviews metabolic panel, rules out insulin resistance and thyroid contribution to weight-gut interaction.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Addresses the gut-weight metabolic axis through targeted nutritional restructuring.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Yoga & Fitness Specialist',
        detail: 'Delivers a low-impact movement protocol to support gut motility, metabolic rate, and visceral fat reduction.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Gut & Metabolic — Weight Overlay.'
  },

  B4_gut_premium_stress: {
    cluster: 'B', paradigm: 'A', tier: 'premium',
    eyebrow: 'Gut & Metabolic — Stress-Gut Axis',
    sub: 'Your gut presentation is driven by the stress-gut axis. Psychological stress is maintaining the digestive dysfunction — recovery must address both simultaneously.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Clinician',
        detail: 'Confirms gut presentation and rules out structural pathology. Monitors cortisol-gut biomarker interaction.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements gut-calming nutrition protocol alongside stress-diet pattern correction.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Addresses the neurological stress loops that are sustaining the gut-brain axis dysfunction.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Gut & Metabolic — Stress-Gut Axis.'
  },

  B5_gut_alt_essential: {
    cluster: 'B', paradigm: 'ALT', tier: 'essential',
    eyebrow: 'Gut & Metabolic — Ayurvedic Essential',
    sub: 'Your profile shows Agni imbalance as the root cause. The approach uses Ayurvedic digestive restoration and targeted nutritional correction.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Assesses digestive Agni, identifies Ama accumulation patterns, and prescribes Ayurvedic digestive and hepatic support.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements an Ayurveda-aligned elimination and restoration dietary protocol.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Gut & Metabolic — Ayurvedic Essential.'
  },

  B6_gut_alt_premium: {
    cluster: 'B', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Gut & Metabolic — Ayurvedic Deep Restoration',
    sub: 'Your chronic gut and metabolic profile requires sustained Ayurvedic protocol, dietary restructuring, and lifestyle anchoring for lasting recovery.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Manages Panchakarma-adjacent gut restoration and constitutional Agni rebuilding protocol.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers phased dietary restoration aligned with Ayurvedic seasonal and constitutional principles.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Maintains daily digestive yoga, dinacharya practices, and breathwork for gut motility and Agni support.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Gut & Metabolic — Ayurvedic Deep Restoration.'
  },

  /* ══ CLUSTER C — MUSCULOSKELETAL & PAIN ══ */

  C1_pain_essential: {
    cluster: 'C', paradigm: 'A', tier: 'essential',
    eyebrow: 'Musculoskeletal — Essential Rehabilitation',
    sub: 'Your profile indicates an acute or sub-acute pain concern requiring clinical assessment and targeted physical rehabilitation.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Doctor',
        detail: 'Assesses for structural nerve radiculopathy, decompression indicators, or inflammatory joint pathology requiring clinical management.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Physiotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers a customised spinal alignment, joint mobilisation, and progressive rehabilitation programme.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Musculoskeletal — Essential Rehabilitation.'
  },

  C2_pain_premium_stress: {
    cluster: 'C', paradigm: 'A', tier: 'premium',
    eyebrow: 'Musculoskeletal — Pain-Stress Amplification',
    sub: 'Your pain is being amplified by a psychological stress overlay. Recovery requires physical rehabilitation supported by targeted psychological intervention.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Doctor',
        detail: 'Reviews structural indicators and rules out systemic inflammatory conditions contributing to the pain-stress loop.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Physiotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages physical rehabilitation while coordinating with the psychotherapist on pain-sensitisation mechanics.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Addresses central sensitisation, pain catastrophising, and the psychological maintenance of the pain experience.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Musculoskeletal — Pain-Stress Amplification.'
  },

  C3_pain_premium_weight: {
    cluster: 'C', paradigm: 'A', tier: 'premium',
    eyebrow: 'Musculoskeletal — Load & Lifestyle Track',
    sub: 'Your pain profile has a significant weight and sedentary lifestyle contribution. Reducing joint load through nutrition and movement is essential to recovery.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Doctor',
        detail: 'Assesses structural joint load, inflammatory markers, and BMI-related mechanical contributors.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Physiotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Designs a low-impact, load-appropriate rehabilitation protocol to reduce pain while preserving mobility.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Implements an anti-inflammatory nutrition plan to reduce joint load and support tissue repair.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Musculoskeletal — Load & Lifestyle.'
  },

  C4_pain_elite: {
    cluster: 'C', paradigm: 'A', tier: 'elite',
    eyebrow: 'Musculoskeletal — Full Recovery Programme',
    sub: 'Your chronic, multi-signal pain profile requires a fully coordinated four-expert team addressing physical, psychological, and lifestyle dimensions simultaneously.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS Doctor',
        detail: 'Manages medical oversight, monitors inflammatory markers, and coordinates escalation if structural intervention becomes necessary.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Physiotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Leads the full physical rehabilitation protocol across pain reduction, mobility, and strength phases.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Manages the chronic pain-psychology loop — catastrophising, avoidance behaviour, and sleep-pain interaction.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers daily pain-regulation practices, breathwork for nervous system modulation, and mobility maintenance.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Musculoskeletal — Full Recovery Programme.'
  },

  /* ══ CLUSTER D — HORMONAL & REPRODUCTIVE ══ */

  D1_hormonal_essential: {
    cluster: 'D', paradigm: 'A', tier: 'essential',
    eyebrow: 'Hormonal — Clinical Foundation Track',
    sub: 'Your hormonal profile is in the early-to-moderate stage, requiring clinical baseline confirmation and targeted nutritional correction.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist / MBBS GP',
        detail: 'Establishes clinical baseline — reviews hormonal panels, confirms diagnostic picture, and manages prescriptions where applicable under Telemedicine Guidelines 2020.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Leads insulin resistance correction, low-GI nutritional restructuring, and hormonal dietary support.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Hormonal — Clinical Foundation.'
  },

  D2_hormonal_premium_stress: {
    cluster: 'D', paradigm: 'A', tier: 'premium',
    eyebrow: 'Hormonal — Cortisol-Cycle Disruption',
    sub: 'Your hormonal profile shows a stress-cortisol feedback loop disrupting your cycle and endocrine stability. Recovery requires coordinated clinical, psychological, and nutritional work.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist / Endocrinologist',
        detail: 'Reviews full hormonal panel, manages prescriptions for cycle regulation, and monitors endocrine markers across the care period.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Targets the cortisol-hormonal axis through structured nervous system regulation and stress recovery protocols.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Manages the insulin-cortisol interaction through targeted low-GI planning and hormonal nutritional support.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Hormonal — Cortisol-Cycle Disruption.'
  },

  D3_hormonal_premium_skin: {
    cluster: 'D', paradigm: 'A', tier: 'premium',
    eyebrow: 'Hormonal — Skin & Hair Manifestation',
    sub: 'Your hormonal imbalance is presenting visibly through skin and hair. The team addresses the endocrine root cause alongside nutritional and psychological support.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS GP / Gynaecologist',
        detail: 'Reviews androgen panel, DHEA-S, and DHT markers — confirms hormonal contribution to skin and hair presentation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements anti-androgen nutritional protocol and micronutrient restoration for skin and hair recovery.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Addresses the psychological load of visible hormonal symptoms, body image, and stress-cortisol amplification of androgenic activity.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Hormonal — Skin & Hair Manifestation.'
  },

  D4_hormonal_elite: {
    cluster: 'D', paradigm: 'A', tier: 'elite',
    eyebrow: 'Hormonal — Full Spectrum PCOD Recovery',
    sub: 'Your multi-signal hormonal profile — cycles, acne, mood, and motivation — requires a fully coordinated four-expert team for comprehensive endocrine recovery.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist / MD Specialist',
        detail: 'Leads hormonal management — LH/FSH panels, metformin dosing, cycle regulation prescriptions — in full compliance with Telemedicine Guidelines 2020.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages insulin resistance, low-GI protocol, and hormonal nutritional strategy across the care cycle.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Addresses cortisol-driven PCOD flare maintenance and the psychological loop sustaining hormonal disruption.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers pelvic-opening protocols, cycle-supportive yoga, and breathwork for cortisol regulation.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Hormonal — Full Spectrum PCOD Recovery.'
  },

  D5_hormonal_alt_essential: {
    cluster: 'D', paradigm: 'ALT', tier: 'essential',
    eyebrow: 'Hormonal — Ayurvedic Foundation Track',
    sub: 'Your profile indicates constitutional hormonal imbalance best addressed through Ayurvedic root-cause correction and targeted dietary support.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Conducts constitutional assessment, identifies hormonal dosha patterns, and prescribes Ayurvedic hormonal balancing protocol within the AYUSH formulary.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements an Ayurveda-aligned nutritional protocol supporting hormonal restoration.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Hormonal — Ayurvedic Foundation.'
  },

  D6_hormonal_alt_premium: {
    cluster: 'D', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Hormonal — Ayurvedic Deep Rebalancing',
    sub: 'Your chronic hormonal pattern with skin and lifestyle signals requires sustained Ayurvedic protocol, nutritional correction, and daily practice compliance.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Manages Ayurvedic hormonal restoration — rasayana protocols, shodhana guidance, and constitutional cycle support.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Leads Ayurveda-integrated dietary restructuring for hormonal and skin-hair recovery.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Maintains cycle-supportive yoga, pranayama, and dinacharya practices for hormonal rhythm stabilisation.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Hormonal — Ayurvedic Deep Rebalancing.'
  },

  /* ══ CLUSTER E — ENERGY & VITALITY ══ */

  E1_energy_essential: {
    cluster: 'E', paradigm: 'A', tier: 'essential',
    eyebrow: 'Energy & Vitality — Foundation Track',
    sub: 'Your fatigue profile shows a single-domain energy concern requiring clinical ruling-out and nutritional restoration.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Rules out anaemia, thyroid dysfunction, B12/D3 deficiency, and metabolic contributors to chronic fatigue.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Designs a targeted energy-restoration nutritional protocol addressing identified deficiency patterns.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Energy & Vitality — Foundation.'
  },

  E2_energy_premium_stress: {
    cluster: 'E', paradigm: 'A', tier: 'premium',
    eyebrow: 'Energy & Vitality — Stress Drain Track',
    sub: 'Your energy depletion is being driven by chronic psychological stress. Nutritional restoration alone is insufficient — the stress drain must be addressed directly.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Reviews adrenal and cortisol markers alongside standard fatigue panel to confirm stress as the primary energy drain mechanism.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements adrenal-support nutrition and energy-stabilising dietary structure.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Directly addresses the psychological stress load depleting energy reserves and disrupting sleep-recovery cycles.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Energy & Vitality — Stress Drain.'
  },

  E3_energy_premium_gut: {
    cluster: 'E', paradigm: 'A', tier: 'premium',
    eyebrow: 'Energy & Vitality — Absorption Deficit Track',
    sub: 'Your fatigue is driven by a gut-absorption failure — your body is not converting food into energy efficiently. The team addresses nutrition and gut function simultaneously.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Rules out malabsorption syndromes, micronutrient depletion, and functional gut contributors to energy deficit.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Corrects the energy-absorption deficit through gut-first nutritional restructuring.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Supports gut motility, digestive fire, and daily movement to enhance nutrient absorption and metabolic energy.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Energy & Vitality — Absorption Deficit.'
  },

  E4_energy_premium_hormonal: {
    cluster: 'E', paradigm: 'A', tier: 'premium',
    eyebrow: 'Energy & Vitality — Hormonal Fatigue Track',
    sub: 'Your low energy has a hormonal signature — irregular cycles, skin changes, or androgen imbalance are depleting your vitality. The team addresses the endocrine root cause.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS GP / Gynaecologist',
        detail: 'Reviews hormonal panel and confirms the endocrine contribution to chronic fatigue presentation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements hormonal-supportive nutritional protocol to restore energy substrate.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers cycle-sensitive movement and breathwork to support hormonal energy restoration.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Energy & Vitality — Hormonal Fatigue.'
  },

  E5_energy_alt_essential: {
    cluster: 'E', paradigm: 'ALT', tier: 'essential',
    eyebrow: 'Energy & Vitality — Ayurvedic Foundation',
    sub: 'Your energy depletion reflects Ojas depletion and Vata imbalance. The Ayurvedic approach rebuilds vital essence through constitutional protocol and nutritional support.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Assesses Ojas depletion, Vata aggravation, and prescribes Ayurvedic adaptogenic and rasayana protocol for vitality restoration.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements Ayurveda-aligned energy-building nutrition and meal rhythm protocol.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Energy & Vitality — Ayurvedic Foundation.'
  },

  E6_energy_alt_premium: {
    cluster: 'E', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Energy & Vitality — Ayurvedic Deep Restoration',
    sub: 'Your chronic energy depletion with gut and motivational signals requires Ayurvedic systemic restoration, nutritional rebuilding, and daily practice compliance.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Manages Ojas-rasayana protocol, Agni rebuilding, and constitutional vitality restoration across the care period.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers energy-restorative nutrition aligned with Ayurvedic seasonal and constitutional principles.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Anchors daily vitality practices — pranayama, restorative yoga, and dinacharya — for sustained energy recovery.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Energy & Vitality — Ayurvedic Deep Restoration.'
  },

  /* ══ CLUSTER F — CHRONIC & SYSTEMIC CONDITIONS ══ */

  F1_chronic_essential: {
    cluster: 'F', paradigm: 'A', tier: 'essential',
    eyebrow: 'Chronic Condition — Foundation Management',
    sub: 'Your condition is in an early management phase. The team establishes clinical oversight and dietary structure to prevent progression.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Establishes monitoring protocol, reviews baseline markers, and manages prescriptions appropriate to the condition profile.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements condition-specific dietary management — glycaemic, cardiovascular, or metabolic protocol as indicated.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Chronic Condition — Foundation Management.'
  },

  F2_chronic_premium: {
    cluster: 'F', paradigm: 'A', tier: 'premium',
    eyebrow: 'Chronic Condition — Active Management Track',
    sub: 'Your condition requires active multi-expert management with clinical oversight, dietary control, and daily compliance support.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Manages ongoing prescriptions, monitors condition markers, and coordinates escalation triggers.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers condition-optimised dietary protocol with progressive monitoring milestones.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Supports daily movement, stress regulation, and condition-appropriate lifestyle compliance.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Chronic Condition — Active Management.'
  },

  F3_chronic_elite_complex: {
    cluster: 'F', paradigm: 'A', tier: 'elite',
    eyebrow: 'Chronic Condition — Complex Systemic Management',
    sub: 'Your long-standing, multi-signal chronic condition requires specialist medical leadership with a full supporting team across nutrition and lifestyle domains.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MD Specialist',
        detail: 'Central medical authority — monitors systemic markers, adjusts prescriptions, and manages complication risk across the care cycle.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'MBBS General Practitioner',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages ongoing clinical continuity under the MD Specialist\'s direction.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Implements condition-specific nutritional protocol — glycaemic, cardiovascular, or inflammatory — aligned to the specialist\'s clinical targets.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers daily movement, breathwork, and lifestyle compliance practices appropriate to the condition severity.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Chronic Condition — Complex Systemic Management.'
  },

  F4_chronic_elite_psych: {
    cluster: 'F', paradigm: 'A', tier: 'elite',
    eyebrow: 'Chronic Condition — Psychological Burden Track',
    sub: 'Your chronic condition carries a significant psychological load — mood, motivation, and sleep disruption are compounding the physical management challenge.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS GP / MD Specialist',
        detail: 'Manages clinical oversight, medication, and condition monitoring across the full care cycle.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Addresses illness burden, chronic pain psychology, and motivational depletion alongside the medical team.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Manages the dietary dimension of the chronic condition with particular attention to mood-nutrition interaction.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers daily coping practices, breathwork, and movement appropriate to the physical and psychological load.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Chronic Condition — Psychological Burden.'
  },

  F5_chronic_alt_premium: {
    cluster: 'F', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Chronic Condition — Ayurvedic Management Track',
    sub: 'Your chronic systemic pattern is best addressed through Ayurvedic constitutional management, targeted nutrition, and daily practice compliance.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Manages Ayurvedic chronic condition protocol — constitutional treatment, Panchakarma-adjacent approaches, and systemic rebalancing.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers Ayurveda-integrated dietary management for the chronic condition pattern.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Supports daily dinacharya, condition-appropriate yoga, and breathwork for systemic recovery.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Chronic Condition — Ayurvedic Management.'
  },

  /* ══ CLUSTER G — IMMUNITY & PREVENTION ══ */

  G1_immunity_essential_allopathic: {
    cluster: 'G', paradigm: 'A', tier: 'essential',
    eyebrow: 'Immunity & Prevention — Clinical Foundation',
    sub: 'Your profile shows a proactive prevention intent with sedentary lifestyle risk. Clinical screening and nutritional optimisation form the foundation.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Reviews immunity baseline — CBC, Vitamin D, B12, and metabolic panel — to confirm no active deficiency or inflammatory process.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements an immunity-optimising nutritional protocol targeting identified deficiencies.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Immunity & Prevention — Clinical Foundation.'
  },

  G2_immunity_essential_ayurvedic: {
    cluster: 'G', paradigm: 'ALT', tier: 'essential',
    eyebrow: 'Immunity & Prevention — Ayurvedic Foundation',
    sub: 'Your profile reflects Ojas depletion and low Bala. The Ayurvedic approach builds innate immunity through constitutional protocol and nutritional support.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Assesses Ojas and Bala, prescribes Rasayana immunity protocol — ashwagandha, guduchi, amalaki — within the AYUSH formulary.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements Ayurveda-aligned immunity-building nutrition and Agni-strengthening meal protocol.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Immunity & Prevention — Ayurvedic Foundation.'
  },

  G3_immunity_premium_allopathic: {
    cluster: 'G', paradigm: 'A', tier: 'premium',
    eyebrow: 'Immunity & Prevention — Active Optimisation',
    sub: 'Your immunity profile with sleep and motivation signals indicates systemic depletion. A three-expert team addresses the clinical, nutritional, and lifestyle dimensions.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Reviews expanded immunity panel and identifies the primary depletion mechanism requiring correction.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers a phased immunity-restoration nutritional programme.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Wellness Coach',
        detail: 'Tracks sleep hygiene, stress load, and daily lifestyle compliance — the primary determinants of sustained immunity.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Immunity & Prevention — Active Optimisation.'
  },

  G4_immunity_premium_ayurvedic: {
    cluster: 'G', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Immunity & Prevention — Ayurvedic Deep Build',
    sub: 'Your immunity depletion with sleep and motivational signals requires sustained Ayurvedic rebuilding, nutritional support, and daily wellness compliance.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Manages comprehensive Rasayana protocol and Ojas-rebuilding Ayurvedic intervention across the care period.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers immunity-building nutrition aligned with Ayurvedic seasonal and constitutional principles.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Wellness Coach',
        detail: 'Tracks dinacharya adherence, sleep rhythm, and daily Ayurvedic lifestyle compliance.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Immunity & Prevention — Ayurvedic Deep Build.'
  },

  G5_immunity_pollution_allopathic: {
    cluster: 'G', paradigm: 'A', tier: 'premium',
    eyebrow: 'Immunity & Prevention — Environmental Exposure',
    sub: 'Your profile includes significant environmental or pollution exposure. The team focuses on clinical oxidative stress management, nutritional defence, and respiratory resilience.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Reviews respiratory and oxidative stress markers — AQI-related inflammatory indicators and lung function baseline.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements an antioxidant-dense, anti-inflammatory nutritional protocol for pollution defence.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers pranayama and respiratory resilience practices to counteract pollution-related lung stress.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Immunity — Environmental Exposure (Allopathic).'
  },

  G6_immunity_pollution_ayurvedic: {
    cluster: 'G', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Immunity & Prevention — Environmental Exposure (Ayurvedic)',
    sub: 'Your environmental exposure profile is addressed through Ayurvedic Rasayana and Svastha Vrtta — building constitutional resilience against external pollutant load.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS / BHMS Doctor',
        detail: 'Prescribes Ayurvedic anti-pollution protocol — tulsi, turmeric-based Rasayana, and Pranakarma support — within AYUSH formulary.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements antioxidant-rich Ayurvedic dietary protocol for pollution resilience.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers Nasya-adjacent breathwork, pranayama, and respiratory yoga for Ayurvedic respiratory resilience.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Immunity — Environmental Exposure (Ayurvedic).'
  },

  /* ══ CLUSTER H — FERTILITY & CONCEPTION ══ */

  /* -- H1–H4: Allopathic Fertility (Q0=allopathic OR Q0=open) -- */

  H1_fertility_essential: {
    cluster: 'H', paradigm: 'A', tier: 'essential',
    eyebrow: 'Fertility — Clinical Foundation Track',
    sub: 'Your preconception profile is in the early stage — the team establishes hormonal baseline and nutritional optimisation for conception readiness.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist',
        detail: 'Establishes reproductive baseline — LH/FSH, AMH, and cycle mapping — and manages prescriptions for preconception preparation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements folate-forward, fertility-optimised nutritional protocol for conception readiness.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Clinical Foundation.'
  },

  H2_fertility_premium: {
    cluster: 'H', paradigm: 'A', tier: 'premium',
    eyebrow: 'Fertility — Metabolic Optimisation Track',
    sub: 'Your fertility profile includes a weight-cycle interaction that requires coordinated clinical, nutritional, and movement support for optimal conception preparation.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist',
        detail: 'Manages hormonal panel, insulin sensitivity assessment, and cycle regulation prescriptions for fertility preparation.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements fertility-optimised nutrition addressing weight, insulin resistance, and cycle regularity.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers pelvic-supportive yoga, stress-reduction breathwork, and movement protocols for fertility optimisation.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Metabolic Optimisation.'
  },

  H3_fertility_elite_stress: {
    cluster: 'H', paradigm: 'A', tier: 'elite',
    eyebrow: 'Fertility — Stress-Cycle Recovery Track',
    sub: 'Your fertility profile shows a significant stress-cortisol disruption of the reproductive cycle. A four-expert team addresses the clinical, psychological, nutritional, and movement dimensions.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist / MD',
        detail: 'Manages full reproductive panel, cortisol-cycle interaction, and clinical fertility preparation prescriptions.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Addresses the cortisol-reproductive axis through targeted psychological intervention and stress recovery protocol.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Implements fertility-supportive nutrition targeting insulin sensitivity, folate optimisation, and hormonal dietary support.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers pelvic yoga, cortisol-reducing breathwork, and cycle-supportive movement practices.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Stress-Cycle Recovery.'
  },

  H4_fertility_elite_full: {
    cluster: 'H', paradigm: 'A', tier: 'elite',
    eyebrow: 'Fertility — Comprehensive Preconception Programme',
    sub: 'Your multi-signal fertility profile — cycles, acne, mood, and weight — requires the full four-expert team for comprehensive preconception preparation.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'Gynaecologist / MD Specialist',
        detail: 'Leads full hormonal management — LH/FSH, AMH, androgen panel — and manages fertility preparation prescriptions in compliance with Telemedicine Guidelines 2020.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages comprehensive fertility nutrition — insulin resistance, anti-androgen protocol, and preconception supplementation.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Addresses the psychological dimension of fertility preparation — stress, anxiety, and the cortisol-reproductive loop.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers pelvic-opening yoga, breathwork for cortisol regulation, and cycle-supportive daily practice.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Comprehensive Preconception Programme.'
  },

  /* -- H5–H8: Ayurvedic Fertility (Q0=alternative) -- */

  H5_fertility_alt_essential: {
    cluster: 'H', paradigm: 'ALT', tier: 'essential',
    eyebrow: 'Fertility — Ayurvedic Foundation Track',
    sub: 'Your preconception profile is addressed through Prasuti Tantra — Ayurvedic reproductive medicine — focusing on Shukra dhatu and Artava restoration for natural conception preparation.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS MD — Prasuti Tantra & Stri Roga',
        detail: 'Specialist in Ayurvedic reproductive medicine. Conducts reproductive assessment, Artava and Shukra dhatu evaluation, and prescribes fertility Rasayana within full CCIM-defined scope of practice.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements Ayurveda-aligned fertility nutrition — Shukra-nourishing foods, preconception micronutrient support.',
        isActiveLead: true }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Ayurvedic Foundation.'
  },

  H6_fertility_alt_premium: {
    cluster: 'H', paradigm: 'ALT', tier: 'premium',
    eyebrow: 'Fertility — Ayurvedic Metabolic Optimisation',
    sub: 'Your Ayurvedic fertility profile with cycle-weight interaction requires Prasuti Tantra expertise, nutritional support, and daily practice compliance for conception readiness.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS MD — Prasuti Tantra & Stri Roga',
        detail: 'Manages Ayurvedic fertility protocol — cycle regulation through Artava shodhana, Pushpa doshahara, and constitutional Rasayana for metabolic-reproductive restoration.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Delivers Ayurveda-aligned fertility nutrition targeting the weight-cycle metabolic axis.',
        isActiveLead: true },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers Uttanapadasana and pelvic yoga sequences, pranayama for reproductive support, and Ayurvedic dinacharya for cycle regularity.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Ayurvedic Metabolic Optimisation.'
  },

  H7_fertility_alt_elite_stress: {
    cluster: 'H', paradigm: 'ALT', tier: 'elite',
    eyebrow: 'Fertility — Ayurvedic Stress-Cycle Recovery',
    sub: 'Your Ayurvedic fertility profile with significant stress-cycle disruption requires a full four-expert team — Prasuti Tantra expertise, psychological recovery, nutritional support, and daily practice.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS MD — Prasuti Tantra & Stri Roga',
        detail: 'Manages Manasika stress-Artava disruption through Ayurvedic nervine and Medhya Rasayana protocol alongside Stri Roga reproductive management.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Psychotherapist',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Addresses the psychological stress-reproductive axis and cortisol-cycle disruption through structured intervention.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Dietician',
        detail: 'Implements Ayurveda-integrated fertility nutrition — Shukra-nourishing, stress-countering nutritional protocol.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers pelvic yoga, Nadi Shodhana pranayama for cortisol regulation, and Ayurvedic lifestyle anchoring for cycle support.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Ayurvedic Stress-Cycle Recovery.'
  },

  H8_fertility_alt_elite_full: {
    cluster: 'H', paradigm: 'ALT', tier: 'elite',
    eyebrow: 'Fertility — Comprehensive Ayurvedic Preconception Programme',
    sub: 'Your multi-signal Ayurvedic fertility profile requires the complete four-expert team — Prasuti Tantra specialist leadership with full psychological, nutritional, and practice support.',
    team: [
      { role: 'Therapeutic Anchor', badge: 'badge-therapeutic', name: 'BAMS MD — Prasuti Tantra & Stri Roga',
        detail: 'Leads comprehensive Ayurvedic preconception programme — Artava shuddhi, Shukra Rasayana, Beeja samskarana protocols — within full CCIM-defined Prasuti Tantra scope.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Manages comprehensive Ayurvedic fertility nutrition across Shukra, Ojas, and anti-androgenic nutritional dimensions.',
        isActiveLead: true },
      { role: 'Core Accelerator', badge: 'badge-accel', name: 'Psychotherapist',
        detail: 'Addresses preconception psychological load — anxiety, stress, cortisol-reproductive disruption — alongside the Ayurvedic framework.',
        isActiveLead: false },
      { role: 'Compliance Anchor', badge: 'badge-compliance', name: 'Yoga & Breathwork Specialist',
        detail: 'Delivers the full Ayurvedic fertility practice protocol — pelvic yoga, pranayama, dinacharya, and Ritucharya compliance for cycle alignment.',
        isActiveLead: false }
    ],
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Fertility — Comprehensive Ayurvedic Preconception Programme.'
  },

  /* ══ CLUSTER I — FALLBACK & TRIAGE ══ */

  I1_fallback_triage: {
    cluster: 'I', paradigm: 'A', tier: 'essential',
    eyebrow: 'Personal Review Required',
    sub: 'Your profile covers multiple health dimensions that our automated system wants to review personally with you before finalising your team.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS General Practitioner',
        detail: 'Conducts red-flag screening and clinical orientation — confirming no serious pathology is present before a longer-term care team is assembled.',
        isActiveLead: false }
    ],
    isTriage: true,
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Personal Review Requested.'
  },

  I2_fallback_managing: {
    cluster: 'I', paradigm: 'A', tier: 'premium',
    eyebrow: 'Chronic Condition — Triage Management Track',
    sub: 'You are actively managing an ongoing condition. Your Coordinator will confirm your specialist allocation after reviewing your case brief.',
    team: [
      { role: 'Diagnostic Anchor', badge: 'badge-anchor', name: 'MBBS GP / MD Specialist',
        detail: 'Manages clinical oversight, reviews existing treatment history, and establishes the medical framework for the care team.',
        isActiveLead: false },
      { role: 'Active Treatment Lead', badge: 'badge-driver', name: 'Dietician',
        detail: 'Your primary point of daily contact and the driver of your recovery plan. Implements condition-specific dietary management while Coordinator finalises specialist allocation.',
        isActiveLead: true }
    ],
    isTriage: true,
    waCopy: 'Hello JeevanKey, I completed the Clinical Navigator. Result: Chronic Condition — Coordinator Review.'
  }

};

/* ══════════════════════════════════════════════════════════════
   computeProfile(q0, q1, q2, q3, q4, q5)
   The 7-Stage v5 Routing Engine.

   Parameters:
     q0  {string}   'allopathic' | 'alternative' | 'open' | 'guided'
     q1  {string}   'mind' | 'gut' | 'pain' | 'hormonal' | 'energy' | 'chronic'
     q2  {string}   'acute' | 'months' | 'long' | 'recurring'
     q3  {string[]} Multi-select array. Possible values:
                    'sleep','weight','skin_hair','mood','motivation',
                    'meal_fatigue','periods','acne','conceive','none'
                    ('conceive' = planning to conceive flag)
     q4  {string}   'sedentary' | 'stressed' | 'sleep_issue' | 'managing'
     q5  {string}   'clear' | 'dissatisfied' | 'confused' — only evaluated
                    when q0='open'; pass null for locked-paradigm users.

   Returns:
     {
       profileKey        : {string}  key into PROFILES
       profile           : {object}  full PROFILES entry
       tier              : {string}  'trial'|'essential'|'premium'|'elite'
       paradigm          : {string}  resolved 'A' or 'ALT'
       seniority_escalation : {boolean}
       isTriage          : {boolean}
       isGuided          : {boolean}
     }
   Returns null for guided/confused — caller must render triage screen.
══════════════════════════════════════════════════════════════ */
function computeProfile(q0, q1, q2, q3, q4, q5) {

  /* ── helpers ── */
  const has = (val) => Array.isArray(q3) && q3.includes(val);
  const hormonal_overlap_signals = ['periods', 'acne', 'skin_hair'];
  const hasHormonalOverlap = hormonal_overlap_signals.some(s => has(s));
  const conceiveFlag = has('conceive');
  const envFlag = has('env_exposure'); /* environmental exposure — set externally if needed */

  /* ══ STAGE 1: PARADIGM GATE ══ */
  let paradigm = q0; /* 'allopathic' | 'alternative' | 'open' */

  if (q0 === 'guided') {
    return { isGuided: true, isTriage: true, profileKey: 'I1_fallback_triage', profile: PROFILES['I1_fallback_triage'], tier: 'essential', paradigm: 'A', seniority_escalation: false };
  }

  /* ══ STAGE 2: CONFIDENCE CHECK (open paradigm only) ══ */
  let seniority_escalation = false;

  if (q0 === 'open') {
    if (q5 === 'confused') {
      return { isGuided: true, isTriage: true, profileKey: 'I1_fallback_triage', profile: PROFILES['I1_fallback_triage'], tier: 'essential', paradigm: 'A', seniority_escalation: false };
    }
    if (q5 === 'dissatisfied') {
      seniority_escalation = true;
      /* No complexity point addition — seniority only. */
    }
  }

  /* ══ STAGE 3: PRIMARY CLUSTER IDENTIFICATION ══ */
  /* Q4 managing override runs first — supersedes Q1 unless Cluster H */
  let cluster;
  let clusterH_fertility = false;

  if (q4 === 'managing' && q1 !== 'hormonal') {
    cluster = 'F';
  } else if (q1 === 'hormonal' && conceiveFlag) {
    cluster = 'H';
    clusterH_fertility = true;
  } else if (q1 === 'chronic' || (q4 === 'managing')) {
    cluster = 'F';
  } else if (q1 === 'mind') {
    cluster = 'A';
  } else if ((q1 === 'gut' || q1 === 'energy') && envFlag) {
    cluster = 'G';
  } else if (q1 === 'gut') {
    cluster = 'B';
  } else if (q1 === 'pain') {
    cluster = 'C';
  } else if (q1 === 'hormonal') {
    cluster = 'D';
  } else if (q1 === 'energy') {
    cluster = 'E';
  } else {
    /* Ambiguous — 3+ cluster overlap → Fallback */
    return _fallbackResult(q4, seniority_escalation);
  }

  /* ── Cluster H Paradigm Safety Override ── */
  /* Only fires for open-paradigm users entering fertility cluster.
     Locked-paradigm users (allopathic/alternative) proceed without override. */
  if (cluster === 'H') {
    if (paradigm === 'open') {
      paradigm = 'allopathic'; /* Safety default: clinical oversight required */
    }
    /* paradigm === 'allopathic' → confirmed, no change */
    /* paradigm === 'alternative' → confirmed, no change — full ALT tracks available */
  }

  /* ══ STAGE 4: CLINICAL COMPLEXITY SCORING ══ */
  const dur_score = { acute: 0, months: 1, long: 2, recurring: 3 }[q2] || 0;

  const q3_effective = Array.isArray(q3) ? q3.filter(v => v !== 'none' && v !== 'conceive' && v !== 'env_exposure') : [];
  let sig_score = Math.min(q3_effective.length, 3); /* Cap at 3 */

  /* Hormonal overlap modifier on non-hormonal clusters */
  if (cluster !== 'D' && cluster !== 'H' && hasHormonalOverlap) {
    sig_score += 1;
  }

  const complexity = dur_score + sig_score;

  /* Complexity → tier floor */
  let tier;
  if (complexity <= 1) {
    tier = 'essential';
  } else if (complexity <= 4) {
    tier = 'premium';
  } else {
    tier = 'elite';
  }

  /* ══ STAGE 5: LIFESTYLE & INTENT MODIFIER (Q4) ══ */
  /* Q4 influences which expert fills available roles within the tier.
     It does NOT change tier or add headcount.
     Encoded as a preference hint consumed by the mapping selector. */
  const q4_hint = q4; /* 'sedentary'|'stressed'|'sleep_issue'|'managing' */

  /* Managing already processed in Stage 3 — re-confirm cluster F if reached here */
  if (q4 === 'managing' && cluster !== 'F') {
    cluster = 'F';
  }

  /* ══ STAGE 6: PARADIGM RESOLUTION FOR 'open' USERS ══ */
  if (paradigm === 'open') {
    /* Condition A — clinical anchor signals → allopathic */
    const clinical_anchor_signals = ['periods','acne','skin_hair'];
    const hasClinicalAnchor = clinical_anchor_signals.some(s => has(s)) || conceiveFlag || q4 === 'managing' || complexity >= 4;

    /* Condition B — lifestyle/systemic dominance + low complexity → alternative */
    const lifestyle_signals = ['meal_fatigue','sleep','motivation','weight'];
    const lifestyleCount = lifestyle_signals.filter(s => has(s)).length;
    const lifestyleDominant = lifestyleCount >= 2 && complexity <= 3 && !hasClinicalAnchor;

    if (hasClinicalAnchor) {
      paradigm = 'allopathic';
    } else if (lifestyleDominant) {
      paradigm = 'alternative';
    } else {
      paradigm = 'allopathic'; /* Condition C: conservative safety default */
    }
  }

  /* Normalise paradigm to schema codes */
  const pdm = (paradigm === 'alternative') ? 'ALT' : 'A';

  /* ══ STAGE 7: TEAM ASSEMBLY & SENIORITY ESCALATION ══ */
  const profileKey = _selectMapping(cluster, pdm, tier, q4_hint, q1, q3);

  if (!profileKey || !PROFILES[profileKey]) {
    return _fallbackResult(q4, seniority_escalation);
  }

  let profile = PROFILES[profileKey];
  const resolvedTier = profile.tier;

  /* Step 7a — Seniority Escalation: credential upgrade in-place (non-mutating) */
  if (seniority_escalation) {
    profile = _applySeniorityEscalation(profile, cluster, pdm);
  }

  return {
    profileKey,
    profile,
    tier: resolvedTier,
    paradigm: pdm,
    seniority_escalation,
    isTriage: !!profile.isTriage,
    isGuided: false
  };
}

/* ── Internal: Mapping Selector ──
   Returns the single best-match PROFILES key for the resolved
   cluster + paradigm + tier + q4 hint combination.          */
function _selectMapping(cluster, pdm, tier, q4_hint, q1, q3) {
  const has = (val) => Array.isArray(q3) && q3.includes(val);

  /* ══ CLUSTER A ══ */
  if (cluster === 'A') {
    if (pdm === 'ALT') {
      return tier === 'essential' ? 'A6_mind_alt_essential' : 'A7_mind_alt_premium';
    }
    /* Hormonal cross-cluster upgrade */
    if (['periods','acne','skin_hair'].some(s => has(s))) return 'A5_mind_hormonal_xcluster';
    if (tier === 'essential') return 'A1_mind_essential';
    if (tier === 'elite')     return 'A4_mind_elite';
    /* Premium — Q4 hint selects between sleep and diet variants */
    if (q4_hint === 'sleep_issue' || has('sleep')) return 'A3_mind_premium_sleep';
    return 'A2_mind_premium_diet';
  }

  /* ══ CLUSTER B ══ */
  if (cluster === 'B') {
    if (pdm === 'ALT') {
      return tier === 'essential' ? 'B5_gut_alt_essential' : 'B6_gut_alt_premium';
    }
    if (tier === 'essential') return 'B1_gut_essential';
    if (has('weight'))        return 'B3_gut_premium_weight';
    if (q4_hint === 'stressed' || has('mood') || has('motivation')) return 'B4_gut_premium_stress';
    return 'B2_gut_premium_chronic';
  }

  /* ══ CLUSTER C ══ */
  if (cluster === 'C') {
    if (tier === 'essential') return 'C1_pain_essential';
    if (tier === 'elite')     return 'C4_pain_elite';
    if (has('weight') || q4_hint === 'sedentary') return 'C3_pain_premium_weight';
    if (q4_hint === 'stressed' || has('mood') || has('sleep')) return 'C2_pain_premium_stress';
    return 'C2_pain_premium_stress';
  }

  /* ══ CLUSTER D ══ */
  if (cluster === 'D') {
    if (pdm === 'ALT') {
      return tier === 'essential' ? 'D5_hormonal_alt_essential' : 'D6_hormonal_alt_premium';
    }
    if (tier === 'essential') return 'D1_hormonal_essential';
    if (tier === 'elite')     return 'D4_hormonal_elite';
    if (has('mood') || has('motivation') || has('sleep')) return 'D2_hormonal_premium_stress';
    if (has('skin_hair') || has('acne')) return 'D3_hormonal_premium_skin';
    return 'D2_hormonal_premium_stress';
  }

  /* ══ CLUSTER E ══ */
  if (cluster === 'E') {
    if (pdm === 'ALT') {
      return tier === 'essential' ? 'E5_energy_alt_essential' : 'E6_energy_alt_premium';
    }
    if (tier === 'essential') return 'E1_energy_essential';
    if (['periods','acne','skin_hair'].some(s => has(s))) return 'E4_energy_premium_hormonal';
    if (q4_hint === 'stressed' || has('mood') || has('sleep')) return 'E2_energy_premium_stress';
    if (has('meal_fatigue') || has('weight'))                   return 'E3_energy_premium_gut';
    return 'E2_energy_premium_stress';
  }

  /* ══ CLUSTER F ══ */
  if (cluster === 'F') {
    if (pdm === 'ALT') return 'F5_chronic_alt_premium';
    if (tier === 'essential') return 'F1_chronic_essential';
    if (tier === 'elite') {
      if (has('mood') || has('motivation') || has('sleep')) return 'F4_chronic_elite_psych';
      return 'F3_chronic_elite_complex';
    }
    return 'F2_chronic_premium';
  }

  /* ══ CLUSTER G ══ */
  if (cluster === 'G') {
    const hasEnv = has('env_exposure');
    if (pdm === 'ALT') {
      if (hasEnv) return 'G6_immunity_pollution_ayurvedic';
      if (has('sleep') || has('motivation')) return 'G4_immunity_premium_ayurvedic';
      return 'G2_immunity_essential_ayurvedic';
    }
    if (hasEnv) return 'G5_immunity_pollution_allopathic';
    if (has('sleep') || has('motivation')) return 'G3_immunity_premium_allopathic';
    return 'G1_immunity_essential_allopathic';
  }

  /* ══ CLUSTER H ══ */
  if (cluster === 'H') {
    if (pdm === 'ALT') {
      if (tier === 'essential') return 'H5_fertility_alt_essential';
      if (tier === 'premium')   return 'H6_fertility_alt_premium';
      /* Elite — stress vs full */
      if (has('mood') || has('motivation')) return 'H7_fertility_alt_elite_stress';
      return 'H8_fertility_alt_elite_full';
    }
    /* Allopathic fertility */
    if (tier === 'essential') return 'H1_fertility_essential';
    if (tier === 'premium')   return 'H2_fertility_premium';
    if (has('mood') || has('motivation')) return 'H3_fertility_elite_stress';
    return 'H4_fertility_elite_full';
  }

  return null;
}

/* ── Internal: Seniority Escalation ──
   Returns a new profile object (non-mutating) with upgraded
   Diagnostic/Therapeutic Anchor credential label.          */
function _applySeniorityEscalation(profile, cluster, pdm) {
  const upgraded = JSON.parse(JSON.stringify(profile)); /* deep clone */
  const anchor = upgraded.team[0];

  if (pdm === 'ALT') {
    /* BAMS/BHMS → Senior BAMS (8+ years) or BAMS MD Prasuti Tantra for H cluster */
    if (cluster === 'H') {
      anchor.detail = 'Senior BAMS MD Specialist — Prasuti Tantra & Stri Roga, minimum 8 years reproductive medicine practice. ' + anchor.detail;
    } else {
      anchor.name = 'Senior BAMS / Senior BHMS Doctor';
      anchor.detail = 'Senior practitioner (8+ years clinical practice). ' + anchor.detail;
    }
  } else {
    /* Allopathic escalation by cluster */
    if (cluster === 'D' || cluster === 'H') {
      anchor.name = 'Gynaecologist / MD Specialist — Women\'s Health';
      anchor.detail = 'Senior specialist with 8+ years reproductive medicine experience. ' + anchor.detail;
    } else if (cluster === 'F') {
      anchor.name = 'MD Specialist (Senior)';
      anchor.detail = 'Senior MD Specialist with 8+ years experience in systemic and chronic condition management. ' + anchor.detail;
    } else {
      anchor.name = anchor.name.replace('MBBS General Practitioner', 'MBBS — Senior GP / MD Generalist').replace('MBBS GP', 'MBBS Senior GP');
      anchor.detail = 'Senior practitioner (5+ years specialist experience). ' + anchor.detail;
    }
  }

  /* Flag all Active Treatment Leads for senior assignment */
  upgraded.team.forEach(m => {
    if (m.isActiveLead) {
      m.detail = m.detail + ' [Senior / RCI-Registered practitioner preferred for this case.]';
    }
  });

  upgraded.seniorityEscalated = true;
  return upgraded;
}

/* ── Internal: Fallback Result Builder ── */
function _fallbackResult(q4, seniority_escalation) {
  const key = (q4 === 'managing') ? 'I2_fallback_managing' : 'I1_fallback_triage';
  return {
    profileKey: key,
    profile: PROFILES[key],
    tier: PROFILES[key].tier,
    paradigm: 'A',
    seniority_escalation,
    isTriage: true,
    isGuided: false
  };
}

/* ── Export for module environments ── */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeProfile, PROFILES, PLANS };
}

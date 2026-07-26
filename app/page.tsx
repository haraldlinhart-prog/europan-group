'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './home.css'

const EP_RATE = 1.00

export default function HomePage() {
  const [rate, setRate] = useState(EP_RATE)
  const [formstart, setFormstart] = useState(0)
  const [contactStatus, setContactStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')
  const [contactErr, setContactErr] = useState('')

  useEffect(() => {
    fetch('/api/rate').then(r => r.json()).then(d => setRate(d.rate || EP_RATE)).catch(() => {})
    setFormstart(Date.now())
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
    ;(window as any).setLang?.(l)
  }, [])

  async function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('website')) return
    if (Date.now() - formstart < 3000) return
    const msg = String(data.get('message') || '')
    const noSpaces = msg.replace(/\s/g, '')
    if (noSpaces.length > 60 && noSpaces.length === msg.length) return
    setContactStatus('sending'); setContactErr('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), subject: data.get('subject'), message: data.get('message'), elapsed: Date.now() - formstart }),
      })
      if (res.ok) { setContactStatus('ok'); form.reset(); setFormstart(Date.now()) }
      else { const d = await res.json(); setContactErr(d.error || 'Fehler'); setContactStatus('err') }
    } catch { setContactErr('Netzwerkfehler'); setContactStatus('err') }
  }

  const props = [
    { icon: '🛒', title_de: 'Shop-Bonuswährung', title_en: 'Shop Bonus Currency', desc_de: 'Jeder Kauf auf shop.pan21.com bringt 2% EUROPAN. Mit EUROPAN bezahlen aktiviert den Doppel-Wums: 5% zurück.', desc_en: 'Every purchase on shop.pan21.com earns 2% EUROPAN. Pay with EUROPAN to activate the Doppel-Wums: 5% back.' },
    { icon: '🔒', title_de: 'Nur privates Netzwerk', title_en: 'Private Network Only', desc_de: 'EUROPAN wird nicht öffentlich gehandelt. Zugang ausschließlich für verifizierte Noble-Limited-Mitglieder.', desc_en: 'EUROPAN is not publicly traded. Access is exclusively for verified Noble Limited members.' },
    { icon: '⚡', title_de: 'Sofortige Überweisungen', title_en: 'Instant Transfers', desc_de: 'EP sofort an jedes Noble-Mitglied überweisen. Guthaben aktualisiert sich in Echtzeit im Noble-Dashboard.', desc_en: 'Transfer EP to any Noble member instantly. Balances update in real time on your Noble dashboard.' },
    { icon: '🇪🇺', title_de: 'Europäische Identität', title_en: 'European Identity', desc_de: 'Konzipiert für europäische Gründer, Investoren und Unternehmen im PAN21-Netzwerk.', desc_en: 'Designed for European entrepreneurs, investors and businesses within the PAN21 network.' },
  ]

  const bonusCards = [
    { icon: '🧾', title_de: 'Kauf mit Stripe', title_en: 'Purchase via Stripe', desc_de: 'Zahlen Sie mit Kreditkarte auf shop.pan21.com und erhalten Sie automatisch 2% des Kaufpreises als EUROPAN gutgeschrieben.', desc_en: 'Pay by credit card on shop.pan21.com and automatically receive 2% of the purchase price credited as EUROPAN.' },
    { icon: '🎉', title_de: 'Doppel-Wums', title_en: 'Doppel-Wums', desc_de: 'Zahlen Sie Ihren Einkauf direkt mit EUROPAN oder einer anderen Noble-Währung — Sie erhalten 5% EUROPAN-Bonus zurück.', desc_en: 'Pay for your purchase directly with EUROPAN or another Noble currency — get a 5% EUROPAN bonus back.' },
    { icon: '🤝', title_de: 'Affiliate-Provision', title_en: 'Affiliate Commission', desc_de: 'Empfehlen Sie den PAN21 Shop weiter. Bei jedem Kauf über Ihren Affiliate-Link erhalten Sie 5% des Kaufpreises in EUROPAN.', desc_en: 'Refer the PAN21 Shop to others. Every purchase through your affiliate link earns you 5% of the purchase price in EUROPAN.' },
  ]

  const howSteps = [
    { title_de: 'Betrag wählen', title_en: 'Choose your amount', desc_de: 'Bis zu 1.000 € per Kreditkarte — sofortige Gutschrift. Darüber per Banküberweisung an Noble Private Capital Limited in Hongkong.', desc_en: 'Up to €1,000 by credit card — instant delivery. Above €1,000 by bank transfer to Noble Private Capital Limited in Hong Kong.' },
    { title_de: 'Sicher bezahlen', title_en: 'Pay securely', desc_de: 'Kartenzahlungen über Stripe (Visa, Mastercard, Amex, Apple Pay). Bei Überweisungen bitte Ihre Noble-Konto-E-Mail als Verwendungszweck angeben.', desc_en: 'Card payments via Stripe (Visa, Mastercard, Amex, Apple Pay). Bank transfers reference your Noble account email for identification.' },
    { title_de: 'EUROPAN erhalten', title_en: 'Receive EUROPAN', desc_de: 'Ihr EP-Guthaben wird automatisch Ihrem Noble-Limited-Dashboard gutgeschrieben. Kartenzahlungen sofort — Überweisungen innerhalb von 1–3 Werktagen.', desc_en: 'Your EP balance is credited to your Noble Limited dashboard automatically. Card orders are instant — bank transfers within 1–3 business days.' },
    { title_de: 'Im Netzwerk & Shop einsetzen', title_en: 'Use in the network & shop', desc_de: 'Auf shop.pan21.com mit EP für den Doppel-Wums-Bonus bezahlen, an Noble-Mitglieder überweisen oder als stabilen privaten Wertspeicher ansammeln.', desc_en: 'Pay on shop.pan21.com with EP for the Doppel-Wums bonus, transfer to Noble members, or accumulate as a stable private store of value.' },
  ]

  const trustCards = [
    { title_de: 'Herausgegeben von Noble Limited', title_en: 'Issued by Noble Limited', text_de: 'EUROPAN wird von Noble Private Capital Ltd (handelnd als „Noble Limited") herausgegeben und verwaltet, eingetragen in Neuseeland. Alle Guthaben, Transaktionen und Gutschriften laufen über die Noble-Plattform.', text_en: 'EUROPAN is issued and managed by Noble Private Capital Ltd (trading as "Noble Limited"), registered in New Zealand. All balances, transactions and credits are handled through the Noble platform.' },
    { title_de: 'Fester Kurs 1:1 — 1,00 € = 1 EP', title_en: 'Fixed 1:1 Rate — €1.00 = 1 EP', text_de: 'Keine Spekulation, keine Kursschwankungen, keine Gas Fees. EUROPAN ist fest an 1,00 € gebunden. Eine stabile private Währung für stabilen privaten Wert.', text_en: 'No speculation, no volatility, no gas fees. EUROPAN is pegged at €1.00. A stable private currency for stable private value.' },
    { title_de: 'Nicht öffentlich gehandelt', title_en: 'Not Publicly Traded', text_de: 'EUROPAN ist an keiner Börse notiert. Seine Stabilität ergibt sich gerade aus dem geschlossenen Netzwerkcharakter — verfügbar nur für Noble-Mitglieder.', text_en: 'EUROPAN is not listed on any exchange. Its stability comes precisely from its closed-network character — available only to Noble members.' },
    { title_de: 'Zahlungen abgesichert über Stripe', title_en: 'Stripe-Secured Payments', text_de: 'Kartenkäufe laufen über Stripe, PCI-DSS-konform. Ihre Kartendaten werden niemals auf unseren Servern gespeichert.', text_en: 'Card purchases use Stripe, PCI-DSS compliant. Your card data is never stored on our servers.' },
    { title_de: 'Shop-integrierter Bonus', title_en: 'Shop-Integrated Bonus', text_de: 'EUROPAN ist die einzige Noble-Währung mit direkter Bonus-Integration auf shop.pan21.com — Sie erhalten EP bei jedem Kauf.', text_en: 'EUROPAN is the only Noble currency with a direct bonus integration on shop.pan21.com — earning you EP on every purchase.' },
    { title_de: 'API-gestützte Guthaben', title_en: 'API-Backed Balances', text_de: 'Jedes EP-Guthaben wird in der Noble-Limited-Plattform geführt, 24/7 über Ihr sicheres Mitglieder-Dashboard einsehbar. Vollständig nachvollziehbar.', text_en: 'Every EP balance is maintained in the Noble Limited platform, accessible 24/7 via your secure member dashboard. Fully auditable.' },
  ]

  
return (
    <div>
{/* <!-- SUPPORT:START --> */}
<div dangerouslySetInnerHTML={{__html: "\n<!-- SUPPORT BUTTON + POPUP -->\n<style>\niframe[src*=\"tawk.to\"] { visibility: hidden !important; }\nbody.pan21-sup-tawk-visible iframe[src*=\"tawk.to\"] { visibility: visible !important; }\n</style>\n\n<div id=\"pan21-sup-wrap\" style=\"position:fixed;bottom:212px;right:24px;z-index:9999;font-family:system-ui,-apple-system,sans-serif;\">\n  <button id=\"pan21-sup-btn\" onclick=\"(function(){var w=document.getElementById('pan21-sup-card');var open=w.style.display==='block';w.style.display=open?'none':'block';})()\" style=\"display:flex;align-items:center;gap:7px;background:#0B1F3A;color:#C9963A;border:1.5px solid rgba(196,150,58,0.45);padding:10px 18px;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px;box-shadow:0 3px 14px rgba(0,0,0,0.28);letter-spacing:0.04em;\">\n    <svg width=\"16\" height=\"16\" viewBox=\"0 0 20 20\" fill=\"currentColor\" style=\"flex-shrink:0;\"><path d=\"M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-2.556-.372c-.605.526-1.775 1.372-3.444 1.372a.5.5 0 01-.4-.8c.5-.667.9-1.6 1.05-2.4C3.02 13.55 2 11.9 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z\"/></svg>\n    <span class=\"pan21-sup-i18n\" data-p21supde=\"Support\" data-p21supen=\"Support\">Support</span>\n  </button>\n  <div id=\"pan21-sup-card\" style=\"display:none;position:absolute;bottom:56px;right:0;width:380px;max-width:calc(100vw - 48px);max-height:min(640px, calc(100vh - 100px));overflow-y:auto;background:#fff;border-radius:10px;box-shadow:0 8px 32px rgba(11,31,58,0.28);border:1px solid #E2DDD8;\">\n    <div style=\"background:#0B1F3A;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:1;\">\n      <div>\n        <div style=\"font-family:Georgia,serif;font-size:1.1rem;font-weight:700;color:#fff;margin-bottom:2px;\" class=\"pan21-sup-i18n\" data-p21supde=\"Support\" data-p21supen=\"Support\">Support</div>\n        <div style=\"font-size:0.72rem;color:rgba(255,255,255,0.55);letter-spacing:0.08em;text-transform:uppercase;\" class=\"pan21-sup-i18n\" data-p21supde=\"Wählen Sie, was gerade passt\" data-p21supen=\"Choose what works for you\">Wählen Sie, was gerade passt</div>\n      </div>\n      <button onclick=\"document.getElementById('pan21-sup-card').style.display='none'\" style=\"background:none;border:none;color:rgba(255,255,255,0.6);font-size:18px;cursor:pointer;line-height:1;padding:0;\">&#10005;</button>\n    </div>\n    <div style=\"padding:18px 20px;display:flex;flex-direction:column;gap:14px;\">\n\n      <a href=\"#\" onclick=\"(function(e){e.preventDefault();if(document.getElementById('famulor-widget-embed'))return;var s=document.createElement('script');s.id='famulor-widget-embed';s.src='https://app.famulor.de/embed.js';s.setAttribute('data-assistant-id','2ff6ddca-ffcb-43f1-8b4a-4c71025e3fed');document.body.appendChild(s);})(event)\" style=\"display:block;border:1px solid #E2DDD8;border-radius:8px;padding:14px;text-decoration:none;cursor:pointer;\">\n        <div style=\"font-family:Georgia,serif;font-size:1rem;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#128172; KI-Chat &amp; Netz-Telefon\" data-p21supen=\"&#128172; AI Chat &amp; Voice Call\">&#128172; KI-Chat &amp; Netz-Telefon</div>\n        <div style=\"display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:#16a34a;font-weight:600;margin-bottom:8px;\">\n          <span style=\"width:7px;height:7px;border-radius:50%;background:#16a34a;display:inline-block\"></span><span class=\"pan21-sup-i18n\" data-p21supde=\"Immer sofort verfügbar\" data-p21supen=\"Always available\">Immer sofort verfügbar</span>\n        </div>\n        <div style=\"font-size:.8rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Tippen oder sprechen Sie mit unserem KI-Assistenten &mdash; direkt im Browser, kein Telefon nötig. Auf Wunsch verbindet er Sie live mit unserem Team. &lt;strong style=&quot;color:#FF6B35;&quot;&gt;Jetzt starten &rarr;&lt;/strong&gt;\" data-p21supen=\"Type or talk to our AI assistant &mdash; right in your browser, no phone needed. On request, it connects you live with our team. &lt;strong style=&quot;color:#FF6B35;&quot;&gt;Start now &rarr;&lt;/strong&gt;\">Tippen oder sprechen Sie mit unserem KI-Assistenten &mdash; direkt im Browser, kein Telefon nötig. Auf Wunsch verbindet er Sie live mit unserem Team. <strong style=\"color:#FF6B35;\">Jetzt starten &rarr;</strong></div>\n      </a>\n\n      <a href=\"#\" onclick=\"pan21SupOpenTawk();return false;\" style=\"display:block;border:1px solid #E2DDD8;border-radius:8px;padding:14px;text-decoration:none;cursor:pointer;\">\n        <div style=\"font-family:Georgia,serif;font-size:1rem;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#128100; Live-Person im Chat\" data-p21supen=\"&#128100; Live Person in Chat\">&#128100; Live-Person im Chat</div>\n        <div style=\"display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:#94a3b8;font-weight:600;margin-bottom:8px;\">\n          <span id=\"pan21-sup-live-dot\" style=\"width:7px;height:7px;border-radius:50%;background:#94a3b8;display:inline-block\"></span><span id=\"pan21-sup-live-text\" class=\"pan21-sup-i18n\" data-p21supde=\"Status wird geprüft&hellip;\" data-p21supen=\"Checking status&hellip;\">Status wird geprüft&hellip;</span>\n        </div>\n        <div style=\"font-size:.8rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Ist gerade jemand aus unserem Team online, steigt er direkt in denselben Chat mit ein &mdash; ohne Kanalwechsel.\" data-p21supen=\"If someone from our team is online right now, they'll join this same chat directly &mdash; no need to switch channels.\">Ist gerade jemand aus unserem Team online, steigt er direkt in denselben Chat mit ein &mdash; ohne Kanalwechsel.</div>\n      </a>\n\n      <a href=\"tel:+493056844500\" style=\"display:block;border:1px solid #E2DDD8;border-radius:8px;padding:14px;text-decoration:none;cursor:pointer;\">\n        <div style=\"font-family:Georgia,serif;font-size:1rem;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#128222; Telefon-Hotline &amp; Bestell-Hotline\" data-p21supen=\"&#128222; Phone &amp; Order Hotline\">&#128222; Telefon-Hotline &amp; Bestell-Hotline</div>\n        <div style=\"display:inline-flex;align-items:center;gap:5px;font-size:.66rem;letter-spacing:.05em;text-transform:uppercase;color:#16a34a;font-weight:600;margin-bottom:8px;\">\n          <span style=\"width:7px;height:7px;border-radius:50%;background:#16a34a;display:inline-block\"></span><span class=\"pan21-sup-i18n\" data-p21supde=\"Immer sofort verfügbar\" data-p21supen=\"Always available\">Immer sofort verfügbar</span>\n        </div>\n        <div style=\"font-size:.8rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Beratung zu Firmengründung, Anliegen &amp; Bestellungen &mdash; auf Wunsch direkt mit einem Mitarbeiter verbunden. &lt;strong style=&quot;color:#0B1F3A;&quot;&gt;+49 30 568 44 500&lt;/strong&gt;\" data-p21supen=\"Advice on company formation, questions &amp; orders &mdash; connected directly with a team member on request. &lt;strong style=&quot;color:#0B1F3A;&quot;&gt;+49 30 568 44 500&lt;/strong&gt;\">Beratung zu Firmengründung, Anliegen &amp; Bestellungen &mdash; auf Wunsch direkt mit einem Mitarbeiter verbunden. <strong style=\"color:#0B1F3A;\">+49 30 568 44 500</strong></div>\n      </a>\n\n      <div style=\"background:#F7F5F1;border-radius:8px;padding:12px 14px;\">\n        <div style=\"font-size:.72rem;font-weight:700;color:#0B1F3A;margin-bottom:4px;\" class=\"pan21-sup-i18n\" data-p21supde=\"&#8505;&#65039; Gut zu wissen\" data-p21supen=\"&#8505;&#65039; Good to know\">&#8505;&#65039; Gut zu wissen</div>\n        <div style=\"font-size:.74rem;color:#5a6a7e;line-height:1.55;\" class=\"pan21-sup-i18n\" data-p21supde=\"Der Sprachanruf im Browser verbindet Sie technisch mit derselben Hotline wie ein Anruf unter +49 30 568 44 500 &mdash; nur direkt aus dem Browser, weltweit, ohne Auslandsgebühren. Mikrofon/Lautsprecher genügen, kein Telefon nötig.\" data-p21supen=\"The in-browser voice call technically connects you to the same hotline as calling +49 30 568 44 500 &mdash; just directly from your browser, worldwide, with no international fees. A microphone/speakers is all you need, no phone required.\">Der Sprachanruf im Browser verbindet Sie technisch mit derselben Hotline wie ein Anruf unter +49 30 568 44 500 &mdash; nur direkt aus dem Browser, weltweit, ohne Auslandsgebühren. Mikrofon/Lautsprecher genügen, kein Telefon nötig.</div>\n      </div>\n\n    </div>\n  </div>\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21sit83k6o'))return;var m=document.createElement('meta');m.id='pan21sit83k6o';document.head.appendChild(m);(function(){var s=document.createElement('script');s.textContent=&quot;\\nif(!window.__pan21SupTawkLoaded){\\n  window.__pan21SupTawkLoaded = true;\\n  var Tawk_API=window.Tawk_API||{}, Tawk_LoadStart=new Date();\\n  window.Tawk_API = Tawk_API;\\n  Tawk_API.onChatMinimized = function(){ document.body.classList.remove('pan21-sup-tawk-visible'); };\\n  Tawk_API.onChatHidden = function(){ document.body.classList.remove('pan21-sup-tawk-visible'); };\\n  Tawk_API.onStatusChange = function(status){\\n    var dot = document.getElementById('pan21-sup-live-dot');\\n    var txt = document.getElementById('pan21-sup-live-text');\\n    if(!dot || !txt) return;\\n    if(status === 'online'){ dot.style.background='#16a34a'; txt.textContent='Jetzt live verfügbar'; }\\n    else { dot.style.background='#94a3b8'; txt.textContent='Aktuell nicht live besetzt'; }\\n  };\\n  (function(){\\n    var s1=document.createElement('script'),s0=document.getElementsByTagName('script')[0];\\n    s1.async=true;\\n    s1.src='https://embed.tawk.to/61bf7a2980b2296cfdd270cb/1fn9vacl0';\\n    s1.charset='UTF-8';\\n    s1.setAttribute('crossorigin','*');\\n    s0.parentNode.insertBefore(s1,s0);\\n  })();\\n}\\nfunction pan21SupOpenTawk(){\\n  document.body.classList.add('pan21-sup-tawk-visible');\\n  if(window.Tawk_API && Tawk_API.maximize) Tawk_API.maximize();\\n}\\n// Sprach-Umschaltung: exakt dieselbe Erkennung wie im firmenkauf.org-Widget\\n// (public/widget.js detectLang) - html[lang] beginnt mit \\&quot;en\\&quot;, ODER body hat\\n// Klasse \\&quot;en\\&quot;, sonst Deutsch. MutationObserver deckt Next.js-Client-Routing\\n// ab, bei dem sich html[lang] erst nach initialem Render/Sprachwechsel setzt.\\nfunction pan21SupDetectLang(){\\n  var htmlLang = (document.documentElement.lang || '').toLowerCase();\\n  if (htmlLang.indexOf('en') === 0) return 'en';\\n  if (document.body.classList.contains('en')) return 'en';\\n  return 'de';\\n}\\nfunction pan21SupApplyLang(){\\n  var lang = pan21SupDetectLang();\\n  var nodes = document.querySelectorAll('#pan21-sup-wrap .pan21-sup-i18n');\\n  for (var i = 0; i < nodes.length; i++) {\\n    var el = nodes[i];\\n    var txt = el.getAttribute('data-p21sup' + lang);\\n    if (txt !== null) el.innerHTML = txt;\\n  }\\n}\\ndocument.addEventListener('DOMContentLoaded', pan21SupApplyLang);\\nif (document.readyState !== 'loading') pan21SupApplyLang();\\nnew MutationObserver(pan21SupApplyLang).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });\\n&quot;;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- SUPPORT:END --> */}
{/* <!-- HERO_VIDEO:START --> */}
<div dangerouslySetInnerHTML={{__html: "<style>\n.pan21-hero-video-wrap video{width:100%;height:100%;object-fit:cover;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;}\n.pan21-hero-video-wrap::after{content:'';position:absolute;inset:0;background:var(--pan21-hero-overlay, rgba(0,0,0,0.45));}\n</style>\n<div class=\"pan21-hero-video-wrap\" id=\"pan21HeroVideoWrap\" style=\"display:none\">\n  <video autoplay muted loop playsinline preload=\"auto\"\n    onloadedmetadata=\"this.muted=true;this.play().catch(function(){})\"\n    onloadeddata=\"this.muted=true;this.play().catch(function(){})\"\n    oncanplay=\"this.muted=true;this.play().catch(function(){})\"\n    oncanplaythrough=\"this.muted=true;this.play().catch(function(){})\">\n    <source src=\"https://video.pan21.com/videos/5438-183788547_1783914098_0.mp4\" type=\"video/mp4\">\n  </video>\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){var w=document.getElementById('pan21HeroVideoWrap');if(!w||w.getAttribute('data-placed'))return;w.setAttribute('data-placed','1');var h=document.querySelector('.hero')||document.querySelector('#hero')||document.querySelector('header')||(document.querySelector('main')?document.querySelector('main').firstElementChild:null);if(h){var cs=getComputedStyle(h);if(cs.position==='static'){h.style.position='relative'}var textEl=h.querySelector('h1')||h.querySelector('h2')||h;var tc=getComputedStyle(textEl).color;var mm=tc.match(/\\d+(\\.\\d+)?/g);var overlay='rgba(0,0,0,0.45)';if(mm&&mm.length>=3){var lum=(0.299*mm[0]+0.587*mm[1]+0.114*mm[2])/255;overlay=lum<0.5?'rgba(255,255,255,0.82)':'rgba(0,0,0,0.5)'}w.style.setProperty('--pan21-hero-overlay',overlay);h.style.background='none';h.style.backgroundImage='none';h.style.backgroundColor='transparent';h.insertBefore(w,h.firstChild);w.style.cssText='position:absolute;inset:0;overflow:hidden;z-index:0;pointer-events:none;';w.style.setProperty('--pan21-hero-overlay',overlay);for(var i=0;i<h.children.length;i++){var c=h.children[i];if(c===w)continue;var ccs=getComputedStyle(c);if(ccs.position==='static'){c.style.position='relative'}if(ccs.zIndex==='auto'){c.style.zIndex='1'}}}else{w.style.cssText='position:fixed;inset:0;width:100%;height:100%;z-index:-1;overflow:hidden;pointer-events:none;';document.body.insertBefore(w,document.body.firstChild)}w.style.display='block'})();\">"}} />
{/* <!-- HERO_VIDEO:END --> */}
{/*  */}
      {/* Nav */}
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/europan-logo-header.png" alt="EUROPAN" style={{ height: "30px", width: "auto", filter: "invert(1)" }} />
          </Link>
          <ul className="nav-links">
            <li><Link href="#about"><span className="de-content">Über uns</span><span className="en-content">About</span></Link></li>
            <li><Link href="#shop"><span className="de-content">Shop-Bonus</span><span className="en-content">Shop Bonus</span></Link></li>
            <li><a href="https://europan.direct" target="_blank" rel="noopener"><span className="de-content">Für Händler</span><span className="en-content">For Merchants</span></a></li>
            <li><Link href="#how"><span className="de-content">So funktioniert's</span><span className="en-content">How It Works</span></Link></li>
            <li><Link href="#contact"><span className="de-content">Kontakt</span><span className="en-content">Contact</span></Link></li>
            <li><Link href="/de/internet-stadt">Internet-Stadt</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
          <div className="nav-actions">
            <Link href="/buy" className="btn-green"><span className="de-content">EUROPAN kaufen</span><span className="en-content">Buy EUROPAN</span></Link>
            <div className="lang-switch">
              <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
              <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-stars">★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★</div>
        <div className="container hero-inner">
          <div>
            <div className="hero-kicker">🇪🇺 <span className="de-content">Nobles privates Währungsnetzwerk</span><span className="en-content">Noble Private Currency Network</span></div>
            <h1 className="hero-h1">
              <span className="de-content">EUROPAN —<br /><em>Die europäische</em><br />Privatwährung</span>
              <span className="en-content">EUROPAN —<br /><em>The European</em><br />Private Currency</span>
            </h1>
            <p className="hero-sub">
              <span className="de-content">EUROPAN (EP) ist die private europäische Digitalwährung des Noble-Netzwerks. Stabil, nur für Mitglieder, und einzigartig verbunden mit dem PAN21-Shop-Bonussystem. Kauf per Kreditkarte oder Überweisung.</span>
              <span className="en-content">EUROPAN (EP) is the private European digital currency of the Noble network. Stable, members-only, and uniquely linked to the PAN21 Shop bonus system. Buy with credit card or bank transfer.</span>
            </p>
            <div className="hero-actions">
              <Link href="/buy" className="btn-green-lg"><span className="de-content">EUROPAN kaufen →</span><span className="en-content">Buy EUROPAN →</span></Link>
              <Link href="#how" className="btn-ghost"><span className="de-content">So funktioniert's</span><span className="en-content">How It Works</span></Link>
            </div>
          </div>
          <div className="coin-display">
            <div className="ep-coin-wrap">
              <div className="ep-ring" />
              <div className="ep-coin">
                <img src="/europan-logo.png" alt="EUROPAN" style={{ width: '110px', height: 'auto', marginBottom: '6px' }} />
                <span className="ep-name">EUROPAN</span>
              </div>
            </div>
            <div className="ep-info-card">
              <div className="ep-info-row">
                <span className="ep-info-label"><span className="de-content">Aktueller Kurs</span><span className="en-content">Current Rate</span></span>
                <span className="ep-info-val">€{rate.toFixed(2)} / EP</span>
              </div>
              <div className="ep-info-row">
                <span className="ep-info-label"><span className="de-content">Netzwerk</span><span className="en-content">Network</span></span>
                <span className="ep-info-val">Noble Limited</span>
              </div>
              <div className="ep-info-row">
                <span className="ep-info-label"><span className="de-content">Shop-Bonus</span><span className="en-content">Shop Bonus</span></span>
                <span className="ep-info-val">Doppel-Wums ✓</span>
              </div>
              <div className="ep-info-row">
                <span className="ep-info-label"><span className="de-content">Art</span><span className="en-content">Type</span></span>
                <span className="ep-info-val"><span className="de-content">Privat · EU</span><span className="en-content">Private · EU</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* <!-- CUSTOM_HTML:shop:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div class=\"p21wr-wrap\" id=\"p21wr\"><style>\n    #p21wr { font-family: 'Jost', Arial, sans-serif; max-width: 100%; margin: 2rem auto; padding: 1.5rem 0; }\n    #p21wr .p21wr-head { display:flex; align-items:center; justify-content:space-between; max-width:1140px; margin:0 auto 1rem; padding:0 1.25rem; }\n    #p21wr .p21wr-title { font-size:0.72rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#B8832A; }\n    #p21wr .p21wr-more { font-size:0.78rem; font-weight:600; color:#0B1F3A; text-decoration:none; border-bottom:1px solid #C9963A; }\n    #p21wr .p21wr-grid { display:flex; gap:18px; max-width:1140px; margin:0 auto; padding:0 1.25rem; flex-wrap:wrap; justify-content:center; }\n    #p21wr .p21wr-tile { position:relative; flex:1 1 220px; max-width:260px; aspect-ratio:1/1; border-radius:12px; overflow:hidden; display:block; text-decoration:none; background:#F7F8FA; border:1px solid #DDE2E8; box-shadow:0 2px 10px rgba(11,31,58,0.06); transition: box-shadow .25s, transform .25s; }\n    #p21wr .p21wr-tile:hover { box-shadow:0 12px 32px rgba(11,31,58,0.18); transform:translateY(-3px); }\n    #p21wr .p21wr-tile img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; display:block; opacity:0; transition:opacity .5s ease; }\n    #p21wr .p21wr-tile img.p21wr-shown { opacity:1; }\n    #p21wr .p21wr-label { position:absolute; left:0; right:0; bottom:0; padding:10px 12px 9px; font-size:0.78rem; font-weight:600; color:#fff; background:linear-gradient(0deg, rgba(11,31,58,0.85) 0%, rgba(11,31,58,0.55) 55%, rgba(11,31,58,0) 100%); line-height:1.3; z-index:1; }\n    @media (max-width:900px) { #p21wr .p21wr-tile { flex-basis:44%; } }\n    @media (max-width:520px) { #p21wr .p21wr-tile { flex-basis:100%; max-width:340px; } }\n</style><div class=\"p21wr-head\"><span class=\"p21wr-title\">🎲 Entdecken Sie unser Angebot</span><a class=\"p21wr-more\" href=\"https://shop.pan21.com\" target=\"_blank\" rel=\"noopener\">Zum Shop →</a></div><div class=\"p21wr-grid\"><a class=\"p21wr-tile\" href=\"#\" target=\"_blank\" rel=\"noopener\" data-p21tile=\"0\"><img src=\"\" alt=\"\"><div class=\"p21wr-label\"></div></a><a class=\"p21wr-tile\" href=\"#\" target=\"_blank\" rel=\"noopener\" data-p21tile=\"1\"><img src=\"\" alt=\"\"><div class=\"p21wr-label\"></div></a><a class=\"p21wr-tile\" href=\"#\" target=\"_blank\" rel=\"noopener\" data-p21tile=\"2\"><img src=\"\" alt=\"\"><div class=\"p21wr-label\"></div></a><a class=\"p21wr-tile\" href=\"#\" target=\"_blank\" rel=\"noopener\" data-p21tile=\"3\"><img src=\"\" alt=\"\"><div class=\"p21wr-label\"></div></a></div></div><img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){var s=document.createElement('script');s.textContent=&quot;(function() {\\n  var DATA = [{\\&quot;name\\&quot;: \\&quot;Deutsche UG-Gründung\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/deutsche-ug-gruendung\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/deutschland-ug.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Deutsche GmbH-Gründung\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/deutsche-gmbh-gruendung\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/deutschland-gmbh.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Englische Limited gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/englische-limited-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/uk.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Amerikanische LLC gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/amerikanische-llc-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/usa.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Hong Kong Limited gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/hong-kong-limited-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/hongkong.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Irische Limited gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/irische-limited-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/irland.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Neuseeländische Limited gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/neuseelaendische-limited-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/neuseeland.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Belize LLC gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/belize-llc-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/belize.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Nevis LLC gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/nevis-llc-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/nevis.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Australische Pty Ltd gründen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/australische-pty-ltd-gruenden\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/australien.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;UK Limited Nominee-/Treuhand\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/uk-limited-nominee-treuhandadministration\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/products/UKnominee-300x300.png\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Internationale Nominee-/Treuhand\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/internationale-nominee-treuhandadministration\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/products/int_nominee-300x300.png\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Deutsche Treuhand-/Mandatsadmin.\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/deutsche-treuhand-mandatsadministration\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/products/DEnominee-300x300.png\\&quot;}, {\\&quot;name\\&quot;: \\&quot;UK Limited Jahresadministration\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/uk-limited-jahresadministration\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/products/UKadministration-300x300.png\\&quot;}, {\\&quot;name\\&quot;: \\&quot;Geschäftsadresse buchen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/geschaeftsadresse-pan-office\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/pan-office.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;EUROPAN-Guthaben aufladen\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/europan-guthaben-aufladen\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/europan-guthaben.jpg\\&quot;}, {\\&quot;name\\&quot;: \\&quot;WordPress-Webhosting\\&quot;, \\&quot;url\\&quot;: \\&quot;https://shop.pan21.com/produkt/webhosting-1euro-hosting\\&quot;, \\&quot;img\\&quot;: \\&quot;https://shop.pan21.com/hero/1euro-hosting.jpg\\&quot;}];\\n\\n  function init(root) {\\n    if (root.getAttribute(\\'data-p21wr-done\\')) return;\\n    root.setAttribute(\\'data-p21wr-done\\', \\'1\\');\\n    var tiles = Array.prototype.slice.call(root.querySelectorAll(\\'[data-p21tile]\\'));\\n\\n    function pick(excludeUrls) {\\n      var options = DATA.filter(function(d) { return excludeUrls.indexOf(d.url) === -1; });\\n      if (options.length === 0) options = DATA;\\n      return options[Math.floor(Math.random() * options.length)];\\n    }\\n\\n    var current = tiles.map(function() { return null; });\\n\\n    function usedUrls(excludeIndex) {\\n      return current.filter(function(c, idx) { return idx !== excludeIndex && c; }).map(function(c) { return c.url; });\\n    }\\n\\n    function setTile(i, item) {\\n      var tile = tiles[i];\\n      var img = tile.querySelector(\\'img\\');\\n      var label = tile.querySelector(\\'.p21wr-label\\');\\n      img.classList.remove(\\'p21wr-shown\\');\\n      var pre = new Image();\\n      pre.onload = function() {\\n        img.src = item.img;\\n        img.alt = item.name;\\n        label.textContent = item.name;\\n        tile.href = item.url;\\n        img.classList.add(\\'p21wr-shown\\');\\n      };\\n      pre.onerror = function() {\\n        img.classList.add(\\'p21wr-shown\\');\\n      };\\n      pre.src = item.img;\\n      current[i] = item;\\n    }\\n\\n    tiles.forEach(function(tile, i) {\\n      var item = pick(usedUrls(i));\\n      setTile(i, item);\\n    });\\n\\n    var ROTATE_MS = 5000;\\n    var STEP_MS = 350;\\n    function rotateAll() {\\n      tiles.forEach(function(tile, i) {\\n        setTimeout(function() {\\n          var exclude = usedUrls(i);\\n          if (current[i]) exclude = exclude.concat([current[i].url]);\\n          setTile(i, pick(exclude));\\n        }, i * STEP_MS);\\n      });\\n    }\\n    setInterval(rotateAll, ROTATE_MS + tiles.length * STEP_MS);\\n  }\\n\\n  var tries = 0;\\n  function tryInit() {\\n    var root = document.getElementById(\\'p21wr\\');\\n    if (root) { init(root); return; }\\n    tries++;\\n    if (tries < 40) setTimeout(tryInit, 100);\\n  }\\n  tryInit();\\n})();&quot;;document.head.appendChild(s);})();\">"}} />
{/* <!-- CUSTOM_HTML:shop:END --> */}

      {/* Stats */}
      <div className="stats-bar">
        <div className="container stats-inner">
          {[
            { val: `€${rate.toFixed(2)}`, label_de: 'Pro EUROPAN', label_en: 'Per EUROPAN' },
            { val: '€1.000', label_de: 'Kartenlimit', label_en: 'Card limit' },
            { val: '5%', label_de: 'Doppel-Wums-Bonus', label_en: 'Doppel-Wums Bonus' },
            { val: '24/7', label_de: 'Kontozugriff', label_en: 'Account access' },
          ].map(s => (
            <div key={s.label_en} className="stat">
              <span className="stat-val">{s.val}</span>
              <span className="stat-label"><span className="de-content">{s.label_de}</span><span className="en-content">{s.label_en}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="section about-sec" id="about">
        <div className="container about-inner">
          <div className="about-text">
            <span className="eyebrow"><span className="de-content">Was ist EUROPAN?</span><span className="en-content">What is EUROPAN?</span></span>
            <h2 className="sec-title">
              <span className="de-content">Europäische Privatwährung<br /><em>Für ein privates Netzwerk</em></span>
              <span className="en-content">European Private Currency<br /><em>For a Private Network</em></span>
            </h2>
            <div className="green-rule" />
            <p>
              <span className="de-content">EUROPAN (EP) ist die private europäische Nutzwährung des Investmentnetzwerks von Noble Limited. Nicht an einer öffentlichen Börse gehandelt, nicht spekulativ — eine stabile private Digitalwährung für verifizierte Noble-Mitglieder.</span>
              <span className="en-content">EUROPAN (EP) is the private European utility currency of Noble Limited's investment network. Not traded on any public exchange, not speculative — a stable private digital currency for verified Noble members.</span>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <span className="de-content">Was EUROPAN unter den vier Noble-Währungen einzigartig macht, ist die direkte Verbindung zum PAN21-Shop: Jeder Kauf auf shop.pan21.com bringt Ihnen EUROPAN — und die Zahlung mit EUROPAN aktiviert den Doppel-Wums-Bonus von 5% zurück.</span>
              <span className="en-content">What makes EUROPAN unique among the four Noble currencies is its direct connection to the PAN21 Shop: every purchase on shop.pan21.com earns you EUROPAN — and paying with EUROPAN activates the Doppel-Wums bonus of 5% back.</span>
            </p>
            <p style={{ marginTop: '1rem' }}>
              <span className="de-content">Noble-Mitglieder halten EUROPAN neben N-Coin, SwissyCash und CryptoCoin in ihrem privaten Noble-Dashboard.</span>
              <span className="en-content">Noble members hold EUROPAN alongside N-Coin, SwissyCash and CryptoCoin in their private Noble dashboard.</span>
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/buy" className="btn-green"><span className="de-content">EUROPAN kaufen →</span><span className="en-content">Buy EUROPAN →</span></Link>
              <a href="https://noble-limited.com/membership" target="_blank" rel="noopener" className="btn-outline-green"><span className="de-content">Noble-Mitgliedschaft</span><span className="en-content">Noble Membership</span></a>
            </div>
          </div>
          <div className="about-props">
            {props.map(p => (
              <div key={p.title_en} className="prop-card">
                <span className="prop-icon">{p.icon}</span>
                <h3 className="prop-title"><span className="de-content">{p.title_de}</span><span className="en-content">{p.title_en}</span></h3>
                <p className="prop-desc"><span className="de-content">{p.desc_de}</span><span className="en-content">{p.desc_en}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Bonus */}
      <section className="shop-bonus-sec" id="shop">
        <div className="container">
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}><span className="de-content">PAN21-Shop-Integration</span><span className="en-content">PAN21 Shop Integration</span></span>
          <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            <span className="de-content">EUROPAN ist die Bonus-Währung<br />des PAN21 Shops</span>
            <span className="en-content">EUROPAN is the bonus currency<br />of the PAN21 Shop</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.8 }}>
            <span className="de-content">Firmengründungen, Gesellschaftsverwaltung und internationale Strukturen — alle Produkte auf shop.pan21.com belohnen Sie mit EUROPAN.</span>
            <span className="en-content">Company formation, corporate administration and international structures — every product on shop.pan21.com rewards you with EUROPAN.</span>
          </p>
          <div className="bonus-cards">
            {bonusCards.map(c => (
              <div key={c.title_en} className="bonus-card">
                <div className="bonus-icon">{c.icon}</div>
                <h3 className="bonus-title"><span className="de-content">{c.title_de}</span><span className="en-content">{c.title_en}</span></h3>
                <p className="bonus-text"><span className="de-content">{c.desc_de}</span><span className="en-content">{c.desc_en}</span></p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://shop.pan21.com" target="_blank" rel="noopener" style={{ background: '#fff', color: 'var(--green)', padding: '0.9rem 2rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', display: 'inline-block' }}>
              <span className="de-content">PAN21 Shop besuchen →</span><span className="en-content">Visit PAN21 Shop →</span>
            </a>
            <Link href="/buy" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.9rem 2rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem', display: 'inline-block' }}>
              <span className="de-content">EUROPAN kaufen →</span><span className="en-content">Buy EUROPAN →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how-sec" id="how">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow"><span className="de-content">So kaufen Sie</span><span className="en-content">How to Buy</span></span>
            <h2 className="sec-title"><span className="de-content">Einfach. <em>Europäisch. Privat.</em></span><span className="en-content">Simple. <em>European. Private.</em></span></h2>
          </div>
          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 1 320px', minWidth: '220px' }}>
              <img src="/images/how-it-works.jpg" alt="Bargeld in Jeans-Tasche" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} />
            </div>
            <div className="how-steps" style={{ flex: '1 1 420px', minWidth: '280px' }}>
              {howSteps.map((s, i) => (
                <div key={i} className="how-step">
                  <div className="how-num">{String(i+1).padStart(2,'0')}</div>
                  <div>
                    <h3 className="how-title"><span className="de-content">{s.title_de}</span><span className="en-content">{s.title_en}</span></h3>
                    <p className="how-desc"><span className="de-content">{s.desc_de}</span><span className="en-content">{s.desc_en}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/buy" className="btn-green-lg"><span className="de-content">Jetzt EUROPAN kaufen →</span><span className="en-content">Buy EUROPAN Now →</span></Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section trust-sec">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="eyebrow"><span className="de-content">Vertrauen & Sicherheit</span><span className="en-content">Trust & Security</span></span>
            <h2 className="sec-title"><span className="de-content">Stabil. <em>Privat. Dokumentiert.</em></span><span className="en-content">Stable. <em>Private. Documented.</em></span></h2>
            <p className="sec-sub"><span className="de-content">EUROPAN basiert auf derselben Infrastruktur wie N-Coin, SwissyCash und CryptoCoin — mit der zusätzlichen Dimension der PAN21-Shop-Integration.</span><span className="en-content">EUROPAN is built on the same infrastructure as N-Coin, SwissyCash and CryptoCoin — with the added dimension of the PAN21 Shop integration.</span></p>
          </div>
          <div className="trust-grid">
            {trustCards.map(c => (
              <div key={c.title_en} className="trust-card">
                <h3 className="trust-title"><span className="de-content">{c.title_de}</span><span className="en-content">{c.title_en}</span></h3>
                <p className="trust-text"><span className="de-content">{c.text_de}</span><span className="en-content">{c.text_en}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Noble banner */}
      <section className="noble-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'rgba(76,175,125,0.6)' }}><span className="de-content">Noble-Währungsnetzwerk</span><span className="en-content">Noble Currency Network</span></span>
          <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 400, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            <span className="de-content">EUROPAN ist eine von vier privaten Währungen<br />von Noble Limited</span>
            <span className="en-content">EUROPAN is one of four private currencies<br />issued by Noble Limited</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            <span className="de-content">Noble-Mitglieder verwalten EUROPAN, N-Coin, SwissyCash und CryptoCoin in einem einzigen Dashboard.</span>
            <span className="en-content">Noble members hold EUROPAN, N-Coin, SwissyCash and CryptoCoin in a single dashboard.</span>
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://www.noble-limited.com/join?src=europan" target="_blank" rel="noopener" className="btn-green"><span className="de-content">Noble-Mitgliedschaft beantragen →</span><span className="en-content">Apply for Noble Membership →</span></a>
            <a href="https://n-coins.net" target="_blank" rel="noopener" className="btn-outline-green" style={{ borderColor: 'rgba(76,175,125,0.4)', color: 'rgba(76,175,125,0.8)' }}>N-Coin ↗</a>
            <a href="https://swissycash.com" target="_blank" rel="noopener" className="btn-outline-green" style={{ borderColor: 'rgba(76,175,125,0.4)', color: 'rgba(76,175,125,0.8)' }}>SwissyCash ↗</a>
            <a href="https://crypto-coins.org" target="_blank" rel="noopener" className="btn-outline-green" style={{ borderColor: 'rgba(76,175,125,0.4)', color: 'rgba(76,175,125,0.8)' }}>CryptoCoin ↗</a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact-sec" id="contact">
        <div className="container contact-inner">
          <div>
            <span className="eyebrow"><span className="de-content">Kontakt</span><span className="en-content">Contact</span></span>
            <h2 className="sec-title"><span className="de-content">Nehmen Sie <em>Kontakt auf</em></span><span className="en-content">Get in <em>Touch</em></span></h2>
            <div className="green-rule" />
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              <span className="de-content">Fragen zu EUROPAN, Ihrem Noble-Konto oder dem PAN21-Shop-Bonussystem? Wir antworten innerhalb eines Werktags.</span>
              <span className="en-content">Questions about EUROPAN, your Noble account, or the PAN21 Shop bonus system? We respond within one business day.</span>
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label_de: 'E-Mail', label_en: 'Email', val: 'info@europan.group', href: 'mailto:info@europan.group' },
                { label_de: 'Shop', label_en: 'Shop', val: 'shop.pan21.com', href: 'https://shop.pan21.com' },
                { label_de: 'Netzwerk', label_en: 'Network', val: 'noble-limited.com', href: 'https://noble-limited.com' },
              ].map(c => (
                <div key={c.label_en} style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--gray)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--charcoal)', minWidth: '70px' }}><span className="de-content">{c.label_de}</span><span className="en-content">{c.label_en}</span></span>
                  <a href={c.href} style={{ color: 'var(--green)' }}>{c.val}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="c-form">
            {contactStatus === 'ok' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
                <div style={{ fontFamily: 'var(--ff-d)', fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '0.5rem' }}><span className="de-content">Nachricht gesendet</span><span className="en-content">Message Sent</span></div>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}><span className="de-content">Wir antworten innerhalb eines Werktags.</span><span className="en-content">We will respond within one business day.</span></p>
              </div>
            ) : (
              <>
              <form onSubmit={handleContact} noValidate>
                <div className="hp-field"><input type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
                <div className="form-row">
                  <div className="fg"><label><span className="de-content">Name *</span><span className="en-content">Name *</span></label><input type="text" name="name" placeholder="Ihr Name" required /></div>
                  <div className="fg"><label>E-Mail *</label><input type="email" name="email" placeholder="ihre@email.de" required /></div>
                </div>
                <div className="fg">
                  <label><span className="de-content">Betreff</span><span className="en-content">Subject</span></label>
                  <select name="subject">
                    <option value=""><span className="de-content">Bitte wählen</span></option>
                    <option value="Buy EUROPAN">EUROPAN kaufen</option>
                    <option value="Account / Balance">Konto / Guthaben</option>
                    <option value="Shop Bonus">PAN21 Shop-Bonus</option>
                    <option value="Noble Membership">Noble-Mitgliedschaft</option>
                    <option value="Other">Sonstiges</option>
                  </select>
                </div>
                <div className="fg"><label><span className="de-content">Nachricht *</span><span className="en-content">Message *</span></label><textarea name="message" placeholder="Wie können wir helfen?" required /></div>
                <button type="submit" className="form-submit" disabled={contactStatus === 'sending'}>
                  {contactStatus === 'sending' ? <><span className="de-content">Wird gesendet…</span><span className="en-content">Sending…</span></> : <><span className="de-content">Nachricht senden →</span><span className="en-content">Send Message →</span></>}
                </button>
                {contactStatus === 'err' && <p className="form-err">{contactErr}</p>}
              </form>
              {/* <!-- CUSTOM_HTML:statcounter:START --> */}
<div dangerouslySetInnerHTML={{__html: "<!-- Default Statcounter code for EUROPAN Group Payment\nSystems https://europan.group -->\n\n\n<noscript><div class=\"statcounter\"><a title=\"Web Analytics\"\nhref=\"https://statcounter.com/\" target=\"_blank\"><img\nclass=\"statcounter\"\nsrc=\"https://c.statcounter.com/13337867/0/2e7edecc/1/\"\nalt=\"Web Analytics\"\nreferrerPolicy=\"no-referrer-when-downgrade\"></a></div></noscript>\n<!-- End of Statcounter Code -->\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21sityjrny'))return;var m=document.createElement('meta');m.id='pan21sityjrny';document.head.appendChild(m);(function(){var s=document.createElement('script');s.textContent=&quot;\\nvar sc_project=13337867; \\nvar sc_invisible=1; \\nvar sc_security=\\&quot;2e7edecc\\&quot;; \\n&quot;;document.head.appendChild(s);})();(function(){var s=document.createElement('script');s.src=&quot;https://www.statcounter.com/counter/counter.js&quot;;s.async=true;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- CUSTOM_HTML:statcounter:END --> */}
{/*  */}
{/* <!-- REVIVE_SIDE:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div id=\"pan21-side-banner\" style=\"position:fixed;top:120px;bottom:260px;right:0;z-index:9998;background:#fff;box-shadow:-2px 2px 8px rgba(0,0,0,0.15);padding:4px;overflow:hidden;\">\n<div style=\"font-size:10px;color:#999;text-align:center;margin-bottom:2px;\">Werbung</div>\n<ins data-revive-zoneid=\"9\" data-revive-id=\"0b01ba1194fdc0e89c6321458dbc5814\"></ins>\n\n\n</div>\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21si2gdnci'))return;var m=document.createElement('meta');m.id='pan21si2gdnci';document.head.appendChild(m);(function(){var s=document.createElement('script');s.src=&quot;//ads.pan21.com/www/delivery/asyncjs.php&quot;;s.async=true;document.head.appendChild(s);})();(function(){var s=document.createElement('script');s.textContent=&quot;setTimeout(function(){var b=document.getElementById('pan21-side-banner');if(b)b.style.display='none';}, 20000);&quot;;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- REVIVE_SIDE:END --> */}
</>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <!-- CUSTOM_HTML:shopbanner:START --> */}
<div dangerouslySetInnerHTML={{__html: "<!-- PAN21 Shop Widget - Alle Kategorien: START -->\n<div class=\"p21wa-wrap\" id=\"p21wa\">\n  <style>\n    #p21wa { font-family: 'Jost', Arial, sans-serif; max-width: 100%; margin: 2rem auto; padding: 1.5rem 0; }\n    #p21wa .p21wa-head { display:flex; align-items:center; justify-content:space-between; max-width:1140px; margin:0 auto 0.9rem; padding:0 1.25rem; }\n    #p21wa .p21wa-title { font-size:0.72rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#B8832A; }\n    #p21wa .p21wa-more { font-size:0.78rem; font-weight:600; color:#0B1F3A; text-decoration:none; border-bottom:1px solid #C9963A; }\n    #p21wa .p21wa-track-outer { overflow:hidden; position:relative; -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%); mask-image: linear-gradient(90deg, transparent 0, #000 40px, #000 calc(100% - 40px), transparent 100%); }\n    #p21wa .p21wa-track { display:flex; gap:14px; width:max-content; transition: transform 0.7s cubic-bezier(.4,0,.2,1); padding: 2px 1.25rem 22px; }\n    #p21wa .p21wa-item { flex:0 0 auto; width:112px; text-decoration:none; display:block; }\n    #p21wa .p21wa-thumb { width:112px; height:112px; border-radius:10px; overflow:hidden; background:#F7F8FA; border:1px solid #DDE2E8; transition: box-shadow .2s, transform .2s, border-color .2s; }\n    #p21wa .p21wa-item:hover .p21wa-thumb { box-shadow:0 8px 22px rgba(11,31,58,0.18); transform:translateY(-2px); border-color:#C9963A; }\n    #p21wa .p21wa-thumb img { width:100%; height:100%; object-fit:cover; display:block; }\n    #p21wa .p21wa-label { margin-top:6px; font-size:0.68rem; line-height:1.25; color:#5C6B7A; text-align:center; }\n    @media (max-width:640px) {\n      #p21wa .p21wa-item { width:88px; }\n      #p21wa .p21wa-thumb { width:88px; height:88px; }\n    }\n  </style>\n  <div class=\"p21wa-head\">\n    <span class=\"p21wa-title\">⭐ Alle Leistungen im Überblick</span>\n    <a class=\"p21wa-more\" href=\"https://shop.pan21.com\" target=\"_blank\" rel=\"noopener\">Zum Shop →</a>\n  </div>\n  <div class=\"p21wa-track-outer\">\n    <div class=\"p21wa-track\" data-p21track=\"all\">\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/deutschland-300x300.png\" alt=\"Deutschland\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇩🇪 Deutschland</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/uk-300x300.png\" alt=\"UK / Großbritannien\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇬🇧 UK / Großbritannien</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/usa-300x300.png\" alt=\"USA\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇺🇸 USA</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/hngkong-300x300.png\" alt=\"Hong Kong\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇭🇰 Hong Kong</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/irland-300x300.png\" alt=\"Irland\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇮🇪 Irland</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/nz-300x300.png\" alt=\"Neuseeland\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇳🇿 Neuseeland</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/belize-300x300.png\" alt=\"Belize\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🏝️ Belize</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/nevis-300x300.png\" alt=\"Nevis\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🏝️ Nevis</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/australien-300x300.png\" alt=\"Australien\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🇦🇺 Australien</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/#produkte\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/products/int_nominee-300x300.png\" alt=\"International\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🌐 International</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/produkt/geschaeftsadresse-pan-office\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/hero/pan-office.jpg\" alt=\"Geschäftsadresse\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">📍 Geschäftsadresse</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/produkt/europan-guthaben-aufladen\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/hero/europan-guthaben.jpg\" alt=\"EUROPAN-Guthaben\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🎁 EUROPAN-Guthaben</div>\n    </a>\n<a class=\"p21wa-item\" href=\"https://shop.pan21.com/produkt/webhosting-1euro-hosting\" target=\"_blank\" rel=\"noopener\">\n      <div class=\"p21wa-thumb\"><img src=\"https://shop.pan21.com/hero/1euro-hosting.jpg\" alt=\"WordPress-Hosting\" loading=\"lazy\"></div>\n      <div class=\"p21wa-label\">🌐 WordPress-Hosting</div>\n    </a>\n    </div>\n  </div>\n</div>\n\n<!-- PAN21 Shop Widget - Alle Kategorien: END -->\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21sicvwdxb'))return;var m=document.createElement('meta');m.id='pan21sicvwdxb';document.head.appendChild(m);(function(){var s=document.createElement('script');s.textContent=&quot;\\n(function() {\\n  var track = document.querySelector('#p21wa [data-p21track=\\&quot;all\\&quot;]');\\n  if (!track) return;\\n  if (track.getAttribute('data-p21wa-init')) return;\\n  track.setAttribute('data-p21wa-init', '1');\\n  var originals = Array.prototype.slice.call(track.children);\\n  if (originals.length === 0) return;\\n  originals.forEach(function(node) { track.appendChild(node.cloneNode(true)); });\\n  var idx = 0;\\n  var itemW = originals[0].getBoundingClientRect().width + 14;\\n  var maxIdx = originals.length;\\n  window.addEventListener('resize', function() { itemW = originals[0].getBoundingClientRect().width + 14; });\\n  setInterval(function() {\\n    idx++;\\n    track.style.transition = 'transform 0.7s cubic-bezier(.4,0,.2,1)';\\n    track.style.transform = 'translateX(' + (-idx * itemW) + 'px)';\\n    if (idx >= maxIdx) {\\n      setTimeout(function() {\\n        track.style.transition = 'none';\\n        idx = 0;\\n        track.style.transform = 'translateX(0px)';\\n      }, 720);\\n    }\\n  }, 3000);\\n})();\\n&quot;;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- CUSTOM_HTML:shopbanner:END --> */}
<footer className="footer">
        <div className="container footer-inner">
          <img src="/europan-logo.png" alt="EUROPAN" style={{ height: '28px', width: 'auto', opacity: 0.4 }} />
          <div className="footer-links">
            <Link href="/buy"><span className="de-content">EP kaufen</span><span className="en-content">Buy EP</span></Link>
            <Link href="#about"><span className="de-content">Über uns</span><span className="en-content">About</span></Link>
            <Link href="#shop"><span className="de-content">Shop-Bonus</span><span className="en-content">Shop Bonus</span></Link>
            <a href="https://europan.direct" target="_blank" rel="noopener"><span className="de-content">Für Händler</span><span className="en-content">For Merchants</span></a>
            <Link href="#how"><span className="de-content">So funktioniert's</span><span className="en-content">How It Works</span></Link>
            <Link href="#contact"><span className="de-content">Kontakt</span><span className="en-content">Contact</span></Link>
            <Link href="/faq">FAQ</Link>
            <a href="https://noble-limited.com" target="_blank" rel="noopener">Noble Limited</a>
            <a href="https://shop.pan21.com" target="_blank" rel="noopener">PAN21 Shop</a>
          </div>
          <p className="footer-legal">
            © {new Date().getFullYear()} EUROPAN · <span className="de-content">Herausgegeben von Noble Private Capital Ltd (handelnd als „Noble Limited") · Eingetragen in Neuseeland · EUROPAN (EP) ist eine private Netzwerkwährung, kein reguliertes Finanzinstrument und kein öffentlich gehandelter Vermögenswert.</span><span className="en-content">Issued by Noble Private Capital Ltd (trading as "Noble Limited") · Registered in New Zealand · EUROPAN (EP) is a private network currency, not a regulated financial instrument or publicly traded asset.</span>
          </p>
          {/* <!-- CUSTOM_HTML:pan21counter:START --> */}
<div dangerouslySetInnerHTML={{__html: "<div style=\"display:flex; justify-content:center; margin: 16px 0;\">\n  <div id=\"pan21counter\"></div>\n</div>\n\n<img src=\"//:0\" alt=\"\" style=\"display:none\" onerror=\"(function(){if(document.getElementById('pan21si8158yv'))return;var m=document.createElement('meta');m.id='pan21si8158yv';document.head.appendChild(m);(function(){var s=document.createElement('script');s.src=&quot;https://pan21counter.de/c.js?id=413BAB&quot;;s.async=true;document.head.appendChild(s);})();})();\">"}} />
{/* <!-- CUSTOM_HTML:pan21counter:END --> */}
        </div>
      </footer>
    </div>
  )
}

/**
 * MUHAMMAD SHER CHHEENA LAW OFFICE — MAIN JAVASCRIPT
 */

// Mobile Navigation Toggle
function toggleMobileNav() {
  const drawer = document.getElementById('mobileDrawer');
  const btn = document.getElementById('hamburgerBtn');
  if (drawer) {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      btn.innerHTML = '✕';
      btn.setAttribute('aria-expanded', 'true');
    } else {
      btn.innerHTML = '☰';
      btn.setAttribute('aria-expanded', 'false');
    }
  }
}

// Currency Switcher for Consultation Fees
const rates = {
  USD: { symbol: '$', initial: '200', standard: '300', retainer: '500', unit: 'USD / Hr' },
  GBP: { symbol: '£', initial: '160', standard: '240', retainer: '400', unit: 'GBP / Hr' },
  AED: { symbol: 'AED ', initial: '735', standard: '1,100', retainer: '1,850', unit: 'AED / Hr' },
  EUR: { symbol: '€', initial: '185', standard: '280', retainer: '460', unit: 'EUR / Hr' },
  CAD: { symbol: 'C$', initial: '270', standard: '410', retainer: '680', unit: 'CAD / Hr' },
  PKR: { symbol: 'Rs ', initial: '55,000', standard: '85,000', retainer: '140,000', unit: 'PKR / Hr' }
};

function setCurrency(curr) {
  const data = rates[curr];
  if (!data) return;

  // Update Buttons
  document.querySelectorAll('.curr-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === curr);
  });

  // Update Hero Plaque
  const plaqueAmt = document.getElementById('plaqueFeeVal');
  if (plaqueAmt) {
    plaqueAmt.textContent = data.symbol + data.initial;
  }
  const plaqueUnit = document.getElementById('plaqueFeeUnit');
  if (plaqueUnit) {
    plaqueUnit.textContent = 'Per Hour (' + data.unit + ')';
  }

  // Update Pricing Cards
  const p1 = document.getElementById('priceVal1');
  const p2 = document.getElementById('priceVal2');
  const p3 = document.getElementById('priceVal3');

  if (p1) p1.textContent = data.symbol + data.initial;
  if (p2) p2.textContent = data.symbol + data.standard;
  if (p3) p3.textContent = data.symbol + data.retainer;
}

// Interactive Consultation Form & WhatsApp Generator
function submitConsultationForm(e) {
  e.preventDefault();
  
  const name = document.getElementById('cName').value.trim();
  const phone = document.getElementById('cPhone').value.trim();
  const country = document.getElementById('cCountry').value.trim();
  const matter = document.getElementById('cMatter').value;
  const tier = document.getElementById('cTier').value;
  const notes = document.getElementById('cNotes').value.trim();
  
  if (!name || !phone) {
    alert('Please enter your Name and WhatsApp / Phone Number.');
    return false;
  }

  // Build formatted WhatsApp message
  const text = 
    `*Legal Consultation Request — Muhammad Sher Chheena Law Office*\n\n` +
    `👤 *Client Name:* ${name}\n` +
    `📞 *Phone/WhatsApp:* ${phone}\n` +
    `🌍 *Client Location:* ${country || 'Overseas'}\n` +
    `⚖️ *Legal Matter:* ${matter}\n` +
    `💼 *Preferred Consultation:* ${tier}\n` +
    `📝 *Case Summary:* ${notes || 'Case details to be discussed in consultation.'}\n\n` +
    `_Sent via official online portal._`;

  // WhatsApp international link
  const waNumber = '923000000000';
  const encodedText = encodeURIComponent(text);
  const waUrl = `https://wa.me/${waNumber}?text=${encodedText}`;

  // Open WhatsApp in new tab
  window.open(waUrl, '_blank');

  // Show confirmation UI
  const formWrap = document.getElementById('bookingFormWrap');
  if (formWrap) {
    formWrap.innerHTML = `
      <div style="text-align:center;padding:30px 10px;">
        <div style="font-size:48px;margin-bottom:14px;">⚖️</div>
        <h3 style="font-family:var(--font-serif);color:#ffffff;font-size:24px;margin-bottom:10px;">Consultation Request Dispatched</h3>
        <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;margin-bottom:20px;">
          Thank you, <strong>${name}</strong>. Your legal inquiry has been routed directly to Advocate Muhammad Sher Chheena's executive desk. We will confirm your consultation slot shortly.
        </p>
        <a href="#" onclick="location.reload()" class="btn-gold" style="display:inline-flex;">← Book Another Matter</a>
      </div>
    `;
  }

  return false;
}

// Auto Close Mobile Drawer on link click
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#mobileDrawer a').forEach(a => {
    a.addEventListener('click', () => {
      const drawer = document.getElementById('mobileDrawer');
      const btn = document.getElementById('hamburgerBtn');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        if (btn) btn.innerHTML = '☰';
      }
    });
  });
});

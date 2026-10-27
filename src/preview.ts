import './preview.css';
import heroIllustration from '../img/last-mile-hero.png';

const sources = import.meta.glob('../svg/*.svg', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
function icon(name: string, className = '') {
  const source = sources[`../svg/${name}.svg`];
  if (!source) throw new Error(`Missing showcase icon: ${name}`);
  return source.replace('<svg', `<svg class="icon ${className}" aria-hidden="true" focusable="false"`);
}
const gallery = import.meta.env.BASE_URL;
const plans = [
  { id: 'pine', name: 'Pine & Simple', price: 19, icon: 'coffin', pitch: 'A solid exit. No unnecessary extras.', features: ['Honest pine construction', 'One reasonably comfortable lining', 'Delivery to the edge of town'] },
  { id: 'respectable', name: 'The Respectable', price: 39, icon: 'tombstone', pitch: 'For people with a reputation to stop maintaining.', features: ['Polished oak & brass handles', 'Your name, spelled correctly', 'Delivery to wherever it happened'] },
  { id: 'legend', name: 'Local Legend', price: 79, icon: 'sheriff-badge', pitch: 'Go out like the town will remember you.', features: ['Our finest velvet interior', 'A tasteful amount of ceremony', 'A story that improves with retelling'] },
];
const hazards = [
  { icon: 'snake', title: 'The wildlife.', text: 'Some of it has fangs. None of it has a customer service department.', category: 'Nature' },
  { icon: 'revolver', title: 'The neighbors.', text: 'Friendly waves. Firm handshakes. Catastrophic conflict resolution.', category: 'Community' },
  { icon: 'horse', title: 'The commute.', text: 'Your transportation has opinions. And four very convincing arguments.', category: 'Transport' },
  { icon: 'canyon', title: 'The scenery.', text: 'Breathtaking views. Occasionally, quite literally.', category: 'Outdoors' },
  { icon: 'whiskey-bottle', title: 'The refreshments.', text: 'Locally distilled. Medically unexplained.', category: 'Hospitality' },
  { icon: 'dynamite', title: 'The job market.', text: 'Excellent opportunities in mining. Limited opportunities in retirement.', category: 'Careers' },
];

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="demo-ribbon"><div class="container"><a href="${gallery}">${icon('saddle')} Frontier Icons <span>/</span> In the wild</a><span>A fictional business. A real icon collection.</span><a href="${gallery}">Back to the icons ↗</a></div></div>
  <header class="masthead container"><a class="wordmark" href="#" aria-label="Last Mile Coffin Co. home">${icon('coffin')}<span>LAST MILE<small>COFFIN COMPANY · EST. 1874</small></span></a><nav aria-label="Main navigation"><a href="#hazards">Why plan ahead?</a><a href="#plans">The coffins</a><a class="button button-outline" href="#reserve">Reserve your exit ${icon('arrow')}</a></nav></header>
  <main id="main">
    <section class="landing-hero container" aria-labelledby="headline">
      <div class="hero-text"><p class="kicker"><span class="status-dot"></span> SERVING THE LIVING. MOSTLY.</p><h1 id="headline">Tomorrow isn’t <br>guaranteed. <br><span>Your coffin is.</span></h1><p class="hero-description">The West has a thousand ways to ruin your day. <br>We have a surprisingly convenient solution for the last one.</p><div class="hero-buttons"><a class="button button-gold" href="#plans">Get ahead of the inevitable ${icon('arrow')}</a><a class="quiet-link" href="#hazards">How bad could it be? ↓</a></div><div class="hero-promises"><span>${icon('wagon')} Fast local delivery</span><span>${icon('hammer')} Hand-built, unfortunately</span></div></div>
      <figure class="hero-illustration"><img src="${heroIllustration}" width="1254" height="1254" alt="A smiling undertaker gives a thumbs-up while trying a wooden coffin in his workshop." fetchpriority="high" decoding="async"></figure>
    </section>
    <div class="dispatch-strip"><div class="container"><span>${icon('pocket-watch')} Open until the sun goes down. Or you do.</span><span>${icon('horseshoe')} No appointment. No judgment. No returns.</span></div></div>
    <section class="hazards-section container section-space" id="hazards" aria-labelledby="hazards-heading"><div class="section-heading"><div><p class="kicker">A PERFECTLY REASONABLE CONCERN</p><h2 id="hazards-heading">Lovely place. <br><span>Terrible odds.</span></h2></div><p>Come for the wide-open spaces. <br>Stay because the doctor is also the barber.</p></div><div class="hazard-grid">${hazards.map((hazard, i) => `<article class="hazard-card"><div class="hazard-top">${icon(hazard.icon)}<span>0${i + 1} / ${hazard.category}</span></div><h3>${hazard.title}</h3><p>${hazard.text}</p></article>`).join('')}</div><p class="hazard-footnote">This is not an exhaustive list. We haven’t even mentioned the dentistry.</p></section>
    <section class="outlook-section" aria-labelledby="outlook-heading"><div class="container outlook-inner"><div><p class="kicker">THE LONG-TERM OUTLOOK</p><h2 id="outlook-heading">A business model <br>with very little guesswork.</h2><p>Our extremely unscientific frontier forecast.</p></div><div class="outlook-stats"><div>${icon('cowboy')}<strong>1</strong><span>life per customer</span></div><div>${icon('skull')}<strong>0</strong><span>documented respawns</span></div><div>${icon('coffin')}<strong>100<span>%</span></strong><span>eventual relevance</span></div></div></div></section>
    <section class="container section-space delivery-section" aria-labelledby="delivery-heading"><div class="section-heading"><div><p class="kicker">LESS FUSS. MORE FINALITY.</p><h2 id="delivery-heading">Your last errand. <br>Already handled.</h2></div><p>You’ve got enough on your plate. <br>Possibly a rattlesnake.</p></div><ol class="delivery-steps"><li><div class="step-top"><span>01</span>${icon('pocket-watch')}</div><h3>Plan while you can.</h3><p>Choose a coffin. Leave a name. Ideally before the duel.</p></li><li><div class="step-top"><span>02</span>${icon('hammer')}</div><h3>We mind the details.</h3><p>Good timber. Careful joinery. A refreshing lack of surprises.</p></li><li><div class="step-top"><span>03</span>${icon('wagon')}</div><h3>We go the last mile.</h3><p>Delivery by wagon. We aim to arrive before the vultures.</p></li></ol></section>
    <section class="plans-section" id="plans" aria-labelledby="plans-heading"><div class="container section-space"><div class="section-heading"><div><p class="kicker">A BOX FOR EVERY BUDGET</p><h2 id="plans-heading">Leave on your terms. <br><span>And within your means.</span></h2></div><p>One-time pricing. <br>We’re not expecting repeat business.</p></div><div class="plan-grid">${plans.map((plan, i) => `<article class="plan-card ${i === 1 ? 'featured' : ''}">${i === 1 ? '<span class="plan-ribbon">THE TOWN FAVORITE</span>' : ''}<div class="plan-heading">${icon(plan.icon)}<span>0${i + 1}</span></div><h3>${plan.name}</h3><p class="plan-pitch">${plan.pitch}</p><p class="price"><span>$</span>${plan.price}<small>one final payment</small></p><ul>${plan.features.map(feature => `<li><span aria-hidden="true">✓</span>${feature}</li>`).join('')}</ul><button class="button ${i === 1 ? 'button-gold' : 'button-outline'}" data-plan="${plan.id}">Choose ${plan.name} ${icon('arrow')}</button></article>`).join('')}</div><p class="pricing-note">Fictional frontier dollars. No purchase, payment, or actual coffin involved.</p></div></section>
    <section class="container section-space faq-section" aria-labelledby="faq-heading"><div><p class="kicker">BEFORE YOU ASK</p><h2 id="faq-heading">Loose ends, <br>tied up.</h2>${icon('lasso', 'faq-lasso')}</div><div class="faq-list">${[
      ['Can I order for someone else?', 'Certainly. A loved one, a business partner, that fellow who keeps challenging people at noon. Please discuss it with them first.'],
      ['What if I change my mind?', 'An excellent sign. Keep making plans. This fictional reservation carries no obligation, and the West will still be here tomorrow. Probably.'],
      ['Do you deliver outside town?', 'Within a day’s wagon ride, yes. Across a washed-out bridge, no. We have an unusually firm policy about creating additional customers.'],
      ['Is this an actual coffin company?', `No. Last Mile is a fictional showcase for <a href="${gallery}">Frontier Icons</a>. The prices, service, and town are made up. The SVG icons are real and free to use.`],
    ].map(([question, answer]) => `<details><summary>${question}<span aria-hidden="true">+</span></summary><p>${answer}</p></details>`).join('')}</div></section>
    <section class="reservation-section" id="reserve" aria-labelledby="reserve-heading"><div class="container reservation-inner"><div class="reservation-copy"><p class="kicker">NO TIME LIKE THE PRESENT</p><h2 id="reserve-heading">Make one <br>good decision <br><span>while you can.</span></h2><p>Leave your particulars. We’ll keep a place for you. <br>Not a grave. A place on the list. Important distinction.</p><div class="contact-note">${icon('wooden-sign')}<span>Find us opposite the saloon. <br>Business has been excellent.</span></div><p class="demo-note">A form demo, for the living and curious. <br>Nothing is sent or saved.</p></div>
      <div class="form-panel"><form id="reservation-form" novalidate><div class="form-header"><h3>Reserve your exit</h3><span>${icon('coffin')} No rush. Until there is.</span></div>
        <div class="field"><label for="customer-name">Your name <span>(while it’s still yours)</span></label><input id="customer-name" name="name" autocomplete="name" maxlength="80" placeholder="e.g. Lucky Luke" required aria-describedby="name-error"><p class="field-error" id="name-error" hidden></p></div>
        <div class="field"><label for="customer-email">Email address</label><input id="customer-email" name="email" autocomplete="email" type="email" maxlength="254" placeholder="you@the-saloon.example" required aria-describedby="email-error"><p class="field-error" id="email-error" hidden></p></div>
        <div class="field-row"><div class="field"><label for="coffin-plan">Your preferred exit</label><select id="coffin-plan" name="plan">${plans.map(plan => `<option value="${plan.id}" ${plan.id === 'respectable' ? 'selected' : ''}>${plan.name} — $${plan.price}</option>`).join('')}</select></div><div class="field"><label for="urgency">How’s your day going?</label><select id="urgency" name="urgency"><option value="planning">Planning ahead</option><option value="today">A little concerning</option><option value="urgent">Vultures are circling</option></select></div></div>
        <label class="checkbox-label"><input type="checkbox" name="saloon"> Leave it by the saloon, if I’m not around.</label>
        <div class="form-alert" id="form-alert" role="alert" hidden></div><button type="submit" class="button button-gold submit-button" id="submit-request"><span>Put me on the list</span>${icon('arrow')}</button><p class="form-fineprint">No payment. No spam. No actual undertaker.</p>
        <div class="demo-controls"><label for="demo-result">Try a form state</label><select id="demo-result"><option value="success">Successful reservation</option><option value="error">Delivery unavailable</option></select></div>
      </form><div class="success-panel" id="form-success" hidden><div class="success-seal">${icon('horseshoe')}</div><p class="kicker">LUCK IS STILL ON YOUR SIDE</p><h3 id="success-heading" tabindex="-1">You’re on the list. <br>Stay off the roof.</h3><p id="success-plan"></p><p>This was a demo. No request was sent, <br>and no coffin is on its way.</p><button class="button button-outline" id="start-again">Tempt fate again ${icon('arrow')}</button></div></div>
    </div></section>
    <section class="closing-line container">${icon('vulture')}<p>We hope you never need us. <br><span>We’re fairly confident you will.</span></p>${icon('tombstone')}</section>
  </main>
  <footer class="demo-footer container"><a class="wordmark" href="#">${icon('coffin')}<span>LAST MILE<small>FINE PINE. FAST DELIVERY. TERRIBLE TIMING.</small></span></a><p>A fictional service, illustrated with Frontier Icons.</p><a href="${gallery}">Get the icons ${icon('arrow')}</a></footer>`;

function el<T extends HTMLElement = HTMLElement>(id: string) { return document.getElementById(id) as T; }
const form = el<HTMLFormElement>('reservation-form');
const nameInput = el<HTMLInputElement>('customer-name');
const emailInput = el<HTMLInputElement>('customer-email');
const planSelect = el<HTMLSelectElement>('coffin-plan');
const submit = el<HTMLButtonElement>('submit-request');
let submitting = false;

document.querySelectorAll<HTMLButtonElement>('[data-plan]').forEach(button => button.addEventListener('click', () => {
  planSelect.value = button.dataset.plan!;
  document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('chosen'));
  button.closest('.plan-card')!.classList.add('chosen');
  el('reserve').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  nameInput.focus({ preventScroll: true });
}));

function validate(input: HTMLInputElement, errorId: string, message: string) {
  const valid = input.value.trim().length > 0 && input.validity.valid;
  input.setAttribute('aria-invalid', String(!valid));
  el(errorId).textContent = valid ? '' : message;
  el(errorId).hidden = valid;
  return valid;
}
const validators = [
  () => validate(nameInput, 'name-error', 'Even the undertaker needs a name. Add yours here.'),
  () => validate(emailInput, 'email-error', 'That address won’t reach the living. Enter a valid email.'),
];
[nameInput, emailInput].forEach((input, index) => {
  input.addEventListener('blur', () => { if (input.value || input.hasAttribute('aria-invalid')) validators[index](); });
  input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) validators[index](); });
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submitting) return;
  const valid = validators.map(validate => validate()).every(Boolean);
  if (!valid) { form.querySelector<HTMLInputElement>('[aria-invalid="true"]')!.focus(); return; }
  const selectedPlan = plans.find(plan => plan.id === planSelect.value)!;
  const outcome = el<HTMLSelectElement>('demo-result').value;
  submitting = true;
  el('form-alert').hidden = true;
  form.setAttribute('aria-busy', 'true');
  const controls = [...form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>('input, select, button')];
  controls.forEach(control => control.disabled = true);
  submit.innerHTML = `<span>Sending a rider…</span>${icon('wagon', 'sending-icon')}`;
  await new Promise(resolve => setTimeout(resolve, 850));
  submitting = false;
  form.removeAttribute('aria-busy');
  controls.forEach(control => control.disabled = false);
  submit.innerHTML = `<span>Put me on the list</span>${icon('arrow')}`;
  if (outcome === 'error') {
    el('form-alert').textContent = 'The bridge is out. No request was sent. Try again with “Successful reservation” selected below.';
    el('form-alert').hidden = false;
    submit.innerHTML = `<span>Send another rider</span>${icon('arrow')}`;
  } else {
    el('success-plan').textContent = `${selectedPlan.name}. A fine hypothetical choice.`;
    form.hidden = true;
    el('form-success').hidden = false;
    el('success-heading').focus({ preventScroll: true });
    // The demo retains no personal details after the success state.
    form.reset();
  }
});
el('start-again').addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  el('form-success').hidden = true;
  el('form-alert').hidden = true;
  [nameInput, emailInput].forEach(input => input.removeAttribute('aria-invalid'));
  ['name-error', 'email-error'].forEach(id => el(id).hidden = true);
  document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('chosen'));
  nameInput.focus({ preventScroll: true });
});

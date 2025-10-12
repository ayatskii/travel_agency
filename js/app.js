document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("clock");
    if (!el) return;             // если элемент не найден — выходим
    function updateClock() {
        const now = new Date();
        const opts = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Almaty"
        };
        el.textContent = now.toLocaleString("en-US", opts);
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Booking form
  const form = document.getElementById('bookingForm');
  if (form){
    const q = id => document.getElementById(id);
  const firstName = q('firstName');
  const lastName  = q('lastName');
  const email     = q('email');
  const phone     = q('phone');
  const destination = q('destination');
  const pkg       = q('pkg');
  const checkin   = q('checkin');
  const checkout  = q('checkout');
  const travellers= q('travellers');
  const agree     = q('agree');
  const statusBox = q('formStatus');

  const err = id => q(id);
  const show = (el, msg) => { if (el) { el.textContent = msg; el.classList.remove('d-none'); } };
  const hide = el => { if (el) el.classList.add('d-none'); };

  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const isPhone = v => /^\+?[0-9 ()-]{7,}$/.test(v);

  function validate() {
    let ok = true;
    ['err-firstName','err-lastName','err-email','err-phone','err-destination',
     'err-pkg','err-checkin','err-checkout','err-travellers','err-agree']
      .forEach(id => hide(err(id)));
    statusBox.innerHTML = '';

    if (!firstName.value.trim()) { show(err('err-firstName'),'Enter your first name.'); ok = false; }
    if (!lastName.value.trim())  { show(err('err-lastName'),'Enter your last name.'); ok = false; }

    const e = email.value.trim();
    if (!e || !isEmail(e)) { show(err('err-email'),'Enter a valid email.'); ok = false; }

    const p = phone.value.trim();
    if (!p || !isPhone(p)) { show(err('err-phone'),'Enter a valid phone number.'); ok = false; }

    if (!destination.value) { show(err('err-destination'),'Choose a destination.'); ok = false; }
    if (!pkg.value)         { show(err('err-pkg'),'Choose a package.'); ok = false; }
    if (!travellers.value)  { show(err('err-travellers'),'Select number of travelers.'); ok = false; }

    const cin = checkin.value ? new Date(checkin.value) : null;
    const cout= checkout.value ? new Date(checkout.value) : null;
    if (!cin) { show(err('err-checkin'),'Select check-in date.'); ok = false; }
    if (!cout){ show(err('err-checkout'),'Select check-out date.'); ok = false; }
    if (cin && cout && cout <= cin) { show(err('err-checkout'),'Check-out must be after check-in.'); ok = false; }

    if (!agree.checked) { show(err('err-agree'),'You must agree before submitting.'); ok = false; }

    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      statusBox.innerHTML = "<p class='text-success mb-0'>Booking request submitted successfully.</p>";
      form.reset();
    } else {
      statusBox.innerHTML = "<p class='text-danger mb-0'>Please fix the errors above.</p>";
    }
  });

  [firstName,lastName,email,phone,destination,pkg,checkin,checkout,travellers,agree]
    .forEach(el => el && el.addEventListener('input', validate));
  }

// ===== Contact form validation =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const g = id => document.getElementById(id);
  const cName = g('cName');
  const cEmail = g('cEmail');
  const cMessage = g('cMessage');
  const cAgree = g('cAgree');
  const contactStatus = g('contactStatus');

  const err = id => g(id);
  const show = (el,msg)=>{ if(el){ el.textContent=msg; el.classList.remove('d-none'); } };
  const hide = el => { if(el) el.classList.add('d-none'); };
  const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  function validateContact(){
    let ok = true;
    ['err-cName','err-cEmail','err-cMessage','err-cAgree'].forEach(i=>hide(err(i)));
    contactStatus.innerHTML = '';

    if(!cName.value.trim()){ show(err('err-cName'),'Enter your name.'); ok=false; }
    const e = cEmail.value.trim();
    if(!e || !isEmail(e)){ show(err('err-cEmail'),'Enter a valid email.'); ok=false; }
    const m = cMessage.value.trim();
    if(m.length < 10){ show(err('err-cMessage'),'Message must be at least 10 characters.'); ok=false; }
    if(!cAgree.checked){ show(err('err-cAgree'),'You must agree before submitting.'); ok=false; }

    return ok;
  }

  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(validateContact()){
      contactStatus.innerHTML = "<p class='text-success mb-0'>Message sent successfully.</p>";
      contactForm.reset();
    } else {
      contactStatus.innerHTML = "<p class='text-danger mb-0'>Please fix the errors above.</p>";
    }
  });

  [cName,cEmail,cMessage,cAgree].forEach(el=>el && el.addEventListener('input', validateContact));
}
});

// app.js - основной функционал
document.addEventListener("DOMContentLoaded", () => {
    // Clock functionality
    const el = document.getElementById("clock");
    if (el) {
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
    }

    // Contact form validation
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

    // Modal functionality
    const modal = document.getElementById('modal');
    if (modal) {
        const open = () => modal.classList.remove('hidden');
        const close = () => modal.classList.add('hidden');
        document.getElementById('openPopup')?.addEventListener('click', open);
        document.getElementById('closePopup')?.addEventListener('click', close);
        modal.addEventListener('click', e => {
            if (e.target.classList.contains('backdrop')) close();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
        });
    }

    // Background color cycler
    (() => {
        const btn = document.getElementById('bgBtn');
        if (!btn) return;
        const colors = ['#f6f7f9', '#ffe8a1', '#d1f7c4', '#cde3ff', '#ffd1dc'];
        let i = 0;
        btn.addEventListener('click', () => {
            const next = colors[i++ % colors.length];
            document.body.style.backgroundColor = next;
            const section = document.querySelector('.policy-section');
            if (section) section.style.backgroundColor = next;
        });
    })();

    // Chat functionality (новый код от команды)
    const chatForm = document.querySelector('#chat-form');
    const chatContainer = document.querySelector('#chat-bubbles');

    if (chatForm && chatContainer) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userMessage = document.querySelector('#chat-input').value;
            const userBubble = document.createElement('div');
            userBubble.classList.add('chat-bubble', 'user');
            userBubble.textContent = userMessage;
            chatContainer.appendChild(userBubble);

            setTimeout(() => {
                const botMessage = 'We will respond soon.';
                const botBubble = document.createElement('div');
                botBubble.classList.add('chat-bubble', 'bot');
                botBubble.textContent = botMessage;
                chatContainer.appendChild(botBubble);
                playBeep(); // Звук при ответе бота
            }, 500);
        });
    }

    // Accordion functionality (новый код от команды)
    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', function() {
            const panel = button.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
            button.classList.toggle('active');
        });
    });

    function playBeep() {
        const audio = new Audio('assets/sounds/beep.mp3'); 
        audio.play();
    }

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;  
            const isOpen = content.classList.contains('open'); 

            if (isOpen) {
                content.classList.remove('open');  
                this.classList.remove('open');     
            } else {
                content.classList.add('open');     
                this.classList.add('open');        
            }
        });
    });
});
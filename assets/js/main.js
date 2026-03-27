/* ===== STICKY HEADER SCROLL ===== */
const header=document.querySelector('.site-header');
if(header){window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>10)},{passive:true})}

/* ===== MOBILE NAV TOGGLE ===== */
const toggle=document.querySelector('.mobile-toggle');
const navLinks=document.querySelector('.nav-links');
if(toggle&&navLinks){
  toggle.addEventListener('click',()=>{
    navLinks.classList.toggle('open');
    const isOpen=navLinks.classList.contains('open');
    toggle.setAttribute('aria-expanded',isOpen);
    toggle.innerHTML=isOpen?'<i class="ph ph-x"></i>':'<i class="ph ph-list"></i>';
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.innerHTML='<i class="ph ph-list"></i>';
  }));
}

/* ===== BEFORE/AFTER SLIDER ===== */
document.querySelectorAll('.ba-slider').forEach(slider=>{
  const handle=slider.querySelector('.ba-handle');
  const before=slider.querySelector('.ba-before');
  if(!handle||!before) return;
  let dragging=false;
  function move(x){
    const rect=slider.getBoundingClientRect();
    let pct=((x-rect.left)/rect.width)*100;
    pct=Math.max(0,Math.min(100,pct));
    handle.style.left=pct+'%';
    before.style.clipPath='inset(0 '+(100-pct)+'% 0 0)';
  }
  slider.addEventListener('mousedown',e=>{dragging=true;move(e.clientX)});
  window.addEventListener('mousemove',e=>{if(dragging){e.preventDefault();move(e.clientX)}});
  window.addEventListener('mouseup',()=>{dragging=false});
  slider.addEventListener('touchstart',e=>{dragging=true;move(e.touches[0].clientX)},{passive:true});
  window.addEventListener('touchmove',e=>{if(dragging){move(e.touches[0].clientX)}},{passive:true});
  window.addEventListener('touchend',()=>{dragging=false});
});

/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.closest('.faq-item');
    const answer=item.querySelector('.faq-answer');
    const inner=item.querySelector('.faq-answer-inner');
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem=>{
      if(openItem!==item){
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight='0';
      }
    });
    if(isOpen){item.classList.remove('open');answer.style.maxHeight='0';}
    else{item.classList.add('open');answer.style.maxHeight=inner.scrollHeight+'px';}
  });
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

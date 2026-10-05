(function(){'use strict';
var nav=document.getElementById('nav'),burger=document.getElementById('burger'),menu=document.getElementById('menu'),links=document.querySelectorAll('.nav-link'),sections=document.querySelectorAll('main section[id]'),reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function onScroll(){nav.classList.toggle('scrolled',window.scrollY>40)}
window.addEventListener('scroll',onScroll,{passive:true});onScroll();
function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',String(o));burger.setAttribute('aria-label',o?'Close menu':'Open menu')}
burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);burger.focus()}});
window.addEventListener('resize',function(){if(window.innerWidth>820)setMenu(false)});
if('IntersectionObserver' in window){var spy=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(l){l.classList.toggle('active',l.getAttribute('href')==='#'+en.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});sections.forEach(function(s){spy.observe(s)})}
var items=document.querySelectorAll('.reveal');
document.querySelectorAll('.skills,.projects,.info').forEach(function(g){g.querySelectorAll('.reveal').forEach(function(el,i){el.style.setProperty('--stagger',(i%3)*0.1+'s')})});
if('IntersectionObserver' in window&&!reduce){var io=new IntersectionObserver(function(es,ob){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('visible');ob.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});items.forEach(function(el){io.observe(el)})}else{items.forEach(function(el){el.classList.add('visible')})}
var form=document.getElementById('contactForm'),success=document.getElementById('success'),fields={name:document.getElementById('name'),email:document.getElementById('email'),message:document.getElementById('message')};
function setError(k,m){var el=fields[k];document.getElementById('err-'+k).textContent=m;el.parentElement.classList.toggle('invalid',!!m);el.setAttribute('aria-invalid',m?'true':'false')}
function validate(k){var v=fields[k].value.trim(),m='';
if(k==='name'&&v.length<2)m='Please tell me your name.';
else if(k==='email'){if(!v)m='Please enter your email address.';else if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))m='That email doesn\u2019t look quite right.'}
else if(k==='message'&&v.length<10)m='Please write a short message (at least 10 characters).';
setError(k,m);return!m}
Object.keys(fields).forEach(function(k){fields[k].addEventListener('blur',function(){validate(k)});fields[k].addEventListener('input',function(){if(fields[k].parentElement.classList.contains('invalid'))validate(k)})});
form.addEventListener('submit',function(e){e.preventDefault();success.hidden=true;var ok=true,bad=null;Object.keys(fields).forEach(function(k){if(!validate(k)){ok=false;if(!bad)bad=fields[k]}});if(!ok){bad.focus();return}success.hidden=false;form.reset()});
var sb=document.getElementById('startBtn');
if(sb){sb.addEventListener('click',function(e){e.preventDefault();form.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});setTimeout(function(){fields.name.focus({preventScroll:true})},reduce?0:500)})}
})();

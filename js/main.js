document.addEventListener('DOMContentLoaded',()=>{
  const b=document.querySelector('.burger'),l=document.querySelector('.links');
  if(b)b.addEventListener('click',()=>l.classList.toggle('open'));
  const lb=document.querySelector('.lb');if(!lb)return;
  const im=lb.querySelector('img');const as=[...document.querySelectorAll('.gallery a')];let i=0;
  const show=k=>{i=(k+as.length)%as.length;im.src=as[i].href;im.alt=as[i].querySelector('img').alt;lb.classList.add('open')};
  as.forEach((a,k)=>a.addEventListener('click',e=>{e.preventDefault();show(k)}));
  lb.querySelector('.nx').addEventListener('click',e=>{e.stopPropagation();show(i+1)});
  lb.querySelector('.pv').addEventListener('click',e=>{e.stopPropagation();show(i-1)});
  lb.addEventListener('click',e=>{if(e.target===lb||e.target.classList.contains('x'))lb.classList.remove('open')});
  document.addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)});
});

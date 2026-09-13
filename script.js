'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('open',open)});
navigation?.addEventListener('click',e=>{if(e.target.closest('a')){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('open')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation?.classList.contains('open')){navigation.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.focus()}});

function setupFilter(buttonSelector,cardSelector,buttonKey,cardKey,statusSelector,label){
  const buttons=[...document.querySelectorAll(buttonSelector)],cards=[...document.querySelectorAll(cardSelector)],status=document.querySelector(statusSelector);
  buttons.forEach(button=>button.addEventListener('click',()=>{
    const filter=button.dataset[buttonKey];let count=0;
    buttons.forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button))});
    cards.forEach(card=>{const visible=filter==='all'||card.dataset[cardKey]===filter;card.hidden=!visible;if(visible)count++});
    if(status)status.textContent=`当前显示 ${count} ${label}`;
  }));
}
setupFilter('[data-game-filter]','[data-game-category]','gameFilter','gameCategory','#game-result','款游戏');
setupFilter('[data-filter]','[data-category]','filter','category','.work-result','个案例');

const dialog=document.querySelector('#work-dialog');
document.querySelectorAll('.work-card').forEach(card=>card.addEventListener('click',()=>{
  const img=document.querySelector('#dialog-image');
  img.src=card.dataset.image;img.alt=card.dataset.title+' 案例原图';
  document.querySelector('#dialog-title').textContent=card.dataset.title;
  dialog.showModal();
}));
document.querySelector('#dialog-close')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close()}});

document.querySelector('#contact-form')?.addEventListener('submit',e=>{
  e.preventDefault();const data=new FormData(e.currentTarget);
  const name=String(data.get('name')).trim(),email=String(data.get('email')).trim(),message=String(data.get('message')).trim();
  if(!name||!email||!message)return;
  const subject=encodeURIComponent(`官网合作咨询 · ${name}`);
  const body=encodeURIComponent(`名字：${name}\n邮箱：${email}\n\n留言：\n${message}`);
  document.querySelector('#contact-status').textContent='邮件草稿已准备好，请在邮件应用中确认并发送。若邮件应用未打开，可直接联系 zhuning@dreamstonevr.com。';
  window.location.href=`mailto:zhuning@dreamstonevr.com?subject=${subject}&body=${body}`;
});

// Preserve previously shared Strikingly section hashes as well as the new navigation.
const legacySections=['section-f_c935b1f8-69a4-429b-96af-4ca5a14fdb53','section-f_4228c337-e86f-43c0-85a7-d21270d2e737','section-f_567c95d9-d04e-42cd-bc88-c0b9f6d23569','section-f_c42fc412-6797-42c9-9187-fbd71493d029','section-f_072dec82-0565-4ae6-be80-2ce75dec5929','section-f_fa517d87-17cc-4539-b02c-eb68f96657d0','section-f_4efe022c-b2f5-4af7-83c6-f37a21e5d4b7','section-f_2e7ae768-e5a2-46df-ac74-33cbe8bd813a'];
function legacyHash(){const match=location.hash.match(/^#_([1-8])$/);if(match)document.getElementById(legacySections[Number(match[1])-1])?.scrollIntoView()}
window.addEventListener('hashchange',legacyHash);legacyHash();

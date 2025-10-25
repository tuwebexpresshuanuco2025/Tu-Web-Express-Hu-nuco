(function(){
  const isMobile=/Mobi|Android/i.test(navigator.userAgent);
  const form=document.getElementById("commentForm"),commentsList=document.getElementById("commentsList"),alertBox=document.getElementById("alert");
  let comments=JSON.parse(localStorage.getItem("comments"))||[];
  function showAlert(msg,d=3000){if(!alertBox)return;alertBox.innerText=msg;alertBox.style.display="block";alertBox.style.opacity="1";setTimeout(()=>{alertBox.style.opacity="0";setTimeout(()=>alertBox.style.display="none",350)},d)}
  function escapeHtml(t){return String(t).replace(/[&<>"']/g,e=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[e]))}
  function addCommentToDOM(n,m,pre=false){const d=document.createElement("div");d.className="comment";d.innerHTML=`<strong>${escapeHtml(n)}</strong><p>${escapeHtml(m)}</p>`;pre?commentsList.prepend(d):commentsList.appendChild(d)}
  comments.forEach(c=>{try{addCommentToDOM(c.name,c.message)}catch(e){console.error(e)}});
  form?.addEventListener("submit",e=>{e.preventDefault();const name=(document.getElementById("name")||{}).value?.trim()||"";const message=(document.getElementById("message")||{}).value?.trim()||"";if(!name||!message){showAlert("Por favor completa todos los campos");return}const comment={name,message};comments.unshift(comment);localStorage.setItem("comments",JSON.stringify(comments));addCommentToDOM(name,message,true);form.reset();showAlert("Comentario enviado correctamente")});
  document.addEventListener("DOMContentLoaded",()=>{
    const t=document.createElement("button");t.className="theme-toggle";t.setAttribute("aria-label","Cambiar tema");t.innerText="🌙/☀";
    t.addEventListener("click",()=>{document.body.classList.toggle("dark-mode");localStorage.setItem("theme",document.body.classList.contains("dark-mode")?"dark":"light");showAlert(document.body.classList.contains("dark-mode")?"Modo oscuro activado":"Modo claro activado")});
    document.body.appendChild(t);
    const savedTheme=localStorage.getItem("theme");if(savedTheme==="dark")document.body.classList.add("dark-mode");
    if(isMobile){document.querySelectorAll("a,button").forEach(el=>{el.style.transition="none"});document.querySelectorAll("button,a").forEach(el=>{el.style.padding="12px 18px";el.style.fontSize="1rem"});document.body.style.fontSize="16px";document.querySelectorAll("h2").forEach(h=>h.style.fontSize="1.3rem");document.querySelectorAll("p").forEach(p=>p.style.lineHeight="1.5")}
    const cookieBanner=document.getElementById("cookieBanner");
    const acceptBtn=document.getElementById("accept-cookies");
    const rejectBtn=document.getElementById("reject-cookies");
    if(cookieBanner){
      const accepted=localStorage.getItem("cookiesAccepted");
      if(accepted!=="1"){cookieBanner.classList.add("show");document.getElementById("cookie-text").innerText="Este sitio usa cookies para mejorar tu experiencia. Al aceptar permites que guardemos tu elección.";acceptBtn.innerText="Aceptar";rejectBtn.innerText="Cerrar"}
      acceptBtn?.addEventListener("click",()=>{localStorage.setItem("cookiesAccepted","1");cookieBanner.classList.remove("show");showAlert("Gracias. Cookies aceptadas")});
      rejectBtn?.addEventListener("click",()=>{cookieBanner.classList.remove("show")})
    }
  });
})();

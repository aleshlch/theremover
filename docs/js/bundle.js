(()=>{"use strict";const e=document.querySelector(".burger"),t=document.querySelector(".header__menu");e&&e.addEventListener("click",(function(){document.body.classList.toggle("scroll-lock"),e.classList.toggle("burger--active"),t.classList.toggle("header__menu--active")}));const o=document.querySelectorAll(".menu__link");o.length>0&&o.forEach((o=>{o.addEventListener("click",(function(o){const r=o.target;if(r.dataset.to&&document.querySelector(r.dataset.to)){const o=document.querySelector(r.dataset.to).getBoundingClientRect().top+scrollY-document.querySelector(".header").offsetHeight;t.classList.contains("header__menu-active")&&(document.body.classList.remove("scroll-lock"),e.classList.remove("burger--active"),t.classList.remove("header__menu--active")),window.scrollTo({top:o,behavior:"smooth"})}o.preventDefault()}))}));const r=document.querySelector("#uploadFile"),c=document.querySelector("#dwnl-img"),n=document.querySelector("#orig"),a=document.querySelector("#removed"),s=document.querySelector("#uploadLabel"),l=document.querySelectorAll(".example__img");r.addEventListener("change",(async function(){if(this.files[0]){const e=document.querySelector(".upload");window.scrollTo({top:e.getBoundingClientRect().top+scrollY-document.querySelector(".header").offsetHeight,behavior:"smooth"});const t=this.files[0],o=URL.createObjectURL(t),r=await d(t);c.src=r,i(o,r)}})),l.forEach((e=>{e.addEventListener("click",(async e=>{let t;const o=e.target.src;await u(o).then((e=>{let o=m(e,"imageName.jpg");t=o}));const r=await d(t);c.src=r,i(o,r)}))}));const d=async e=>{document.querySelector(".example").classList.add("none"),r.setAttribute("disabled","disabled"),s.innerText="Loading...",s.classList.add("disabled");const t=new FormData;t.append("image_file",e);const o=await fetch("https://clipdrop-api.co/remove-background/v1",{method:"POST",headers:{"x-api-key":"9bdf9ba5c25a66e89a68221e607ca5900eedee407ddf41a9c30b26ea1a63f0306e93f6d13f71f37c925c741fe6f845c5"},body:t}),c=await o.blob();return URL.createObjectURL(c)},i=(e,t)=>{document.querySelector(".download__image").classList.remove("none"),r.removeAttribute("disabled"),s.innerText="Upload image",s.classList.remove("disabled"),n.addEventListener("click",(()=>{c.src=e,a.classList.remove("dwnl-text--active"),n.classList.add("dwnl-text--active")})),a.addEventListener("click",(()=>{c.src=t,n.classList.remove("dwnl-text--active"),a.classList.add("dwnl-text--active")}));const o=document.createElement("a"),l=document.querySelector("#downBtn");l.appendChild(o),o.href=c.src,o.style.display="none",o.download="theremover-image",l.addEventListener("click",(()=>{document.body.appendChild(o),o.click(),document.body.removeChild(o)}))},u=e=>fetch(e).then((e=>e.blob())).then((e=>new Promise(((t,o)=>{const r=new FileReader;r.onloadend=()=>t(r.result),r.onerror=o,r.readAsDataURL(e)})))),m=(e,t)=>{for(var o=e.split(","),r=o[0].match(/:(.*?);/)[1],c=atob(o[1]),n=c.length,a=new Uint8Array(n);n--;)a[n]=c.charCodeAt(n);return new File([a],t,{type:r})};document.querySelector("#closeDwnlImage").addEventListener("click",(e=>{e.preventDefault(),document.querySelector(".download__image").classList.add("none"),document.querySelector(".example").classList.remove("none")}));const p=document.getElementById("slider");p.addEventListener("input",(()=>{let e=p.value;document.getElementById("my-img").style.clipPath="polygon(0 0,"+e+"% 0,"+e+"% 100%, 0 100%)"}));const v=document.querySelector("#modalShow"),y=document.querySelector("#closePopup"),g=document.querySelector(".popup"),h=document.querySelector(".popup__form"),L=document.querySelector("#form-name"),f=document.querySelector("#form-email"),b="Please enter a valid value";v.addEventListener("click",(()=>{g.classList.add("popup-visible")})),y.addEventListener("click",(()=>{S(),w(),_()})),g.addEventListener("click",(e=>{e.target.closest(".popup__wrapper")||(S(),w(),_())})),h.addEventListener("submit",(e=>{e.preventDefault();const t={name:L.value,email:f.value};q(t.email)&&t.name.length>0?(fetch("https://substantial-striped-fukuiraptor.glitch.me/requests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),w(),_(),S()):(!t.name.length>0&&(L.classList.add("error-input"),L.parentNode.querySelector(".error-message").innerText=b),q(t.email)||(f.classList.add("error-input"),f.parentNode.querySelector(".error-message").innerText=b))}));const S=()=>{g.classList.remove("popup-visible")},q=e=>/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(e),w=()=>{f.classList.remove("error-input"),L.classList.remove("error-input"),document.querySelectorAll(".error-message").forEach((e=>{e.innerText=""}))},_=()=>{f.value="",L.value=""}})();
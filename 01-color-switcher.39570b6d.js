!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),d=null;n.disabled=!0,e.addEventListener("click",(function(){e.disabled=!0,n.disabled=!1,d=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),n.addEventListener("click",(function(){e.disabled=!1,n.disabled=!0,clearInterval(d)}))}();
//# sourceMappingURL=01-color-switcher.39570b6d.js.map

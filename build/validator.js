function validatePlayerStats(t,e,a){const n=document.getElementById(t);let r=!1;for(const i of n.querySelector("tbody").querySelectorAll("tr")){const o=i.querySelectorAll("td");var l=fetchNbaPlayerStats(o[0].getAttribute("data-first-name"),o[0].getAttribute("data-last-name"),e);if(null!==l)for(const c of o){var s=c.getAttribute("data-match-key");null===s||isNaN(parseInt(l[s],10))||parseInt(l[s],10)!==parseInt(c.innerText,10)&&(r=!0,addErrorMessage(c,l[s]))}else o[0].innerHTML='<span class="material-icons md-18" style="font-size:14px;">help</span> '+o[0].innerText}if(r){const d=document.getElementById(a);d.innerHTML='<span class="material-icons md-18" style="font-size:14px;">info</span> '+d.innerHTML}}function addErrorMessage(t,e){t.classList.add("cell-danger"),t.parentElement.classList.add("table-warning"),new bootstrap.Tooltip(t,{boundary:"window",title:`Correct Value: ${e}`})}function fetchNbaPlayerStats(n,r,l){const t=window.fileData.gameData.stats.activePlayers;var e=t.filter(t=>{var e=t.teamId===l,a=t.lastName.slice(0,r.length)===r,t=t.firstName.slice(0,n.length)===n;return e&&t&&a});return 0===e.length?null:e[0]}export{validatePlayerStats as validatePlayerStats};
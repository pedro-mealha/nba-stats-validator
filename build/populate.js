import{validatePlayerStats as validatePlayerStats}from"./validator.js";async function populateHtml(t){document.getElementById("date").innerHTML=t.startsAt.toUTCString(),document.getElementById("location").innerHTML=t.location,document.getElementById("home-logo").src=t.teams.home.logo,document.getElementById("home-team-name").innerHTML=t.teams.home.name,document.getElementById("home-team-tricode").innerHTML=t.teams.home.triCode,document.getElementById("visitor-logo").src=t.teams.visitor.logo,document.getElementById("visitor-team-name").innerHTML=t.teams.visitor.name,document.getElementById("visitor-team-tricode").innerHTML=t.teams.visitor.triCode,document.getElementById("home-team-points").innerHTML=t.teams.home.score.final,document.getElementById("visitor-team-points").innerHTML=t.teams.visitor.score.final,document.getElementById("home-points-1p").innerHTML=t.teams.home.score.firstP,document.getElementById("visitor-points-1p").innerHTML=t.teams.visitor.score.firstP,document.getElementById("home-points-2p").innerHTML=t.teams.home.score.firstP+t.teams.home.score.secondP||"",document.getElementById("visitor-points-2p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP||"",document.getElementById("home-points-3p").innerHTML=t.teams.home.score.firstP+t.teams.home.score.secondP+t.teams.home.score.thirdP||"",document.getElementById("visitor-points-3p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP+t.teams.visitor.score.thirdP||"",document.getElementById("home-points-4p").innerHTML=t.teams.home.score.firstP+t.teams.home.score.secondP+t.teams.home.score.thirdP+t.teams.home.score.fourthP||"",document.getElementById("visitor-points-4p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP+t.teams.visitor.score.thirdP+t.teams.visitor.score.fourthP||"",addOverTimeScore(t.teams.home,"home"),addOverTimeScore(t.teams.visitor,"visitor"),document.getElementById("home-team-name-players-title").innerHTML=t.teams.home.name,populatePlyersTable(t.teams.home.players,"home-players-table"),addTeamScores(t.teams.home.stats,"home-players-table"),document.getElementById("visitor-team-name-players-title").innerHTML=t.teams.visitor.name,populatePlyersTable(t.teams.visitor.players,"visitor-players-table"),addTeamScores(t.teams.visitor.stats,"visitor-players-table"),validatePlayerStats("home-players-table",t.teams.home.id,"home-team-name-players-title"),validatePlayerStats("visitor-players-table",t.teams.visitor.id,"visitor-team-name-players-title"),document.getElementById("open-file-btn").style.display="none",document.getElementById("content").style.display="block"}function populatePlyersTable(t,e){let o="";for(const s of t)o+=`
      <tr>
        <td data-first-name="${s.firstName}" data-last-name="${s.lastName}">${s.firstName} ${s.lastName}</td>
        <td>${s.position}</td>
        <td>${s.minutes}</td>
        <td data-match-key="fgm">${s.fieldGoalsMade}</td>
        <td data-match-key="fga">${s.fieldGoalsAttempts}</td>
        <td data-match-key="fgp">${s.fieldGoalsPercentage}</td>
        <td data-match-key="tpm">${s.threePointsMade}</td>
        <td data-match-key="tpa">${s.threePointsAttempts}</td>
        <td data-match-key="tpp">${s.threePointsPercentage}</td>
        <td data-match-key="ftm">${s.freeThrowMade}</td>
        <td data-match-key="fta">${s.freeThrowAttempts}</td>
        <td data-match-key="ftp">${s.freeThrowPercentage}</td>
        <td data-match-key="offReb">${s.offensiveRebounds}</td>
        <td data-match-key="defReb">${s.defensiveRebounds}</td>
        <td data-match-key="totReb">${s.totalRebounds}</td>
        <td data-match-key="assists">${s.assists}</td>
        <td data-match-key="pFouls">${s.personalFouls}</td>
        <td data-match-key="steals">${s.steals}</td>
        <td data-match-key="turnovers">${s.turnouvers}</td>
        <td data-match-key="blocks">${s.blocks}</td>
        <td data-match-key="points">${s.points}</td>
      </tr>
    `;document.getElementById(e).querySelector("tbody").innerHTML=o}function addTeamScores(t,e){var o=document.getElementById(e).querySelector("tbody").parentElement.innerHTML;o+=`
    <tfoot>
      <tr style="height:3px;"></tr>
      <tr>
        <td>TOTALS</td>
        <td></td>
        <td></td>
        <td>${t.fieldGoalsMade}</td>
        <td>${t.fieldGoalsAttempts}</td>
        <td>${t.fieldGoalsPercentage}</td>
        <td>${t.threePointsMade}</td>
        <td>${t.threePointsAttempts}</td>
        <td>${t.threePointsPercentage}</td>
        <td>${t.freeThrowMade}</td>
        <td>${t.freeThrowAttempts}</td>
        <td>${t.freeThrowPercentage}</td>
        <td>${t.offensiveRebounds}</td>
        <td>${t.defensiveRebounds}</td>
        <td>${t.totalRebounds}</td>
        <td>${t.assists}</td>
        <td>${t.personalFouls}</td>
        <td>${t.steals}</td>
        <td>${t.turnouvers}</td>
        <td>${t.blocks}</td>
        <td>${t.points}</td>
      </tr>
    </tfoot>
  `,document.getElementById(e).querySelector("tbody").parentElement.innerHTML=o}function addOverTimeScore(t,e){var o=t.score.firstP+t.score.secondP+t.score.thirdP+t.score.fourthP||"";t.score.firstOT&&(document.getElementById(`${e}-points-first-ot`).innerHTML=o+t.score.firstOT,document.getElementById(`${e}-points-first-ot`).parentElement.parentElement.style.display="block"),t.score.secondOT&&(document.getElementById(`${e}-points-second-ot`).innerHTML=o+t.score.firstOT+t.score.secondOT,document.getElementById(`${e}-points-second-ot`).parentElement.parentElement.style.display="block"),t.score.thirdOT&&(document.getElementById(`${e}-points-third-ot`).innerHTML=o+t.score.firstOT+t.score.secondOT+t.score.thirdOT,document.getElementById(`${e}-points-third-ot`).parentElement.parentElement.style.display="block")}export{populateHtml as populateHtml};
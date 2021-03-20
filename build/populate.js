import{validatePlayerStats as validatePlayerStats}from"./validator.js";async function populateHtml(t){document.getElementById("date").innerHTML=t.startsAt.toUTCString(),document.getElementById("location").innerHTML=t.location,document.getElementById("home-logo").src=t.teams.home.logo,document.getElementById("home-team-name").innerHTML=t.teams.home.name,document.getElementById("home-team-tricode").innerHTML=t.teams.home.triCode,document.getElementById("visitor-logo").src=t.teams.visitor.logo,document.getElementById("visitor-team-name").innerHTML=t.teams.visitor.name,document.getElementById("visitor-team-tricode").innerHTML=t.teams.visitor.triCode,document.getElementById("home-team-points").innerHTML=t.teams.home.score.final,document.getElementById("visitor-team-points").innerHTML=t.teams.visitor.score.final,document.getElementById("home-points-1p").innerHTML=t.teams.home.score.firstP,document.getElementById("visitor-points-1p").innerHTML=t.teams.visitor.score.firstP,document.getElementById("home-points-2p").innerHTML=t.teams.home.score.firstP+t.teams.home.score.secondP||"",document.getElementById("visitor-points-2p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP||"",document.getElementById("home-points-3p").innerHTML=t.teams.home.score.firstP+t.teams.home.score.secondP+t.teams.home.score.thirdP||"",document.getElementById("visitor-points-3p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP+t.teams.visitor.score.thirdP||"",document.getElementById("home-points-4p").innerHTML=t.teams.home.score.firstP+t.teams.home.score.secondP+t.teams.home.score.thirdP+t.teams.home.score.fourthP||"",document.getElementById("visitor-points-4p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP+t.teams.visitor.score.thirdP+t.teams.visitor.score.fourthP||"",document.getElementById("home-team-name-players-title").innerHTML=t.teams.home.name,populatePlyersTable(t.teams.home.players,"home-players-table"),addTeamScores(t.teams.home.stats,"home-players-table"),document.getElementById("visitor-team-name-players-title").innerHTML=t.teams.visitor.name,populatePlyersTable(t.teams.visitor.players,"visitor-players-table"),addTeamScores(t.teams.visitor.stats,"visitor-players-table"),validatePlayerStats("home-players-table",t.teams.home.id,"home-team-name-players-title"),validatePlayerStats("visitor-players-table",t.teams.visitor.id,"visitor-team-name-players-title"),document.getElementById("open-file-btn").style.display="none",document.getElementById("content").style.display="block"}function populatePlyersTable(t,e){let o="";for(const a of t)o+=`
      <tr>
        <td data-first-name="${a.firstName}" data-last-name="${a.lastName}">${a.firstName} ${a.lastName}</td>
        <td>${a.position}</td>
        <td>${a.minutes}</td>
        <td data-match-key="fgm">${a.fieldGoalsMade}</td>
        <td data-match-key="fga">${a.fieldGoalsAttempts}</td>
        <td data-match-key="fgp">${a.fieldGoalsPercentage}</td>
        <td data-match-key="tpm">${a.threePointsMade}</td>
        <td data-match-key="tpa">${a.threePointsAttempts}</td>
        <td data-match-key="tpp">${a.threePointsPercentage}</td>
        <td data-match-key="ftm">${a.freeThrowMade}</td>
        <td data-match-key="fta">${a.freeThrowAttempts}</td>
        <td data-match-key="ftp">${a.freeThrowPercentage}</td>
        <td data-match-key="offReb">${a.offensiveRebounds}</td>
        <td data-match-key="defReb">${a.defensiveRebounds}</td>
        <td data-match-key="totReb">${a.totalRebounds}</td>
        <td data-match-key="assists">${a.assists}</td>
        <td data-match-key="pFouls">${a.personalFouls}</td>
        <td data-match-key="steals">${a.steals}</td>
        <td data-match-key="turnovers">${a.turnouvers}</td>
        <td data-match-key="blocks">${a.blocks}</td>
        <td data-match-key="points">${a.points}</td>
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
  `,document.getElementById(e).querySelector("tbody").parentElement.innerHTML=o}export{populateHtml as populateHtml};
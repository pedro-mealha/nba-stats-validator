async function populateHtml(e){document.getElementById("date").innerHTML=e.startsAt.toUTCString(),document.getElementById("location").innerHTML=e.location,document.getElementById("home-logo").src=e.teams.home.logo,document.getElementById("home-team-name").innerHTML=e.teams.home.name,document.getElementById("home-team-tricode").innerHTML=e.teams.home.triCode,document.getElementById("visitor-logo").src=e.teams.visitor.logo,document.getElementById("visitor-team-name").innerHTML=e.teams.visitor.name,document.getElementById("visitor-team-tricode").innerHTML=e.teams.visitor.triCode,document.getElementById("home-team-points").innerHTML=e.teams.home.score.final,document.getElementById("visitor-team-points").innerHTML=e.teams.visitor.score.final,document.getElementById("home-points-1p").innerHTML=e.teams.home.score.firstP,document.getElementById("visitor-points-1p").innerHTML=e.teams.visitor.score.firstP,document.getElementById("home-points-2p").innerHTML=e.teams.home.score.firstP+e.teams.home.score.secondP||"",document.getElementById("visitor-points-2p").innerHTML=e.teams.visitor.score.firstP+e.teams.visitor.score.secondP||"",document.getElementById("home-points-3p").innerHTML=e.teams.home.score.firstP+e.teams.home.score.secondP+e.teams.home.score.thirdP||"",document.getElementById("visitor-points-3p").innerHTML=e.teams.visitor.score.firstP+e.teams.visitor.score.secondP+e.teams.visitor.score.thirdP||"",document.getElementById("home-points-4p").innerHTML=e.teams.home.score.firstP+e.teams.home.score.secondP+e.teams.home.score.thirdP+e.teams.home.score.fourthP||"",document.getElementById("visitor-points-4p").innerHTML=e.teams.visitor.score.firstP+e.teams.visitor.score.secondP+e.teams.visitor.score.thirdP+e.teams.visitor.score.fourthP||"",document.getElementById("home-team-name-players-title").innerHTML=e.teams.home.name,populatePlyersTable(e.teams.home.players,"home-players-table"),addTeamScores(e.teams.home.stats,"home-players-table"),document.getElementById("visitor-team-name-players-title").innerHTML=e.teams.visitor.name,populatePlyersTable(e.teams.visitor.players,"visitor-players-table"),addTeamScores(e.teams.visitor.stats,"visitor-players-table"),document.getElementById("open-file-btn").style.display="none",document.getElementById("content").style.display="block"}function populatePlyersTable(e,t){let o="";for(const s of e)o+=`
      <tr>
        <td>${s.firstName||""} ${s.lastName||""}</td>
        <td>${s.position}</td>
        <td>${s.minutes}</td>
        <td>${s.fieldGoalsMade}</td>
        <td>${s.fieldGoalsAttempts}</td>
        <td>${s.fieldGoalsPercentage}</td>
        <td>${s.threePointsMade}</td>
        <td>${s.threePointsAttempts}</td>
        <td>${s.threePointsPercentage}</td>
        <td>${s.freeThrowMade}</td>
        <td>${s.freeThrowAttempts}</td>
        <td>${s.freeThrowPercentage}</td>
        <td>${s.offensiveRebounds}</td>
        <td>${s.defensiveRebounds}</td>
        <td>${s.totalRebounds}</td>
        <td>${s.assists}</td>
        <td>${s.personalFouls}</td>
        <td>${s.steals}</td>
        <td>${s.turnouvers}</td>
        <td>${s.blocks}</td>
        <td>${s.points}</td>
      </tr>
    `;document.getElementById(t).querySelector("tbody").innerHTML=o}function addTeamScores(e,t){var o=document.getElementById(t).querySelector("tbody").parentElement.innerHTML;o+=`
    <tfoot>
      <tr style="height:3px;"></tr>
      <tr>
        <td>TOTALS</td>
        <td></td>
        <td></td>
        <td>${e.fieldGoalsMade}</td>
        <td>${e.fieldGoalsAttempts}</td>
        <td>${e.fieldGoalsPercentage}</td>
        <td>${e.threePointsMade}</td>
        <td>${e.threePointsAttempts}</td>
        <td>${e.threePointsPercentage}</td>
        <td>${e.freeThrowMade}</td>
        <td>${e.freeThrowAttempts}</td>
        <td>${e.freeThrowPercentage}</td>
        <td>${e.offensiveRebounds}</td>
        <td>${e.defensiveRebounds}</td>
        <td>${e.totalRebounds}</td>
        <td>${e.assists}</td>
        <td>${e.personalFouls}</td>
        <td>${e.steals}</td>
        <td>${e.turnouvers}</td>
        <td>${e.blocks}</td>
        <td>${e.points}</td>
      </tr>
    </tfoot>
  `,document.getElementById(t).querySelector("tbody").parentElement.innerHTML=o}export{populateHtml as populateHtml};
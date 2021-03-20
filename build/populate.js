async function populateHtml(t){document.getElementById("date").innerHTML=t.startsAt.toUTCString(),document.getElementById("location").innerHTML=t.location,document.getElementById("host-logo").src=t.teams.host.logo,document.getElementById("host-team-name").innerHTML=t.teams.host.name,document.getElementById("host-team-tricode").innerHTML=t.teams.host.triCode,document.getElementById("visitor-logo").src=t.teams.visitor.logo,document.getElementById("visitor-team-name").innerHTML=t.teams.visitor.name,document.getElementById("visitor-team-tricode").innerHTML=t.teams.visitor.triCode,document.getElementById("host-team-points").innerHTML=t.teams.host.score.final,document.getElementById("visitor-team-points").innerHTML=t.teams.visitor.score.final,document.getElementById("host-points-1p").innerHTML=t.teams.host.score.firstP,document.getElementById("visitor-points-1p").innerHTML=t.teams.visitor.score.firstP,document.getElementById("host-points-2p").innerHTML=t.teams.host.score.firstP+t.teams.host.score.secondP||"",document.getElementById("visitor-points-2p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP||"",document.getElementById("host-points-3p").innerHTML=t.teams.host.score.firstP+t.teams.host.score.secondP+t.teams.host.score.thirdP||"",document.getElementById("visitor-points-3p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP+t.teams.visitor.score.thirdP||"",document.getElementById("host-points-4p").innerHTML=t.teams.host.score.firstP+t.teams.host.score.secondP+t.teams.host.score.thirdP+t.teams.host.score.fourthP||"",document.getElementById("visitor-points-4p").innerHTML=t.teams.visitor.score.firstP+t.teams.visitor.score.secondP+t.teams.visitor.score.thirdP+t.teams.visitor.score.fourthP||"",document.getElementById("home-team-name-players-title").innerHTML=t.teams.host.name,populatePlyersTable(t.teams.host.players,"home-players-table"),document.getElementById("visitor-team-name-players-title").innerHTML=t.teams.visitor.name,populatePlyersTable(t.teams.visitor.players,"visitor-players-table"),document.getElementById("open-file-btn").style.display="none",document.getElementById("content").style.display="block"}function populatePlyersTable(t,e){let s="";for(const o of t)s+=`
      <tr>
        <td>${o.firstName} ${o.lastName}</td>
        <td>${o.position}</td>
        <td>${o.minutes}</td>
        <td>${o.fieldGoalsMade}</td>
        <td>${o.fieldGoalsAttempts}</td>
        <td>${o.fieldGoalsPercentage}</td>
        <td>${o.threePointsMade}</td>
        <td>${o.threePointsAttempts}</td>
        <td>${o.threePointsPercentage}</td>
        <td>${o.freeThrowMade}</td>
        <td>${o.freeThrowAttempts}</td>
        <td>${o.freeThrowPercentage}</td>
        <td>${o.offensiveRebounds}</td>
        <td>${o.defensiveRebounds}</td>
        <td>${o.totalRebounds}</td>
        <td>${o.assists}</td>
        <td>${o.personalFouls}</td>
        <td>${o.steals}</td>
        <td>${o.turnouvers}</td>
        <td>${o.blocks}</td>
        <td>${o.points}</td>
      </tr>
    `;document.getElementById(e).querySelector("tbody").innerHTML=s}export{populateHtml as populateHtml};
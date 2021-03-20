export async function populateHtml (data) {
  document.getElementById('date').innerHTML = data.startsAt.toUTCString()
  document.getElementById('location').innerHTML = data.location

  document.getElementById('home-logo').src = data.teams.home.logo
  document.getElementById('home-team-name').innerHTML = data.teams.home.name
  document.getElementById('home-team-tricode').innerHTML = data.teams.home.triCode
  document.getElementById('visitor-logo').src = data.teams.visitor.logo
  document.getElementById('visitor-team-name').innerHTML = data.teams.visitor.name
  document.getElementById('visitor-team-tricode').innerHTML = data.teams.visitor.triCode

  document.getElementById('home-team-points').innerHTML = data.teams.home.score.final
  document.getElementById('visitor-team-points').innerHTML = data.teams.visitor.score.final

  document.getElementById('home-points-1p').innerHTML = data.teams.home.score.firstP
  document.getElementById('visitor-points-1p').innerHTML = data.teams.visitor.score.firstP
  document.getElementById('home-points-2p').innerHTML = data.teams.home.score.firstP + data.teams.home.score.secondP || ''
  document.getElementById('visitor-points-2p').innerHTML = data.teams.visitor.score.firstP + data.teams.visitor.score.secondP || ''
  document.getElementById('home-points-3p').innerHTML = data.teams.home.score.firstP + data.teams.home.score.secondP + data.teams.home.score.thirdP || ''
  document.getElementById('visitor-points-3p').innerHTML = data.teams.visitor.score.firstP + data.teams.visitor.score.secondP + data.teams.visitor.score.thirdP || ''
  document.getElementById('home-points-4p').innerHTML = data.teams.home.score.firstP + data.teams.home.score.secondP + data.teams.home.score.thirdP + data.teams.home.score.fourthP || ''
  document.getElementById('visitor-points-4p').innerHTML = data.teams.visitor.score.firstP + data.teams.visitor.score.secondP + data.teams.visitor.score.thirdP + data.teams.visitor.score.fourthP || ''

  document.getElementById('home-team-name-players-title').innerHTML = data.teams.home.name
  populatePlyersTable(data.teams.home.players, 'home-players-table')
  addTeamScores(data.teams.home.stats, 'home-players-table')

  document.getElementById('visitor-team-name-players-title').innerHTML = data.teams.visitor.name
  populatePlyersTable(data.teams.visitor.players, 'visitor-players-table')
  addTeamScores(data.teams.visitor.stats, 'visitor-players-table')

  document.getElementById('open-file-btn').style.display = 'none'
  document.getElementById('content').style.display = 'block'
}

function populatePlyersTable (players, id) {
  let html = ''

  for (const player of players) {
    html += `
      <tr>
        <td>${player.firstName || ''} ${player.lastName || ''}</td>
        <td>${player.position}</td>
        <td>${player.minutes}</td>
        <td>${player.fieldGoalsMade}</td>
        <td>${player.fieldGoalsAttempts}</td>
        <td>${player.fieldGoalsPercentage}</td>
        <td>${player.threePointsMade}</td>
        <td>${player.threePointsAttempts}</td>
        <td>${player.threePointsPercentage}</td>
        <td>${player.freeThrowMade}</td>
        <td>${player.freeThrowAttempts}</td>
        <td>${player.freeThrowPercentage}</td>
        <td>${player.offensiveRebounds}</td>
        <td>${player.defensiveRebounds}</td>
        <td>${player.totalRebounds}</td>
        <td>${player.assists}</td>
        <td>${player.personalFouls}</td>
        <td>${player.steals}</td>
        <td>${player.turnouvers}</td>
        <td>${player.blocks}</td>
        <td>${player.points}</td>
      </tr>
    `
  }

  document.getElementById(id).querySelector('tbody').innerHTML = html
}

function addTeamScores (score, id) {
  let html = document.getElementById(id).querySelector('tbody').parentElement.innerHTML
  html += `
    <tfoot>
      <tr style="height:3px;"></tr>
      <tr>
        <td>TOTALS</td>
        <td></td>
        <td></td>
        <td>${score.fieldGoalsMade}</td>
        <td>${score.fieldGoalsAttempts}</td>
        <td>${score.fieldGoalsPercentage}</td>
        <td>${score.threePointsMade}</td>
        <td>${score.threePointsAttempts}</td>
        <td>${score.threePointsPercentage}</td>
        <td>${score.freeThrowMade}</td>
        <td>${score.freeThrowAttempts}</td>
        <td>${score.freeThrowPercentage}</td>
        <td>${score.offensiveRebounds}</td>
        <td>${score.defensiveRebounds}</td>
        <td>${score.totalRebounds}</td>
        <td>${score.assists}</td>
        <td>${score.personalFouls}</td>
        <td>${score.steals}</td>
        <td>${score.turnouvers}</td>
        <td>${score.blocks}</td>
        <td>${score.points}</td>
      </tr>
    </tfoot>
  `

  document.getElementById(id).querySelector('tbody').parentElement.innerHTML = html
}

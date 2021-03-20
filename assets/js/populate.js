export async function populateHtml (data) {
  document.getElementById('date').innerHTML = data.startsAt.toUTCString()
  document.getElementById('location').innerHTML = data.location

  document.getElementById('host-logo').src = data.teams.host.logo
  document.getElementById('host-team-name').innerHTML = data.teams.host.name
  document.getElementById('host-team-tricode').innerHTML = data.teams.host.triCode
  document.getElementById('visitor-logo').src = data.teams.visitor.logo
  document.getElementById('visitor-team-name').innerHTML = data.teams.visitor.name
  document.getElementById('visitor-team-tricode').innerHTML = data.teams.visitor.triCode

  document.getElementById('host-team-points').innerHTML = data.teams.host.score.final
  document.getElementById('visitor-team-points').innerHTML = data.teams.visitor.score.final

  document.getElementById('host-points-1p').innerHTML = data.teams.host.score.firstP
  document.getElementById('visitor-points-1p').innerHTML = data.teams.visitor.score.firstP
  document.getElementById('host-points-2p').innerHTML = data.teams.host.score.firstP + data.teams.host.score.secondP || ''
  document.getElementById('visitor-points-2p').innerHTML = data.teams.visitor.score.firstP + data.teams.visitor.score.secondP || ''
  document.getElementById('host-points-3p').innerHTML = data.teams.host.score.firstP + data.teams.host.score.secondP + data.teams.host.score.thirdP || ''
  document.getElementById('visitor-points-3p').innerHTML = data.teams.visitor.score.firstP + data.teams.visitor.score.secondP + data.teams.visitor.score.thirdP || ''
  document.getElementById('host-points-4p').innerHTML = data.teams.host.score.firstP + data.teams.host.score.secondP + data.teams.host.score.thirdP + data.teams.host.score.fourthP || ''
  document.getElementById('visitor-points-4p').innerHTML = data.teams.visitor.score.firstP + data.teams.visitor.score.secondP + data.teams.visitor.score.thirdP + data.teams.visitor.score.fourthP || ''

  document.getElementById('home-team-name-players-title').innerHTML = data.teams.host.name
  populatePlyersTable(data.teams.host.players, 'home-players-table')

  document.getElementById('visitor-team-name-players-title').innerHTML = data.teams.visitor.name
  populatePlyersTable(data.teams.visitor.players, 'visitor-players-table')

  document.getElementById('open-file-btn').style.display = 'none'
  document.getElementById('content').style.display = 'block'
}

function populatePlyersTable (players, id) {
  let html = ''

  for (const player of players) {
    html += `
      <tr>
        <td>${player.firstName} ${player.lastName}</td>
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

import { validatePlayerStats, validateTeamStats } from './validator.js'

export async function populateHtml (data) {
  document.getElementById('date').innerHTML = `${data.date} ${data.startsAt}`
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
  addOverTimeScore(data.teams.home, 'home')
  addOverTimeScore(data.teams.visitor, 'visitor')

  document.getElementById('home-team-name-players-title').innerHTML = data.teams.home.name
  populatePlyersTable(data.teams.home.players, 'home-players-table')
  addTeamScores(data.teams.home.stats, 'home-players-table')
  addTeamSecondaryScores(data.teams.home.stats, 'home-players-table')

  document.getElementById('visitor-team-name-players-title').innerHTML = data.teams.visitor.name
  populatePlyersTable(data.teams.visitor.players, 'visitor-players-table')
  addTeamScores(data.teams.visitor.stats, 'visitor-players-table')
  addTeamSecondaryScores(data.teams.visitor.stats, 'visitor-players-table')

  validatePlayerStats('home-players-table', data.teams.home.id, 'home-team-name-players-title')
  validatePlayerStats('visitor-players-table', data.teams.visitor.id, 'visitor-team-name-players-title')

  validateTeamStats('home-players-table', 'home-team-name-players-title')
  validateTeamStats('visitor-players-table', 'visitor-team-name-players-title')

  document.getElementById('loading').classList.add('d-none')
  document.getElementById('content').style.display = 'block'
  document.getElementsByTagName('footer')[0].style.bottom = ''
}

function populatePlyersTable (players, id) {
  let html = ''

  for (const player of players) {
    html += `
      <tr>
        <td data-first-name="${player.firstName}" data-last-name="${player.lastName}">${player.firstName} ${player.lastName}</td>
        <td>${player.position}</td>
        <td data-match-key="min" data-match-key-type="string">${player.minutes}</td>
        <td data-match-key="fgm" data-match-key-type="int">${player.fieldGoalsMade}</td>
        <td data-match-key="fga" data-match-key-type="int">${player.fieldGoalsAttempts}</td>
        <td data-match-key="fgp" data-match-key-type="int">${player.fieldGoalsPercentage}</td>
        <td data-match-key="3fgm" data-match-key-type="int">${player.threePointsMade}</td>
        <td data-match-key="3fga" data-match-key-type="int">${player.threePointsAttempts}</td>
        <td data-match-key="3fgp" data-match-key-type="int">${player.threePointsPercentage}</td>
        <td data-match-key="ftm" data-match-key-type="int">${player.freeThrowMade}</td>
        <td data-match-key="fta" data-match-key-type="int">${player.freeThrowAttempts}</td>
        <td data-match-key="ftp" data-match-key-type="int">${player.freeThrowPercentage}</td>
        <td data-match-key="oreb" data-match-key-type="int">${player.offensiveRebounds}</td>
        <td data-match-key="dreb" data-match-key-type="int">${player.defensiveRebounds}</td>
        <td data-match-key="reb" data-match-key-type="int">${player.totalRebounds}</td>
        <td data-match-key="ast" data-match-key-type="int">${player.assists}</td>
        <td data-match-key="pf" data-match-key-type="int">${player.personalFouls}</td>
        <td data-match-key="fd" data-match-key-type="int">${player.foulsDrawn}</td>
        <td data-match-key="stl" data-match-key-type="int">${player.steals}</td>
        <td data-match-key="to" data-match-key-type="int">${player.turnouvers}</td>
        <td data-match-key="blk" data-match-key-type="int">${player.blocks}</td>
        <td data-match-key="pts" data-match-key-type="int">${player.points}</td>
        <td data-match-key="minus_plus" data-match-key-type="int">${player.plusMinusPts}</td>
      </tr>
    `
  }

  document.getElementById(id).querySelector('tbody').innerHTML = html
}

function addTeamScores (score, id) {
  const html = `
      <tr style="height:3px;"></tr>
      <tr>
        <td>TOTALS</td>
        <td></td>
        <td></td>
        <td data-match-key="fgm" data-match-key-type="int">${score.fieldGoalsMade}</td>
        <td data-match-key="fga" data-match-key-type="int">${score.fieldGoalsAttempts}</td>
        <td data-match-key="fgp" data-match-key-type="int">${score.fieldGoalsPercentage}</td>
        <td data-match-key="3fgm" data-match-key-type="int">${score.threePointsMade}</td>
        <td data-match-key="3fga" data-match-key-type="int">${score.threePointsAttempts}</td>
        <td data-match-key="3fgp" data-match-key-type="int">${score.threePointsPercentage}</td>
        <td data-match-key="ftm" data-match-key-type="int">${score.freeThrowMade}</td>
        <td data-match-key="fta" data-match-key-type="int">${score.freeThrowAttempts}</td>
        <td data-match-key="ftp" data-match-key-type="int">${score.freeThrowPercentage}</td>
        <td data-match-key="oreb" data-match-key-type="int">${score.offensiveRebounds}</td>
        <td data-match-key="dreb" data-match-key-type="int">${score.defensiveRebounds}</td>
        <td data-match-key="reb" data-match-key-type="int">${score.totalRebounds}</td>
        <td data-match-key="ast" data-match-key-type="int">${score.assists}</td>
        <td data-match-key="pf" data-match-key-type="int">${score.personalFouls}</td>
        <td data-match-key="fd" data-match-key-type="int">${score.foulsDrawn}</td>
        <td data-match-key="stl" data-match-key-type="int">${score.steals}</td>
        <td data-match-key="to" data-match-key-type="int">${score.turnouvers}</td>
        <td data-match-key="blk" data-match-key-type="int">${score.blocks}</td>
        <td data-match-key="pts" data-match-key-type="int">${score.points}</td>
        <td data-match-key="plus_minus" data-match-key-type="int">${score.plusMinusPts}</td>
      </tr>
  `

  document.getElementById(id).querySelector('tfoot').innerHTML = html
}

function addTeamSecondaryScores (score, id) {
  let html = document.getElementById(id).querySelector('tfoot').innerHTML
  html += `
      <tr>
        <td>TEAM</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td data-match-key="rebt" data-match-key-type="int">${score.teamRebounds}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td data-match-key="tot" data-match-key-type="int">${score.teamTurnovers}</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tfoot>
  `

  document.getElementById(id).querySelector('tfoot').innerHTML = html
}

function addOverTimeScore (team, type) {
  const currentScore = team.score.firstP + team.score.secondP + team.score.thirdP + team.score.fourthP || ''

  if (team.score.firstOT) {
    document.getElementById(`${type}-points-first-ot`).innerHTML = currentScore + team.score.firstOT
    document.getElementById(`${type}-points-first-ot`).parentElement.parentElement.style.display = 'block'
  }

  if (team.score.secondOT) {
    document.getElementById(`${type}-points-second-ot`).innerHTML = currentScore + team.score.firstOT + team.score.secondOT
    document.getElementById(`${type}-points-second-ot`).parentElement.parentElement.style.display = 'block'
  }

  if (team.score.thirdOT) {
    document.getElementById(`${type}-points-third-ot`).innerHTML = currentScore + team.score.firstOT + team.score.secondOT + team.score.thirdOT
    document.getElementById(`${type}-points-third-ot`).parentElement.parentElement.style.display = 'block'
  }
}

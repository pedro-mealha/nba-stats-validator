export function validatePlayerStats (playersTableId, teamId, titleId) {
  const table = document.getElementById(playersTableId)
  const players = table.querySelector('tbody').querySelectorAll('tr')
  let errors = false

  for (const player of players) {
    const stats = player.querySelectorAll('td')
    const firstName = stats[0].getAttribute('data-first-name')
    const lastName = stats[0].getAttribute('data-last-name')

    const nbaStats = fetchNbaPlayerStats(firstName, lastName, teamId)
    if (nbaStats === null) {
      if (stats[0].children.length > 0) {
        stats[0].removeChild(stats[0].firstChild)
      }

      stats[0].innerHTML = '<span class="material-icons md-14">help</span> ' + stats[0].innerText
      continue
    }

    errors |= validateStats(stats, nbaStats)
  }

  const el = document.getElementById(titleId)
  if (el.children.length > 0) {
    el.removeChild(el.firstChild)
  }

  if (errors) {
    el.innerHTML = '<span class="material-icons md-14">report_problem</span> ' + el.innerText
  }
}

export function validateTeamStats (playersTableId, titleId) {
  const table = document.getElementById(playersTableId)
  const stats = table.querySelector('tfoot').querySelectorAll('tr')[1].querySelectorAll('td')
  const nbaStats = fetchNbaTeamStats(playersTableId)
  const errors = validateStats(stats, nbaStats)

  const el = document.getElementById(titleId)
  if (errors && !el.hasChildNodes) {
    el.innerHTML = '<span class="material-icons md-14">report_problem</span> ' + el.innerHTML
  }
}

function addErrorMessage (element, correctValue) {
  element.classList.add('cell-danger')
  element.parentElement.classList.add('table-warning')

  new bootstrap.Tooltip(element, {
    boundary: 'window',
    title: `Correct Value: ${correctValue}`
  })
}

function fetchNbaPlayerStats (firstName, lastName, teamId) {
  const players = window.fileData.gameData.stats.activePlayers

  const filterplayers = players.filter((player) => {
    const sameTeam = player.teamId === teamId
    const sameLastName = player.lastName.slice(0, lastName.length) === lastName
    const sameFirstName = player.firstName.slice(0, firstName.length) === firstName

    return sameTeam && sameFirstName && sameLastName
  })

  if (filterplayers.length === 0) {
    return null
  }

  return filterplayers[0]
}

function fetchNbaTeamStats (playersTableId) {
  const key = playersTableId.slice(0, 1) + 'Team'

  return window.fileData.gameData.stats[key].totals
}

function validateStats (stats, nbaStats) {
  let errors = false

  stats[0].parentElement.classList.remove('table-warning')

  for (const stat of stats) {
    const matchKey = stat.getAttribute('data-match-key')
    if (matchKey === null || isNaN(parseInt(nbaStats[matchKey], 10))) {
      continue
    }

    stat.classList.remove('cell-danger')

    if (parseInt(nbaStats[matchKey], 10) !== parseInt(stat.innerText, 10)) {
      errors |= true
      addErrorMessage(stat, nbaStats[matchKey])
    }
  }

  return errors
}

export function reValidateData (data) {
  validatePlayerStats('home-players-table', data.teams.home.id, 'home-team-name-players-title')
  validatePlayerStats('visitor-players-table', data.teams.visitor.id, 'visitor-team-name-players-title')

  validateTeamStats('home-players-table', 'home-team-name-players-title')
  validateTeamStats('visitor-players-table', 'visitor-team-name-players-title')
  document.getElementById('validate').querySelector('span').classList.remove('animate-validate')
}

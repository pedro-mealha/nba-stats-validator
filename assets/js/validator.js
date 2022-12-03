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
  const totalStats = table.querySelector('tfoot').querySelectorAll('tr')[1].querySelectorAll('td')
  const teamStats = table.querySelector('tfoot').querySelectorAll('tr')[2].querySelectorAll('td')
  const stats = [...totalStats].concat([...teamStats])

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
  let players = window.fileData.gameData.away_team.players
  if (teamId === window.fileData.gameData.home_team.id) {
    players = window.fileData.gameData.home_team.players
  }

  const filterplayers = players.filter((player) => {
    const sameLastName = player.last_name.slice(0, lastName.length) === lastName
    const sameFirstName = player.first_name.slice(0, firstName.length) === firstName

    return sameFirstName && sameLastName
  })

  if (filterplayers.length === 0) {
    return null
  }

  return filterplayers[0].stats
}

function fetchNbaTeamStats (playersTableId) {
  if (playersTableId.slice(0, 1) === 'h') {
    return window.fileData.gameData.home_team.stats
  }

  return window.fileData.gameData.away_team.stats
}

function validateStats (stats, nbaStats) {
  let errors = false

  stats[0].parentElement.classList.remove('table-warning')

  for (const stat of stats) {
    const matchKey = stat.getAttribute('data-match-key')
    const keyType = stat.getAttribute('data-match-key-type')
    let mismatch = false
    if (matchKey === null || (keyType === 'int' && isNaN(parseInt(nbaStats[matchKey], 10)))) {
      continue
    }

    stat.classList.remove('cell-danger')

    switch (keyType) {
      case 'string':
        mismatch = nbaStats[matchKey] !== stat.innerText
        break
      case 'int':
      default:
        mismatch = parseInt(nbaStats[matchKey], 10) !== parseInt(stat.innerText, 10)
        break
    }

    if (mismatch) {
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

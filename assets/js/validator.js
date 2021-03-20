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
      stats[0].innerHTML = '<span class="material-icons md-18" style="font-size:14px;">help</span> ' + stats[0].innerText
      continue
    }

    for (const stat of stats) {
      const matchKey = stat.getAttribute('data-match-key')
      if (matchKey === null || isNaN(parseInt(nbaStats[matchKey], 10))) {
        continue
      }

      if (parseInt(nbaStats[matchKey], 10) !== parseInt(stat.innerText, 10)) {
        errors = true
        addErrorMessage(stat, nbaStats[matchKey])
      }
    }
  }

  if (errors) {
    const el = document.getElementById(titleId)
    el.innerHTML = '<span class="material-icons md-18" style="font-size:14px;">info</span> ' + el.innerHTML
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

import { populateHtml } from './populate.js'
import { getGameMetadata, getGameData, getTeamLogo } from './external.js'
import { reValidateData } from './validator.js'

window.onload = () => {
  const openFileBtn = document.getElementById('open-file-btn')

  const input = document.createElement('input')
  input.type = 'file'

  document.getElementById('open-new-file-btn').onclick = () => {
    input.click()
  }

  openFileBtn.onclick = () => {
    input.click()
  }

  input.onchange = e => {
    document.getElementById('content').style.display = 'none'
    document.getElementsByTagName('footer')[0].style.bottom = 0
    document.getElementById('open-file-btn').classList.add('d-none')
    document.getElementById('loading').classList.remove('d-none')

    const file = e.target.files[0]
    const filename = file.name.replace('.htm', '')
    document.getElementById('filename').innerHTML = filename
    const reader = new FileReader()
    reader.readAsText(file, 'utf16le')

    reader.onload = readerEvent => {
      const fileData = readerEvent.target.result

      window.rawFileData = fileData
      parseFileHtml(fileData, filename)
    }
  }

  async function parseFileHtml (fileData, filename) {
    const parser = new DOMParser()
    const html = parser.parseFromString(fileData, 'text/html')

    const tables = html.querySelectorAll('table')

    const gameInfoTable = tables[0]
    const scoreboardTable = tables[1]
    const teamOnePlayersTable = tables[2]
    const teamTwoPlayersTable = tables[3]

    let teams = getTeams(gameInfoTable, filename)
    if (typeof teams[0].triCode === 'undefined' || typeof teams[1].triCode === 'undefined') {
      document.getElementById('loading').classList.add('d-none')
      document.getElementById('team-inputs').classList.remove('d-none')

      return
    }

    teams = addScoreboard(scoreboardTable, teams)
    teams = addPlayers(teams, teamOnePlayersTable, teamTwoPlayersTable)

    const parsedData = {
      date: getGameDate(gameInfoTable),
      location: getGameLocation(gameInfoTable),
      teams: teams
    }

    const dateFormated = `${parsedData.date.getFullYear()}-${('0' + (parsedData.date.getMonth() + 1)).slice(-2)}-${('0' + parsedData.date.getDate()).slice(-2)}`
    const { gameId, gameStartsAt } = await getGameMetadata(dateFormated, 'nba', teams)
    const gameData = await getGameData(gameId)

    parsedData.date = dateFormated
    parsedData.startsAt = gameStartsAt

    parsedData.teams = updateTeamData(teams, gameData)
    parsedData.gameData = gameData
    parsedData.gameId = gameId
    parsedData.dateFormated = dateFormated

    window.fileData = parsedData
    populateHtml(parsedData)
  }

  function getTeams (gameInfoTable, filename) {
    let teams = gameInfoTable.querySelectorAll('tr')[1].firstElementChild.textContent
    teams = teams.split(' Vs ')

    const teamOneTriCode = filename.substring(0, 3)
    const teamTwoTriCode = filename.slice(-3)

    return teams.map((team, key) => {
      const fallback = key === 0 ? teamOneTriCode : teamTwoTriCode
      return getTeamBasicData(team, fallback)
    })
  }

  function getTeamBasicData (team, fallback) {
    const exceptions = [
      { name: 'Golden State', triCode: 'GSW' },
      { name: 'Los Angeles', triCode: ['LAC', 'LAL'] },
      { name: 'New York', triCode: 'NYK' },
      { name: 'New Orleans', triCode: 'NOP' },
      { name: 'Oklahoma City', triCode: 'OKC' },
      { name: 'Brooklyn', triCode: 'BKN' },
      { name: 'San Antonio', triCode: 'SAS' },
      { name: 'Phoenix', triCode: 'PHX' },
      { name: 'Washington', triCode: 'WSH' }
    ]

    let triCode = team.substring(0, 3)

    const teamException = exceptions.filter(exception => exception.name === team)
    if (teamException.length > 0) {
      triCode = teamException[0].triCode

      if (Array.isArray(triCode)) {
        if (triCode.includes(fallback)) {
          triCode = fallback
        } else {
          return {}
        }
      }
    }

    return {
      name: team.toLowerCase(),
      triCode: triCode.toUpperCase()
    }
  }

  function getGameDate (gameInfoTable) {
    const gameLocationAndTime = gameInfoTable.querySelectorAll('tr')[2].firstElementChild.textContent
    const [gameDate] = gameLocationAndTime.split(' ')

    return new Date(gameDate)
  }

  function getGameLocation (gameInfoTable) {
    const gameLocationAndTime = gameInfoTable.querySelectorAll('tr')[2].firstElementChild.textContent
    const [, gameLocation] = gameLocationAndTime.split(' at ')

    return gameLocation
  }

  function addScoreboard (scoreboardTable, teams) {
    for (const [i, team] of teams.entries()) {
      const teamScore = scoreboardTable.querySelectorAll('tr')[i + 1].children
      const gameLength = teamScore.length

      team.score = {
        firstP: parseInt(teamScore[2].textContent, 10),
        secondP: undefined,
        thirdP: undefined,
        fourthP: undefined,
        final: parseInt(teamScore[gameLength - 1].textContent, 10)
      }

      if (gameLength >= 7) {
        team.score.secondP = parseInt(teamScore[4].textContent, 10)
      }

      if (gameLength >= 9) {
        team.score.thirdP = parseInt(teamScore[6].textContent, 10)
      }

      if (gameLength >= 11) {
        team.score.fourthP = parseInt(teamScore[8].textContent, 10)
      }

      if (gameLength >= 13) {
        team.score.firstOT = parseInt(teamScore[10].textContent, 10)
      }

      if (gameLength >= 15) {
        team.score.secondOT = parseInt(teamScore[12].textContent, 10)
      }

      if (gameLength >= 17) {
        team.score.thirdOT = parseInt(teamScore[14].textContent, 10)
      }
    }

    return teams
  }

  function addPlayers (teams, teamOnePlayersTable, teamTwoPlayersTable) {
    let teamOnePlayers = teamOnePlayersTable.querySelectorAll('tr')
    teamOnePlayers = [].slice.call(teamOnePlayers, 3)
    const teamOneSecondaryStats = teamOnePlayers[teamOnePlayers.length - 1]
    teamOnePlayers.splice(-1, 1)
    teamOnePlayers = parseStats(teamOnePlayers)

    let teamTwoPlayers = teamTwoPlayersTable.querySelectorAll('tr')
    teamTwoPlayers = [].slice.call(teamTwoPlayers, 3)
    const teamTwoSecondaryStats = teamTwoPlayers[teamTwoPlayers.length - 1]
    teamTwoPlayers.splice(-1, 1)
    teamTwoPlayers = parseStats(teamTwoPlayers)

    teams[0].stats = teamOnePlayers[teamOnePlayers.length - 1]
    teams[0].stats = addSecondaryStats(teams[0].stats, teamOneSecondaryStats)
    teamOnePlayers.splice(-1, 1)
    teams[0].players = teamOnePlayers

    teams[1].stats = teamTwoPlayers[teamTwoPlayers.length - 1]
    teams[1].stats = addSecondaryStats(teams[1].stats, teamTwoSecondaryStats)
    teamTwoPlayers.splice(-1, 1)
    teams[1].players = teamTwoPlayers

    return teams
  }

  function parseStats (stats) {
    const parsedStats = []
    for (const stat of stats) {
      const [
        name,
        position,
        minutes,
        fieldGoalMadeAttempts,
        threePointsMadeAttempts,
        freeThrowMadeAttempts,
        offensiveRebounds,
        defensiveRebounds,
        totalRebounds,
        assists,
        foulsDrawn,
        personalFouls,
        steals,
        turnouvers,
        blocks,
        points
        // +/-
      ] = stat.querySelectorAll('td')

      const [lastName, firstName] = name.textContent.split(',')

      const [fieldGoalsMade, fieldGoalsAttempts] = fieldGoalMadeAttempts.textContent.trim().split('-')
      const fieldGoalsPercentage = +(parseInt(fieldGoalsMade, 10) / parseInt(fieldGoalsAttempts, 10) * 100).toFixed(2) || 0

      const [threePointsMade, threePointsAttempts] = threePointsMadeAttempts.textContent.trim().split('-')
      const threePointsPercentage = +(parseInt(threePointsMade, 10) / parseInt(threePointsAttempts, 10) * 100).toFixed(2) || 0

      const [freeThrowMade, freeThrowAttempts] = freeThrowMadeAttempts.textContent.trim().split('-')
      const freeThrowPercentage = +(parseInt(freeThrowMade, 10) / parseInt(freeThrowAttempts, 10) * 100).toFixed(2) || 0

      parsedStats.push({
        firstName: firstName || '',
        lastName: lastName || '',
        position: position.textContent.trim(),
        minutes: minutes.textContent.trim(),
        fieldGoalsMade: parseInt(fieldGoalsMade, 10),
        fieldGoalsAttempts: parseInt(fieldGoalsAttempts, 10),
        fieldGoalsPercentage,
        threePointsMade: parseInt(threePointsMade, 10),
        threePointsAttempts: parseInt(threePointsAttempts, 10),
        threePointsPercentage,
        freeThrowMade: parseInt(freeThrowMade, 10),
        freeThrowAttempts: parseInt(freeThrowAttempts, 10),
        freeThrowPercentage,
        offensiveRebounds: parseInt(offensiveRebounds.textContent.trim(), 10),
        defensiveRebounds: parseInt(defensiveRebounds.textContent.trim(), 10),
        totalRebounds: parseInt(totalRebounds.textContent.trim(), 10),
        assists: parseInt(assists.textContent.trim(), 10),
        personalFouls: parseInt(personalFouls.textContent.trim(), 10),
        foulsDrawn: parseInt(foulsDrawn.textContent.trim(), 10),
        steals: parseInt(steals.textContent.trim(), 10),
        turnouvers: parseInt(turnouvers.textContent.trim(), 10),
        blocks: parseInt(blocks.textContent.trim(), 10),
        points: parseInt(points.textContent.trim(), 10)
      })
    }

    return parsedStats
  }

  function addSecondaryStats (stats, secondaryStats) {
    const elements = secondaryStats.querySelectorAll('td')
    stats.teamRebounds = elements[7].innerText || '-'
    stats.teamTurnovers = elements[10].innerText || '-'

    // Team TOT (total rebounds) also includes team rebounds
    if (stats.teamRebounds !== '-') {
      stats.totalRebounds += parseInt(stats.teamRebounds, 10)
    }

    return stats
  }

  function updateTeamData (teams, gameData) {
    const parsedTeams = {}

    if (gameData.away_team.tricode === teams[0].triCode) {
      teams[0].id = gameData.away_team.id
      parsedTeams.visitor = teams[0]

      teams[1].id = gameData.home_team.id
      parsedTeams.home = teams[1]
    } else {
      teams[1].id = gameData.away_team.id
      parsedTeams.visitor = teams[1]

      teams[0].id = gameData.home_team.id
      parsedTeams.home = teams[0]
    }

    parsedTeams.home.logo = getTeamLogo(parsedTeams.home.id)
    parsedTeams.visitor.logo = getTeamLogo(parsedTeams.visitor.id)

    return parsedTeams
  }

  document.getElementById('home-team-name-players-title').parentElement.onclick = function () {
    if (this.classList.contains('deactive-tab')) {
      activeTab(this)
      deactivateTab(document.getElementById('visitor-team-name-players-title').parentElement)

      document.getElementById('visitor-players-table').parentElement.parentElement.parentElement.style.display = 'none'
      document.getElementById('home-players-table').parentElement.parentElement.parentElement.style.display = 'block'
    }
  }

  document.getElementById('visitor-team-name-players-title').parentElement.onclick = function () {
    if (this.classList.contains('deactive-tab')) {
      activeTab(this)
      deactivateTab(document.getElementById('home-team-name-players-title').parentElement)

      document.getElementById('home-players-table').parentElement.parentElement.parentElement.style.display = 'none'
      document.getElementById('visitor-players-table').parentElement.parentElement.parentElement.style.display = 'block'
    }
  }

  function activeTab (element) {
    element.classList.add('active-tab')
    element.classList.remove('deactive-tab')
  }

  function deactivateTab (element) {
    element.classList.remove('active-tab')
    element.classList.add('deactive-tab')
  }

  document.getElementById('teams-txt-form').parentElement.onsubmit = function (e) {
    e.preventDefault()

    const homeTeamTriCode = document.getElementById('home-team-tri-text').value
    const visitorTeamTriCode = document.getElementById('visitor-team-tri-text').value
    const newFileName = `${visitorTeamTriCode}-VS-${homeTeamTriCode}`

    document.getElementById('loading').classList.remove('d-none')
    document.getElementById('team-inputs').classList.add('d-none')

    parseFileHtml(window.rawFileData, newFileName)
  }

  document.onkeyup = function (e) {
    const evt = window.event || e
    // alt + 'n' key
    if (evt.altKey && evt.keyCode === 78) {
      input.click()
    }
  }

  document.getElementById('validate').onclick = async function (e) {
    e.preventDefault()

    this.querySelectorAll('span')[0].classList.add('animate-validate')

    const currentData = window.fileData
    const gameData = await getGameData(currentData.gameId)

    window.fileData.gameData = gameData

    reValidateData(window.fileData)
  }
}
